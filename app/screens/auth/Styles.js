import {StyleSheet} from 'react-native';
import {HP} from '../../styles/Dimesions';
import {
  BACKGROUND_COLOR,
  BALCK,
  BORDER_WHITE,
  POPPINS_REGULAR,
  ROBOTO_MEDIUM,
  ROBOTO_REGULAR,
  SECONDARY_COLOR,
  WHITE,
} from '../../styles/Fonts&Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: BACKGROUND_COLOR,
  },
  blockContainer: {justifyContent: 'center'},
  textInputContainer: {
    height: 50,
    paddingLeft: 10,
    color: WHITE,
    fontFamily: 'Mulish-Regular',
  },
  loginBtnContainer: {
    marginTop: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2600DA',
    backgroundColor: 'green',
    height: 50,
  },
  loginTxt: {
    color: 'white',
    fontFamily: ROBOTO_REGULAR,
    fontSize: 16,
    textTransform: 'capitalize',
  },
  forgetPasswordTxt: {
    alignSelf: 'flex-end',
    marginTop: HP(15),
    color: WHITE,
    fontFamily: ROBOTO_MEDIUM,
  },
  haveAnAccountContainer: {
    alignSelf: 'center',
    marginTop: HP(30),
    flexDirection: 'row',
  },
  notHaveAccontTxt: {
    color: 'white',
    fontFamily: ROBOTO_MEDIUM,
    fontSize: 14,
  },
  haveAnAccount: {
    alignSelf: 'center',
    color: SECONDARY_COLOR,
    borderBottomWidth: 1,
    borderColor: SECONDARY_COLOR,
  },
  subTitleTxt: {
    color: 'gray',
    fontFamily: 'Mulish-Regular',
    fontSize: 12,
    marginTop: 3,
  },
  blockContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    width: '48%',
  },
  hideImg: {
    width: 20,
    height: 20,

    tintColor: 'black',
  },
  termAndConditionImg: {
    width: 20,
    height: 20,
    tintColor: 'green',
    marginRight: 10,
  },
  termAndConditionTxt: {
    color: BORDER_WHITE,
    fontSize: 13,
    fontFamily: POPPINS_REGULAR,
  },
});
