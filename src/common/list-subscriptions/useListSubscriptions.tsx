
import * as React from "react";
import { IListSubscription, ListSubscriptionFactory } from "@microsoft/sp-list-subscription";
import { ListSubscriptionProps } from "./ListSubscriptionProps";
import { Guid } from "@microsoft/sp-core-library";
import { getSP } from "@common/pnp";
import AppContext from "@common/root/app-context";
import { BaseComponent } from "@microsoft/sp-component-base";

// extend global window object to add the list subscription factory
declare global {
  interface Window {
    _listSubscriptionFactory: ListSubscriptionFactory;
  }
}

export function setSubscriptionFactory(baseComponent: BaseComponent) : void {
  window._listSubscriptionFactory = new ListSubscriptionFactory(baseComponent);
}

type ListSubscriptionFactoryType = React.MutableRefObject<IListSubscription>

type ListSubscriptionReturnType = {
  _listSubscription: ListSubscriptionFactoryType;
};

const currentContext = AppContext.getInstance();
export const useListSubscription = (props: ListSubscriptionProps, siteName?: string): ListSubscriptionReturnType => {
  const { listIdOrListName, onChange, onConnect, onDisconnect } = props;
  const _listSubscription = React.useRef<IListSubscription>();

  const _onChangeNotification = () : void => {
    // code to execute when the something changes on the list or library
    console.log("New Change Notification", listIdOrListName);
    if(onChange) {
      onChange();
    }
  };

  function _subscriptionConnected(): void {
    // code to execute when the subscription to the list has been established
    console.log("Connected", listIdOrListName); 
    if (onConnect) {
      onConnect();
    }
  }

  function _subscriptionDisconnected(reason: string): void {
    // code to execute when the connection to the list has been disconnected
    console.log("Disconnected", listIdOrListName, reason);

    if (onDisconnect) {
      onDisconnect(reason);
    }
  }

  function _deleteSubscription(): void {
    if (_listSubscription.current) {
      window._listSubscriptionFactory.deleteSubscription(_listSubscription.current); 
    }
  }

  async function createListSubscription(): Promise<void> { 
    
    let listId = listIdOrListName;
    if (!Guid.isValid(listId)) {
      const sp = await getSP(currentContext.context, siteName);
      const list = (await sp.web.lists.getByTitle(listIdOrListName).getParentInfos()).List.Id.toString();

      if (list) {
        console.log("list", list);
        listId = list;
      }
    }

    _listSubscription.current =
      await window._listSubscriptionFactory.createSubscription({
        listId: Guid.parse(listId),
        callbacks: {
          notification: _onChangeNotification,
          connect: _subscriptionConnected,
          disconnect: _subscriptionDisconnected,
        },
      });
  }

    React.useEffect(() => {
      try {
        console.log("creating subscription");

        createListSubscription()
          .catch((error) => {
            console.log("error creating subscription", error);
          })
          .then(() => console.log("subscription created"))
          .catch((error) => { 
            throw error;
          });
        
      } catch (error) {
        console.log("error creating subscription", error);
      }

      return () => {
        _deleteSubscription();
        console.log("removing subscription");
      };
    }, []);

  return {
    _listSubscription,
  } as const;
};