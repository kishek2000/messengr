import { MessengrTheme } from '../../context/theme-context';
import { mq } from '../mq';

export const defaultTheme: MessengrTheme = {
  colors: {
    primary: 'black',
    secondary: 'white',
    tertiary: 'white',
    grey: 'rgba(0, 0, 0, 0.5)',
    divider: '1px solid rgba(255, 255, 255, 0.5)',
  },
  input: {
    search: {
      background: 'white',
      color: 'black',
      '::placeholder': { opacity: '0.3', fontWeight: 400 },
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
    chatAvatar: {
      background: '#999',
    },
  },
  toString: () => 'defaultTheme',
};
