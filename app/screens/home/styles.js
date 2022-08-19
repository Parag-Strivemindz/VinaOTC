import {HP} from '../../styles/Dimesions';
import {
  BACKGROUND_COLOR,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
  POPPINS_MEDIUM,
  ROBOTO_MEDIUM,
  ROBOTO_REGULAR,
  SECONDARY_COLOR,
  WHITE,
} from '../../styles/Fonts&Colors';

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
});
