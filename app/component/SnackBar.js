import Snackbar from 'react-native-snackbar';
import {
  BALCK,
  BLACK_COLOR_90,
  ROBOTO_MEDIUM,
  WHITE,
} from '../styles/Fonts&Colors';

const SnackBar = (text, duration = null, action) => {
  return Snackbar.show({
    text: text,
    backgroundColor: WHITE,
    textColor: BLACK_COLOR_90,
    fontFamily: ROBOTO_MEDIUM,
    numberOfLines: 2,
    duration: duration ? duration : Snackbar.LENGTH_LONG,
    action: {
      ...action,
    },
  });
};

export default SnackBar;
