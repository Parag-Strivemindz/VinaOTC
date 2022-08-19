import SplashScreen from 'react-native-splash-screen';
import {USER_INFO} from '../../store/redux/login/actionTypes';

export const userInfo = () => dispatch => {
  try {
    dispatch({
      type: USER_INFO,
      payload: {
        isLoading: false,
        data: {
          token: true,
        },
        error: '',
      },
    });
  } catch (e) {
    console.log(e);
  } finally {
    SplashScreen.hide();
  }
};
