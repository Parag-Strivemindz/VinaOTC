const {StyleSheet} = require('react-native');
import {HP, WP} from '../../styles/Dimesions';
import {
  MONTSERRAT_MEDIUM,
  POPPINS_MEDIUM,
  WHITE,
  WHITE_50,
} from '../../styles/Fonts&Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  paymentHistory: {
    color: WHITE,
    fontSize: WP(15),
    fontFamily: MONTSERRAT_MEDIUM,
  },
  walletContainer: {
    height: HP(50),
    width: WP(50),
    borderRadius: 8,
    marginRight: WP(15),
    elevation: 5,
  },
  payment_type: {
    fontSize: 12,
    color: WHITE,
    fontFamily: POPPINS_MEDIUM,
  },
  payment_time: {
    color: WHITE_50,
    fontFamily: POPPINS_MEDIUM,
    fontSize: WP(10),
    marginTop: HP(2),
  },
  seeAllTxt: {
    color: '#575C67',
    fontFamily: POPPINS_MEDIUM,
    fontSize: WP(13),
  },
  blockHeaderTxt: {
    color: WHITE,
    fontFamily: MONTSERRAT_MEDIUM,
    fontSize: 15,
  },
  hiffenDividerRow: {
    marginLeft: 16,
    width: 15,
    backgroundColor: '#FFA500',
    alignSelf: 'center',
    marginTop: 0,
  },
});
