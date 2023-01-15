/* eslint-disable */
import * as React from "react";
import { Nav, INavStyles, INavLinkGroup, INavLink } from "@fluentui/react/lib/Nav";
import { CommandBarButton, DefaultPalette, DirectionalHint, IOverflowSetItemProps, IOverflowSetStyles, OverflowSet, TooltipHost } from "@fluentui/react";
import { useNavigate } from "react-router-dom"; 

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

export const SideNav: React.FunctionComponent<{ collapsed: boolean, navLinkGroups: INavLinkGroup[] }> = (props) => {

  const { collapsed, navLinkGroups } = props;
  const navigate = useNavigate()

  const [navLinks, setNavLinks] = React.useState<INavLinkGroup[]>([]);
  const [overflowLinks, setOverflowLinks] = React.useState<IOverflowSetItemProps[]>([]);

  const [selectedKey, setSelectedKey] = React.useState<string>("ActivityItem")

  React.useEffect(() => {
    setNavLinks(navLinkGroups);
    const allLinks = navLinkGroups.map(x => x.links).reduce((accumulator: INavLink[], value: INavLink[]) => [...accumulator, ...value], []);
    setOverflowLinks(allLinks.map(navLink => {

      return ({
        key: navLink.key,
        title: navLink.name,
        icon : navLink.icon,
        link : navLink.url?.replace("#", "")
      } as IOverflowSetItemProps)
    }))
  }, navLinkGroups);

  const onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {    
    return (
      <TooltipHost content={item.title} directionalHint={DirectionalHint.rightCenter}>
        <CommandBarButton
          aria-label={item.name}
          styles={onRenderItemStyles}
          title={item.name}
          iconProps={{ iconName: item.icon }}
          onClick={()=> { navigate(item.link); }}
        />
      </TooltipHost>
    );
  };


  return (
    <>
      {!collapsed ?
        <Nav
          styles={navStyles}
          selectedKey={selectedKey}
          ariaLabel="Site Side Navigation"
          groups={navLinks}
          onLinkClick={(e: any, item: INavLink) => {
            setSelectedKey(item.key);
          }}
        />
        : <OverflowSet
          vertical
          styles={minNavStyles}
          items={overflowLinks?.length > 10? overflowLinks?.splice(0, 10) : overflowLinks}
          overflowItems={overflowLinks?.length > 10? overflowLinks?.splice(10) : []} 
          onRenderItem={onRenderItem} 
          onRenderOverflowButton={onRenderOverflowButton} />
      }
    </>
  );
};
