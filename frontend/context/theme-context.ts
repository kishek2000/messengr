import { Interpolation, Theme } from '@emotion/react';
import React from 'react';
import { defaultTheme } from '../styles/themes/default';

export interface MessengrTheme {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    grey: string;
    divider: string;
    welcome: string;
    toggle: string;
  };
  input: {
    search: Interpolation<Theme>;
    primaryButton?: Interpolation<Theme>;
  };
  components: {
    chatCompleteView: Interpolation<Theme>;
    chatSummarisedView: Interpolation<Theme>;
    chatSummarisedViewActive: Interpolation<Theme>;
    chatAvatar: Interpolation<Theme>;
    menu: Interpolation<Theme>;
    themeToggle: Interpolation<Theme>;
    authPanel: Interpolation<Theme>;
    buttonPrimary: Interpolation<Theme>;
    buttonSecondary: Interpolation<Theme>;
    message: Interpolation<Theme>;
    messageActiveUser: Interpolation<Theme>;
  };
  toString: () => string;
}

export const ThemeContext = React.createContext<MessengrTheme>(defaultTheme);
