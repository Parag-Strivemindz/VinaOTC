import {StyleSheet} from 'react-native';
import {HP, WP} from '../../../styles/Dimesions';
import {
  POPPINS_MEDIUM,
  ROBOTO_REGULAR,
  SECONDARY_COLOR,
  WHITE,
  WHITE_50,
} from '../../../styles/Fonts&Colors';
import {PADDING_HORIZONTAL} from '../../../styles/GlobalStyles';

export default StyleSheet.create({
  itemContainer: {
    paddingVertical: 13,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  itemContainerLeftTitTxt: {
    fontFamily: POPPINS_MEDIUM,
    color: WHITE,
    fontSize: WP(15),
    marginLeft: WP(3),
  },
  itemContainerLeftSubTitTxt: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: WP(12),
    color: WHITE_50,
    marginTop: HP(5),
  },
  status: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: WP(14),
  },
  depositConainer: {
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '45%',
  },
  depositeTxt: {color: WHITE, fontFamily: ROBOTO_REGULAR},
  filter: {
    color: SECONDARY_COLOR,
    fontFamily: ROBOTO_REGULAR,
    fontSize: WP(20),
  },
});
