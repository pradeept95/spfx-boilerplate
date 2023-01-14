/* eslint-disable */
import { DefaultPalette, IconButton, IIconProps, mergeStyleSets, Stack } from '@fluentui/react';
import * as React from 'react';
import AppContext from '../../../common/config/app-context.config';

const expandedIcon: IIconProps = { iconName: 'DoubleChevronLeft12' };
const collapsedIcon: IIconProps = { iconName: 'DoubleChevronRight12' };

const topNavStyle = mergeStyleSets({
  nav: {
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.themeLighter,
    display: "inline", 
  },
  toggleIcon: {
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.themeLighter,
    marginTop: 10,
    marginLeft: 10 
  }
});

export const TopNav: React.FunctionComponent<{  collapsed : boolean,  setCollapsed : React.Dispatch<React.SetStateAction<boolean>>}> = (props) => {

  const {collapsed, setCollapsed} = props;

  const appContext = AppContext.getInstance();
  const siteName = appContext.siteSettings.siteName;
  return (
    <>
      <nav className={topNavStyle.nav}>
        <Stack horizontal styles={
          {
            root: {
              gap: 10
            }
          }
        }>
          <Stack>
            <IconButton
              toggle
              className={topNavStyle.toggleIcon}
              checked={collapsed}
              text={collapsed ? 'Volume muted' : 'Volume unmuted'}
              iconProps={collapsed ? collapsedIcon : expandedIcon}
              onClick={() => {
                setCollapsed(!collapsed)
              }}
            />
          </Stack>
          <Stack>
            <h3>{siteName}</h3>
          </Stack>
        </Stack>
      </nav>
    </>
  )
};
