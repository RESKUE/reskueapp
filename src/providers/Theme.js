import {DefaultTheme} from 'react-native-paper';

const RESKUE_GREEN = '#01A569';
const RESKUE_REDISH = '#a51d01';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: RESKUE_GREEN,
    redish: RESKUE_REDISH,
    highlightBG: '#02d487',
    highlightFG: '#ffffff',
  },
};
