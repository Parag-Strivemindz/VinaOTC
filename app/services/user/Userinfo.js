import {errorhandler, responseHandler} from '../dashboard';
import env from '../../config/env';

import NeworkError from '../../services/network/checkNetwork';
import {USER_ID} from '../../constants/AppConstant';
import {USER_INFO} from '../../store/redux/user/ActionTypes';
import {getItem} from '../../utils/AsyncStorage';
import {postRequestWithHeader} from '../../utils/AxiosRequest';

const getUserInfo = isLoader => async dispatch => {
  try {
    isLoader(true);
    const userId = await getItem(USER_ID);
    postRequestWithHeader(env.GET_PROFILE_DETAILS, {UserID: userId})
      .then(res => {
        responseHandler(res.data, USER_INFO, dispatch);
        isLoader(false);
      })
      .catch(e => {
        errorhandler(e, USER_INFO, dispatch);
        isLoader(false);
      });
  } catch (e) {
    dispatch(NeworkError());
    console.error(e + ' coming from UserInfo');
  }
};

export default getUserInfo;
