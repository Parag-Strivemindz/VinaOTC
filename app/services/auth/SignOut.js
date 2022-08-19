import {AUTH_LOGIN} from '../../constants/AppConstant';
import {USER_INFO} from '../../store/redux/auth/ActionTypes';
import {removeItem} from '../../utils/AsyncStorage';

export default SignOut = () => dispatch => {
  try {
    removeItem(AUTH_LOGIN);
    dispatch({
      type: USER_INFO,
      payload: {
        data: {
          token: null,
        },
        error: null,
        isLoading: false,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
