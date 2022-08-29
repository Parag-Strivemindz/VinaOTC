import env from '../../config/env';
import {USER_ID} from '../../constants/AppConstant';
import {MY_PAYMENT_HISTORY} from '../../store/redux/user/ActionTypes';
import {getItem} from '../../utils/AsyncStorage';
import {postRequestWithHeader} from '../../utils/AxiosRequest';
import {errorhandler, responseHandler} from '../dashboard';

const getMyPaymentHistory =
  (start = 0, end = 10) =>
  async dispatch => {
    try {
      dispatch({
        type: MY_PAYMENT_HISTORY,
        payload: {
          isLoading: true,
          data: null,
          error: null,
        },
      });
      const userId = await getItem(USER_ID);
      postRequestWithHeader(env.MY_PAYMENT_HISTORY, {
        UserID: userId,
        start: start,
        end: end,
      })
        .then(res => {
          responseHandler(res.data, MY_PAYMENT_HISTORY, dispatch);
        })
        .catch(e => {
          errorhandler(e, MY_PAYMENT_HISTORY, dispatch);
        });
    } catch (e) {
      console.error(e + ' coming from UserInfo');
    } finally {
      console.log('finally');
    }
  };

export default getMyPaymentHistory;
