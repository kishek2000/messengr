import { MessengrTheme } from '../../context/theme-context';
import { mq } from '../mq';

export const defaultTheme: MessengrTheme = {
  colors: {
    primary: 'black',
    secondary: 'white',
    tertiary: 'white',
    grey: 'rgba(0, 0, 0, 0.5)',
    divider: '1px solid rgba(255, 255, 255, 0.5)',
    welcome: 'black',
    toggle: '#aaa',
  },
  input: {
    search: {
      background: 'white',
      border: '1.5px solid #333',
      outline: 'none',
      color: 'black',
      '::placeholder': {
        opacity: '0.3',
        fontWeight: 400,
      },
      ':focus': { outline: '1.5px solid black' },
    },
  },
  components: {
    menu: {
      background: '#eee',
      boxShadow: '2px 0px 4px rgba(0, 0, 0, .1)',
      zIndex: 2,
    },
    chatCompleteView: {
      background: 'white',
    },
    themeToggle: mq({
      background: '#eee',
    }),
    chatSummarisedView: {
      ':hover': {
        background: 'white',
      },
    },
    chatSummarisedViewActive: {
      background: 'white',
    },
    chatAvatar: {
      background: '#999',
    },
    authPanel: {
      boxShadow: '0px 0px 20px rgba(0, 0, 0, .1)',
    },
    buttonPrimary: {
      background: 'black',
      color: 'white',
    },
    buttonSecondary: {
      background: '#eee',
      color: 'black',
    },
    message: { background: '#eee' },
    messageActiveUser: { background: '#333', color: 'white' },
  },
  toString: () => 'defaultTheme',
};
