import env from '../../config/env';
import {AUTH_LOGIN, USER_ID} from '../../constants/AppConstant';
import {USER_INFO} from '../../store/redux/user/ActionTypes';
import {getItem, removeItem} from '../../utils/AsyncStorage';
import {postRequestWithHeader} from '../../utils/AxiosRequest';
import {errorhandler} from './Login';

export default SignOut = setLoader => async (dispatch, getState) => {
  try {
    setLoader(true);
    const userId = await getItem(USER_ID);
    postRequestWithHeader(env.LOGOUT, {UserID: userId})
      .then(res => {
        dispatch({
          type: USER_INFO,
          payload: {
            isLoading: false,
            data: null,
            error: null,
          },
        });
        const removeAuthToken = removeItem(AUTH_LOGIN);
        const removeUserId = removeItem(USER_ID);
        Promise.all([removeAuthToken, removeUserId]);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        errorhandler(err);
        dispatch({
          type: USER_INFO,
          payload: {
            isLoading: false,
            data: null,
            error: 'Something Went Wrong',
          },
        });
      });
  } catch (error) {
    console.error(error);
  }
};
