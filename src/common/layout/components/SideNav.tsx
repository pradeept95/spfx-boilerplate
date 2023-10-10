/* eslint-disable */
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { Button, Caption1Stronger, Divider, SelectTabData, SelectTabEvent, Tab, TabList, Tooltip, Body1Stronger } from "@fluentui/react-components";
import useWindowDimensions from "@common/hooks/useWindowsSize";
import { useSideNavStyle } from "./useSideNavStyle";
import { GroupFilled, GroupRegular, bundleIcon } from "@fluentui/react-icons";

const GroupIcon = bundleIcon(GroupFilled, GroupRegular)
  
export type NavLink = {
  key: string;
  name: string;
  url: string;
  icon: React.ReactNode;
  onActionRender?: () => React.ReactNode;
};

export type NavLinkGroup = {
  links: NavLink[];
  title: string;
  isExpanded: boolean;
};

export const SideNav: React.FunctionComponent<{
  navLinkGroups: NavLinkGroup[];
  selectedKey?: string;
}> = (props) => {
  const { navLinkGroups } = props;
  const { width } = useWindowDimensions();
  const iconOnly = React.useMemo(() => width < 1024, [width]);

  const [selectedKey, setSelectedKey] = React.useState<string>(
    props.selectedKey || ""
  );

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => { 
    setSelectedKey(location.pathname);
  }, [location]); 

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    navigate(data.value);
  };

  const classes = useSideNavStyle();

  const renderMenuItems = (
    groupIndex: number,
    links: NavLink[]
  ): React.ReactNode => (
    <TabList
      key={groupIndex}
      selectedValue={selectedKey}
      onTabSelect={onTabSelect}
      vertical
    >
      {links?.map((link) => {
        return (
          <Tooltip
            withArrow
            content={{
              children: link.name,
              className: classes.tooltip,
            }}
            relationship="label"
            positioning={"after"}
          >
            <div className={classes.menuItem}>
              <Tab key={link.key} value={link.url} icon={<>{link.icon}</>}>
                {iconOnly ? (
                  <></>
                ) : (
                  <Caption1Stronger>{link.name}</Caption1Stronger>
                )}
              </Tab>
              <div className="menu-action">{link.onActionRender && link.onActionRender()}</div>
            </div>
          </Tooltip>
        );
      })}
    </TabList>
  );

  return (
    <> 
      {navLinkGroups.map((group, index) => {
        return (
          <>
            {!group.title && renderMenuItems(index, group.links)}
            {group.title && (
              <div key={index}>
                {iconOnly ? null : (
                  <Button appearance="transparent" icon={<GroupIcon />}>
                    <Body1Stronger>{group.title}</Body1Stronger>
                  </Button>
                )}

                <Divider />
                {renderMenuItems(index, group.links)}
              </div>
            )}
          </>
        );
      })}
    </>
  );
};
