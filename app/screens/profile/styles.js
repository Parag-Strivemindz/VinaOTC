const {StyleSheet} = require('react-native');
import {HP, WP} from '../../styles/Dimesions';
import {
  MONTSERRAT_MEDIUM,
  POPPINS_MEDIUM,
  WHITE,
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
});
