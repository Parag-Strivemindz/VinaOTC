import env from '../../config/env';
import {USER_ID} from '../../constants/AppConstant';
import {GET_NOTIFICATION} from '../../store/redux/user/ActionTypes';
import {getItem} from '../../utils/AsyncStorage';
import {postRequestWithHeader} from '../../utils/AxiosRequest';
import {errorhandler, responseHandler} from '../dashboard';

const getNotification = () => async dispatch => {
  try {
    dispatch({
      type: GET_NOTIFICATION,
      payload: {
        isLoading: true,
        data: null,
        error: null,
      },
    });
    const userId = await getItem(USER_ID);
    postRequestWithHeader(env.GETNOTIFICATION, {
      UserID: userId,
    })
      .then(res => {
        responseHandler(res.data, GET_NOTIFICATION, dispatch);
      })
      .catch(e => {
        errorhandler(e, GET_NOTIFICATION, dispatch);
      });
  } catch (e) {
    console.error(e + ' coming from UserInfo');
  } finally {
    console.log('finally');
  }
};

export default getNotification;
