import { MessengrTheme } from '../../context/theme-context';

export const darkTheme: MessengrTheme = {
  colors: {
    primary: 'white',
    secondary: '#060917',
    tertiary: '#030610',
    grey: 'lightskyblue',
    divider: '1px solid rgba(255, 255, 255, 0.5)',
    welcome: 'magenta',
    toggle: '#333',
  },
  input: {
    search: {
      background: '#030610',
      border: '1.5px solid purple',
      outline: 'none',
      color: 'white',
      '::placeholder': {
        opacity: '0.3',
        fontWeight: 400,
        color: 'lightskyblue',
      },
      ':focus': { outline: '1.5px solid magenta' },
    },
  },
  components: {
    menu: {
      background: '#060917',
      boxShadow: '2px 0px 20px rgba(0, 0, 0, 1)',
      zIndex: 2,
    },
    chatCompleteView: {
      background: '#030610',
    },
    themeToggle: {
      background: 'purple',
      color: 'white',
    },
    chatSummarisedView: {
      ':hover': {
        background: '#030610',
      },
    },
    chatSummarisedViewActive: {
      background: '#030610',
    },
    chatAvatar: {
      background: 'purple',
    },
    authPanel: {
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 1)',
    },
    buttonPrimary: {
      background: 'darkorchid',
      color: 'white',
    },
    buttonSecondary: {
      background: '#16162d',
      color: 'white',
    },
    message: {
      background: '#222',
    },
    messageActiveUser: {
      background: '#3c0657',
    },
  },
  toString: () => 'darkTheme',
};
