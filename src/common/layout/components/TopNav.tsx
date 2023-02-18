/* eslint-disable */
import { IconButton, IIconProps, Stack } from '@fluentui/react';
import * as React from 'react';
import AppContext from '../../config/app-context.config';
import * as topNavStyle from "../styles/TopNavStyle.module.scss"

const expandedIcon: IIconProps = { iconName: "GlobalNavButton" };
const collapsedIcon: IIconProps = { iconName: "GlobalNavButtonActive" }; 

const appContext = AppContext.getInstance(); 
export const TopNav: React.FunctionComponent<{ collapsed: boolean, setCollapsed: React.Dispatch<React.SetStateAction<boolean>> }> = (props) => {

  const { collapsed, setCollapsed } = props; 
  const siteName = appContext.siteSettings.siteName; 
  return (
    <>
      <nav className={topNavStyle.default.navMain}>
        <Stack horizontal styles={
          {
            root: {
              gap: 10
            }
          }
        }>
          <Stack.Item>
            <IconButton
              toggle
              className={topNavStyle.default.toggleIcon}
              checked={collapsed}
              title={collapsed ? 'Open Side Menu' : 'Close Side Menu'}
              iconProps={collapsed ? collapsedIcon : expandedIcon}
              onClick={() => {
                setCollapsed(!collapsed)
              }}
            />
          </Stack.Item>
          <Stack.Item>
            <h3>{siteName}</h3>
          </Stack.Item>
          <Stack.Item grow>
            
          </Stack.Item>
        </Stack>
      </nav>
    </>
  )
};