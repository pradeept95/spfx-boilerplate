/* eslint-disable */
import * as React from "react";
import { Nav, INavStyles, INavLinkGroup, INavLink } from "@fluentui/react/lib/Nav";
import { CommandBarButton, DefaultPalette, DirectionalHint, IOverflowSetItemProps, IOverflowSetStyles, OverflowSet, TooltipHost } from "@fluentui/react";

const navStyles: Partial<INavStyles> = {
  root: {
    width: 220,
    minHeight: '80vh',
    background: DefaultPalette.neutralLight,
    transition: '1s',
    boxShadow: "3px 0px 6px #888888;"
  },
  groupContent: {
    marginBottom: 10
  }
};

const minNavStyles: Partial<IOverflowSetStyles> = {
  root: { 
    minHeight: '80vh',
    background: DefaultPalette.neutralLight,
    transition: '1s',
    boxShadow: "3px 0px 6px #888888;"
  }
};

const navLinkGroups: INavLinkGroup[] = [
  {
    name: "Basic components",
    expandAriaLabel: "Show more Basic components",
    links: [
      {
        key: "ActivityItem",
        name: "ActivityItem",
        url: "#/admin",
        icon: 'News'
      },
      {
        key: "Breadcrumb",
        name: "Breadcrumb",
        url: "#/admin",
        icon: 'News',
      },
      {
        key: "Button",
        name: "Button",
        url: "#/admin",
        icon: 'News',
      },
    ],
  },
  {
    name: "Extended components",
    expandAriaLabel: "Show more Extended components",
    links: [
      {
        key: "ColorPicker",
        name: "ColorPicker",
        url: "#/admin",
      },
      {
        key: "ExtendedPeoplePicker",
        name: "ExtendedPeoplePicker",
        url: "#/admin",
      },
      {
        key: "GroupedList",
        name: "GroupedList",
        url: "#/admin",
      },
    ],
  },
  {
    name: "Utilities",
    expandAriaLabel: "Show more Utilities",
    links: [
      {
        key: "FocusTrapZone",
        name: "FocusTrapZone",
        url: "#/admin/focustrapzone",
      },
      {
        key: "FocusZone",
        name: "FocusZone",
        url: "#/admin/focuszone",
      },
      {
        key: "MarqueeSelection",
        name: "MarqueeSelection",
        url: "#/admin/marqueeselection",
      },
    ],
  },
];

// const overflowLinkGroups: IOverflowSetItemProps[]  = [
//   {
//     key: "",
//     name: "Basic components",
//     expandAriaLabel: "Show more Basic components",
//     isExpanded: true,
//     links: [
//       {
//         key: "ActivityItem",
//         name: "ActivityItem",
//         url: "#/admin",
//         icon: 'News',
//         isExpanded: true
//       },
//       {
//         key: "Breadcrumb",
//         name: "Breadcrumb",
//         url: "#/admin",
//         icon: 'News',
//       },
//       {
//         key: "Button",
//         name: "Button",
//         url: "#/admin",
//         icon: 'News',
//       },
//     ],
//   },
//   {
//     key: "",
//     name: "Extended components",
//     expandAriaLabel: "Show more Extended components",
//     links: [
//       {
//         key: "ColorPicker",
//         name: "ColorPicker",
//         url: "#/admin",
//       },
//       {
//         key: "ExtendedPeoplePicker",
//         name: "ExtendedPeoplePicker",
//         url: "#/admin",
//       },
//       {
//         key: "GroupedList",
//         name: "GroupedList",
//         url: "#/admin",
//       },
//     ],
//   },
//   { 
//     key: "",
//     name: "Utilities",
//     expandAriaLabel: "Show more Utilities",
//     links: [
//       {
//         key: "FocusTrapZone",
//         name: "FocusTrapZone",
//         url: "#/admin/focustrapzone",
//       },
//       {
//         key: "FocusZone",
//         name: "FocusZone",
//         url: "#/admin/focuszone",
//       },
//       {
//         key: "MarqueeSelection",
//         name: "MarqueeSelection",
//         url: "#/admin/marqueeselection",
//       },
//     ],
//   },
// ];

const onRenderItemStyles = {
  root: { padding: '10px' },
};

const onRenderOverflowButtonStyles = {
  root: { padding: '10px' },
  menuIcon: { fontSize: '16px' },
};

const onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {
  return (
    <TooltipHost content={item.title} directionalHint={DirectionalHint.rightCenter}>
      <CommandBarButton
        aria-label={item.name}
        styles={onRenderItemStyles}
        iconProps={{ iconName: item.icon }}
        onClick={item.onClick}
      />
    </TooltipHost>
  );
};

const onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => {
  return (
    <TooltipHost content="More items" directionalHint={DirectionalHint.rightCenter}>
      <CommandBarButton
        aria-label="More items"
        styles={onRenderOverflowButtonStyles}
        menuIconProps={{ iconName: 'More' }}
        menuProps={{ items: overflowItems! }}
      />
    </TooltipHost>
  );
};

export const SideNav: React.FunctionComponent<{ collapsed: boolean }> = (props) => {

  const { collapsed } = props;

  const [selectedKey, setSelectedKey] = React.useState<string>("ActivityItem")


  return (
    <>
      {!collapsed ?
        <Nav
          styles={navStyles}
          selectedKey={selectedKey}
          ariaLabel="Site Side Navigation"
          groups={navLinkGroups}
          onLinkClick={(e: any, item: INavLink) => {
            setSelectedKey(item.key);
          }}
        />
        : <OverflowSet
          vertical
          styles={minNavStyles}
          items={[
            {
              key: 'item1',
              icon: 'Add',
              name: 'Add',
              title: 'Add',
              ariaLabel: 'New. Use left and right arrow keys to navigate',
            },
            {
              key: 'item2',
              icon: 'Upload',
              name: 'Upload',
              title: 'Upload',
            },
            {
              key: 'item3',
              icon: 'Share',
              name: 'Share',
              title: 'Share',
            },
          ]}
          overflowItems={[
            {
              key: 'item4',
              name: 'Overflow Link 1',
            },
            {
              key: 'item5',
              name: 'Overflow Link 2',
            },
          ]} onRenderItem={onRenderItem} onRenderOverflowButton={onRenderOverflowButton} />
      }
    </>
  );
};
