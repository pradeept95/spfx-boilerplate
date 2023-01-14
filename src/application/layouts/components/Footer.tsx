import * as React from 'react';
import { Separator } from '@fluentui/react/lib/Separator';
import { createTheme, ITheme } from '@fluentui/react/lib/Styling';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack'; 

const theme: ITheme = createTheme({
  fonts: {
    medium: {
      fontFamily: 'Monaco, Menlo, Consolas',
      fontSize: '18px',
    },
  },
});

const stackTokens: IStackTokens = { childrenGap: 12, maxHeight: 40 };

export const Footer: React.FC = () => (
  <Stack tokens={stackTokens}> 
    <Separator theme={theme}>Made With Love By IRMB</Separator>
  </Stack>
);
