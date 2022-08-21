import {HP, WP} from '../../styles/Dimesions';
import {
  BACKGROUND_COLOR,
  GREEN_LIGHT,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  ROBOTO_MEDIUM,
  ROBOTO_REGULAR,
  SECONDARY_COLOR,
  WHITE,
  WHITE_50,
} from '../../styles/Fonts&Colors';
import {PADDING_HORIZONTAL} from '../../styles/GlobalStyles';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  dividerContainer: {
    width: '100%',
    position: 'absolute',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginLeft: 20,
  },
  divider: {
    // position: 'absolute',
    width: '70%',
    height: 5,
  },
  subHaeaderContainer: {
    paddingTop: HP(70),
    paddingBottom: 20,
    paddingHorizontal: 20,
    elevation: 2,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  titleTxt: {
    fontFamily: ROBOTO_MEDIUM,
    fontSize: 22,
    color: WHITE,
  },
  subtitleTxt: {
    color: WHITE,
    fontFamily: ROBOTO_REGULAR,
  },
  hiffenDivider: {
    marginVertical: 16,
    width: 13,
    alignSelf: 'flex-start',
    backgroundColor: '#FFA500',
  },
  hiffenDividerRow: {
    marginLeft: 16,
    width: 15,
    backgroundColor: '#FFA500',
    alignSelf: 'center',
    marginTop: 0,
  },
  profit: {
    alignSelf: 'flex-end',
    color: SECONDARY_COLOR,
    fontFamily: MONTSERRAT_REGULAR,
  },
  blockHeaderTxt: {
    color: WHITE,
    fontFamily: MONTSERRAT_MEDIUM,
    fontSize: 15,
  },
  seeAllTxt: {
    color: '#575C67',
    fontFamily: POPPINS_MEDIUM,
    fontSize: 13,
  },
  itemContainer: {
    // marginVertical: 10,
    paddingVertical: HP(13),
    paddingHorizontal: PADDING_HORIZONTAL,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContainerLeftTitTxt: {
    fontFamily: ROBOTO_MEDIUM,
    color: WHITE,
    fontSize: WP(15),
  },
  itemContainerLeftSubTitTxt: {
    fontFamily: ROBOTO_MEDIUM,
    fontSize: WP(14),
    color: WHITE_50,
  },
  filedInputTxt: {
    fontFamily: POPPINS_REGULAR,
    color: WHITE,
    fontSize: WP(13),
  },
  addFundsTxt: {
    fontFamily: MONTSERRAT_MEDIUM,
    fontSize: WP(11),
    color: WHITE,
  },
  bigActionBtnTxt: {
    fontFamily: ROBOTO_REGULAR,
    color: WHITE,
    fontSize: WP(16),
  },
  rowFilteItemContainer: {
    // marginTop: HP(10),
    // borderWidth: 1,
    paddingVertical: HP(20),
    backgroundColor: GREEN_LIGHT,
    alignItems: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
  },
});
