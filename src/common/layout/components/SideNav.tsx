/* eslint-disable */
import * as React from "react";
import { Nav, INavLinkGroup, INavLink, INavStyles } from "@fluentui/react/lib/Nav";
import { CommandBarButton, DirectionalHint, IButtonStyles, IOverflowSetItemProps, OverflowSet, TooltipHost } from "@fluentui/react";
import { useLocation, useNavigate } from "react-router-dom"; 
import * as sideNavStyles from "../styles/SideNavStyle.module.scss"

const navStyles: Partial<INavStyles> = { 
  groupContent: {
    marginBottom: 4
  }
};

const onRenderItemStyles: IButtonStyles = {
  root: {
    padding: "10px",
    background: "transparent",
    backgroundColor: "transparent",
  },
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

export const SideNav: React.FunctionComponent<{ collapsed: boolean, navLinkGroups: INavLinkGroup[], selectedKey? : string }> = (props) => {

  const { collapsed, navLinkGroups } = props;
  const navigate = useNavigate()
  const location = useLocation();

  const [navLinks, setNavLinks] = React.useState<INavLinkGroup[]>([]);
  const [overflowLinks, setOverflowLinks] = React.useState<IOverflowSetItemProps[]>([]);

  const [selectedKey, setSelectedKey] = React.useState<string>(
    props.selectedKey 
  ); 
   
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
  }, [navLinkGroups]);

   React.useEffect(() => { 
     const selectedRoute = overflowLinks.filter(
       (nav) =>
         nav.link
           ?.toLowerCase()
           ?.localeCompare(location.pathname?.toLowerCase()) == 0
     )?.[0]?.key;
     setSelectedKey(selectedRoute);
   }, [location, overflowLinks]);

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
          className={sideNavStyles.default.mainNavStyle} 
          selectedKey={selectedKey}
          ariaLabel="Site Side Navigation"
          groups={navLinks}
          onLinkClick={(e: any, item: INavLink) => {
            // setSelectedKey(item.key);
          }}
        />
        : <OverflowSet
          vertical
          className={sideNavStyles.default.minimizedSideNavStyles}
          items={overflowLinks}
          overflowItems={[]} 
          onRenderItem={onRenderItem} 
          onRenderOverflowButton={onRenderOverflowButton} 
          
        />
          
      }
    </>
  );
};
