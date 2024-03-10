/* eslint-disable */
import { IPersonaProps } from "@fluentui/react";
import * as React from "react";
import {
  PeoplePicker,
  PrincipalType,
} from "../../../common/components/PeoplePicker"; 
import { UserService } from "../../../common/services/UserService";
import AppContext from "@common/root/app-context";
import { useTrackPageView } from "@common/hooks/useTrackPageView";

const { getUserProfile } = UserService();

const PeoplePickerExample: React.FunctionComponent<{}> = (props) => {

  useTrackPageView({
    name: "People Picker Example",
  });

  const [defaultUsers, setDefaultUser] = React.useState<IPersonaProps[]>([]);

  React.useEffect(() => {
    const currentContext = AppContext.getInstance();
    const user = currentContext.context.pageContext.user;
    setDefaultUser([
      {
        text: user.displayName,
        secondaryText: user.email,
        tertiaryText: user.loginName,
      } as IPersonaProps,
    ]);
  }, []);

  return (
    <>
      <section>
        <h3>People Picker Examples</h3> <hr />
        <PeoplePicker
          label="People Picker (Normal Type)"
          principalTypes={[PrincipalType.User]}
          peoplePickerType="Normal"
          placeholder="Enter Last Name, First Name to filter the user"
          required={true}
          showSecondaryText={false}
          personSelectionLimit={5}
          disabled={false}
          readOnly={false}
          onPeopleSelectChange={async (users) => {
            console.log(users);
            const principalName = users?.[0]?.tertiaryText;
            if (principalName) {
              const profile = await getUserProfile(principalName);
              console.log(profile);
            }
          }}
        ></PeoplePicker>
        {/* Default User */}
        <PeoplePicker
          label="People Picker (Normal Type, Default Value)"
          principalTypes={[PrincipalType.User]}
          defaultSelectedUsers={defaultUsers}
          peoplePickerType="Normal"
          placeholder="Enter Last Name, First Name to filter the user"
          required={true}
          showSecondaryText={false}
          disabled={false}
          readOnly={false}
          onPeopleSelectChange={async (users) => {
            console.log(users);
          }}
        ></PeoplePicker>
        {/* With Secondary text */}
        <PeoplePicker
          label="People Picker (Compact Type, Default Value, with Secondary text)"
          defaultSelectedUsers={defaultUsers}
          showSecondaryText={true}
          onPeopleSelectChange={async (users) => {
            console.log(users);
          }}
        ></PeoplePicker>
        {/* With Secondary text */}
        <PeoplePicker
          label="Group Only"
          onPeopleSelectChange={async (users) => {
            console.log(users);
          }}
          orgUserType={"group-only"}
        ></PeoplePicker>
        <PeoplePicker
          label="User Only"
          onPeopleSelectChange={async (users) => {
            console.log(users);
          }}
          orgUserType={"user-only"}
        ></PeoplePicker>
        <PeoplePicker
          label="Select User or Group (Both)"
          onPeopleSelectChange={async (users) => {
            console.log(users);
          }}
          orgUserType={"user-and-group"}
        ></PeoplePicker>
      </section>
    </>
  );
};

export default PeoplePickerExample;
