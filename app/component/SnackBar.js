import Snackbar from 'react-native-snackbar';
import {
  BALCK,
  BLACK_COLOR_90,
  ROBOTO_MEDIUM,
  WHITE,
} from '../styles/Fonts&Colors';

const SnackBar = (text, autoDismiss = true, action = false) => {
  return Snackbar.show({
    text: text,
    backgroundColor: WHITE,
    textColor: BLACK_COLOR_90,
    fontFamily: ROBOTO_MEDIUM,
    numberOfLines: 2,
    duration: autoDismiss ? Snackbar.LENGTH_LONG : Snackbar.LENGTH_INDEFINITE,
    action: action && {
      text: 'Ok',
      textColor: 'black',
      onPress: () => Snackbar.dismiss(),
    },
  });
};

export default SnackBar;
