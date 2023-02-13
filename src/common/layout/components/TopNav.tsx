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


// const _items: ICommandBarItemProps[] = [
//   {
//     key: 'newItem',
//     text: 'New',
//     cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
//     iconProps: { iconName: 'Add' },
//     subMenuProps: {
//       items: [
//         {
//           key: 'emailMessage',
//           text: 'Email message',
//           iconProps: { iconName: 'Mail' },
//           ['data-automation-id']: 'newEmailButton', // optional
//         },
//         {
//           key: 'calendarEvent',
//           text: 'Calendar event',
//           iconProps: { iconName: 'Calendar' },
//         },
//       ],
//     },
//   },
//   {
//     key: 'share',
//     text: 'Share',
//     iconProps: { iconName: 'Share' },
//     onClick: () => console.log('Share'),
//   },
//   {
//     key: 'download',
//     text: 'Download',
//     iconProps: { iconName: 'Download' },
//     onClick: () => console.log('Download'),
//   },
// ];

// const _overflowItems: ICommandBarItemProps[] = [
//   { key: 'move', text: 'Move to...', onClick: () => console.log('Move to'), iconProps: { iconName: 'MoveToFolder' } },
//   { key: 'copy', text: 'Copy to...', onClick: () => console.log('Copy to'), iconProps: { iconName: 'Copy' } },
//   { key: 'rename', text: 'Rename...', onClick: () => console.log('Rename'), iconProps: { iconName: 'Edit' } },
// ];
