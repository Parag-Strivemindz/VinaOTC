const {StyleSheet} = require('react-native');
import {HP, WP} from '../../styles/Dimesions';
import {
  GREEN_LIGHT,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  ROBOTO_REGULAR,
  WHITE,
  WHITE_50,
} from '../../styles/Fonts&Colors';
import {PADDING_HORIZONTAL, PADDING_VERTICAL} from '../../styles/GlobalStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  paymentHistory: {
    color: WHITE,
    fontSize: WP(15),
    fontFamily: MONTSERRAT_MEDIUM,
    textTransform: 'capitalize',
  },
  walletContainer: {
    height: HP(50),
    width: WP(50),
    borderRadius: 8,
    marginRight: WP(15),
    elevation: 5,
    shadowColor: WHITE,
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
    // fontSize: WP(15),
    textTransform: 'uppercase',
  },
  hiffenDividerRow: {
    marginLeft: 16,
    width: 15,
    backgroundColor: '#FFA500',
    alignSelf: 'center',
    marginTop: 0,
  },
  profileImg: {
    width: WP(100),
    height: HP(100),
    borderRadius: 10,
    marginRight: 20,
  },
  name: {
    color: WHITE,
    fontFamily: POPPINS_MEDIUM,
    fontSize: WP(20),
  },
  email: {
    color: 'rgba(255,255,255,1)',
    fontFamily: POPPINS_REGULAR,
    fontSize: WP(13),
    marginVertical: HP(3),
  },
  editBtn: {
    width: WP(125),
    height: HP(32),
    borderRadius: 3,
    alignSelf: 'flex-start',
  },
  balanceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WP(147),
    height: HP(93),
    borderRadius: 8,
    backgroundColor: 'rgba(1, 196, 0, 0.12)',
    marginRight: 10,
  },
  depositeBtn: {
    width: WP(85),
    height: HP(32),
    borderRadius: 3,
  },
  deposite: {
    fontFamily: MONTSERRAT_REGULAR,
    color: WHITE,
    fontSize: WP(13),
  },
  rowFilteItemContainer: {
    // marginTop: HP(10),
    // borderWidth: 1,
    paddingVertical: HP(20),
    backgroundColor: GREEN_LIGHT,
    alignItems: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  fieldPlaceholder: {
    fontFamily: MONTSERRAT_MEDIUM,
    color: WHITE,
    fontSize: WP(14),
  },
  filedInputTxt: {
    fontFamily: MONTSERRAT_REGULAR,
    color: WHITE,
  },
  rowFilteItemContainer: {
    // marginTop: HP(10),
    // borderWidth: 1,
    paddingVertical: HP(20),
    backgroundColor: GREEN_LIGHT,
    alignItems: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  profileContainer: {
    width: WP(84),
    height: HP(84),
    borderRadius: WP(84 / 2),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: HP(12),
  },
  profile: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  updateProfileBtn: {
    height: HP(44),
    width: WP(204),
    borderRadius: 6,
    marginTop: HP(50),
    // alignSelf: 'flex-start',
  },
  updateProfileTxt: {
    fontFamily: ROBOTO_REGULAR,
    color: WHITE,
    fontSize: WP(16),
  },
  username: {
    fontFamily: POPPINS_REGULAR,
  },
});
