/** @jsxImportSource @emotion/react */

import 'normalize.css';
import type { AppProps } from 'next/app';
import { MessengrTheme, ThemeContext } from '../context/theme-context';
import { defaultTheme } from '../styles/themes/default';
import React, { Fragment, useContext } from 'react';
import { darkTheme } from '../styles/themes/dark';
import { mq } from '../styles/mq';

import { BsSunFill, BsMoonFill } from 'react-icons/bs';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = React.useState(defaultTheme);

  React.useEffect(() => {
    const cachedTheme = localStorage.getItem('theme');
    let themeChosen: MessengrTheme;

    switch (cachedTheme) {
      case 'darkTheme':
        themeChosen = darkTheme;
        break;
      default:
        themeChosen = defaultTheme;
        break;
    }
    setTheme(themeChosen);
    localStorage.setItem('theme', themeChosen.toString());
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <Component {...pageProps} />
      <ThemeSelection setTheme={setTheme} />
    </ThemeContext.Provider>
  );
}

interface ThemeSelectionProps {
  setTheme: React.Dispatch<React.SetStateAction<MessengrTheme>>;
}

export const ThemeSelection: React.FC<ThemeSelectionProps> = ({ setTheme }) => {
  const currentTheme = useContext(ThemeContext);

  const switchTheme = React.useCallback(() => {
    setTheme((theme) => {
      if (theme.toString() === 'darkTheme') {
        return defaultTheme;
      }
      return darkTheme;
    });
  }, [setTheme]);

  const isDarkMode = React.useCallback(
    () => currentTheme.toString().includes('dark'),
    [currentTheme]
  );

  const icon = isDarkMode() ? (
    <BsMoonFill css={{ width: '16px', height: '16px' }} />
  ) : (
    <BsSunFill css={{ width: '16px', height: '16px' }} />
  );
  const togglePosition = React.useMemo(
    () => (isDarkMode() ? { right: '0px' } : { right: '24px' }),
    [isDarkMode]
  );

  return (
    <button
      css={mq({
        ...(currentTheme.components.themeToggle as { [key: string]: string }),
        position: 'fixed',
        top: ['24px'],
        right: ['24px'],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48px',
        outline: 'none',
        border: 'none',
        borderRadius: '24px',
        height: '32px',
        cursor: 'pointer',
      })}
      onClick={switchTheme}
    >
      <div
        css={{
          ...togglePosition,
          transition: '0.2s',
          position: 'absolute',
          width: '24px',
          height: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </div>
    </button>
  );
};

export default MyApp;
