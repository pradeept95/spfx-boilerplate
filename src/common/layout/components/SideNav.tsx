/* eslint-disable */
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Caption1Stronger,
  Divider,
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabList,
  Tooltip,
  Body1Stronger,
} from "@fluentui/react-components";
import useWindowDimensions from "@common/hooks/useWindowsSize";
import { useSideNavStyle } from "./useSideNavStyle";

export type NavLink = {
  key: string;
  name: string;
  url: string;
  icon: React.ReactNode;
  onActionRender?: () => React.ReactNode;
  linkType?: "internal" | "external";
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
    setSelectedKey(location.pathname + location.search);
  }, [location]);

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    const linksOnly = navLinkGroups?.map((group) => group.links)?.flat();

    console.log("linksOnly", linksOnly);

    const link = linksOnly.find((link) => link.url === data.value);

    if (link && link.linkType === "external") {
      window.open(link.url, "_blank");
      return;
    }

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
              <div className={classes.menuTab}>
                <Tab
                  key={link.key}
                  value={link.url}
                  icon={<>{link.icon}</>}
                  aria-label={link.name}
                >
                  {iconOnly ? (
                    <></>
                  ) : (
                    <Caption1Stronger
                      title={link.name}
                      className={classes.menuTitle}
                    >
                      {link.name}
                    </Caption1Stronger>
                  )}
                </Tab>
              </div>
              {link.onActionRender && (
                <div className="menu-action">{link.onActionRender()}</div>
              )}
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
              <div className={classes.groupDivider} key={index}>
                <Divider appearance="brand" alignContent="start">
                  {iconOnly ? null : (
                    <Body1Stronger>{group.title}</Body1Stronger>
                  )}
                </Divider>
                {renderMenuItems(index, group.links)}
              </div>
            )}
          </>
        );
      })}
    </>
  );
};
