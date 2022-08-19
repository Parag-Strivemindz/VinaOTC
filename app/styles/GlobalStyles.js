import {StyleSheet} from 'react-native';
import {HP, WP} from './Dimesions';
import {ROBOTO_MEDIUM, SECONDARY_COLOR, WHITE} from './Fonts&Colors';

export const HEADER_HEIGHT = 50;
export const PADDING_HORIZONTAL = 20;
export const PADDING_VERTICAL = 20;
export const CONTAINER_PADDINGTOP = WP(HEADER_HEIGHT + PADDING_VERTICAL);

export default styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingTop: CONTAINER_PADDINGTOP,
  },
  headingTxt: {
    fontFamily: 'Mulish-Bold',
    fontSize: 18,
    color: 'white',
  },
  actionBtn: {
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SECONDARY_COLOR,
    height: 45,
  },
  actionBtnTxt: {
    color: WHITE,
    fontFamily: ROBOTO_MEDIUM,
    fontSize: 16,
  },
});
