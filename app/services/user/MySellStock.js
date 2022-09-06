import env from '../../config/env';
import {USER_ID} from '../../constants/AppConstant';
import {MY_SELL_STOCKS} from '../../store/redux/user/ActionTypes';
import {getItem} from '../../utils/AsyncStorage';
import {postRequestWithHeader} from '../../utils/AxiosRequest';
import {errorhandler, responseHandler} from '../dashboard';

const getMySellStock = () => async dispatch => {
  try {
    dispatch({
      type: MY_SELL_STOCKS,
      payload: {
        isLoading: true,
        data: null,
        error: null,
      },
    });
    const userId = await getItem(USER_ID);
    postRequestWithHeader(env.SELL_STOCK_LIST, {UserID: userId})
      .then(res => {
        responseHandler(res.data, MY_SELL_STOCKS, dispatch);
      })
      .catch(e => {
        errorhandler(e, MY_SELL_STOCKS);
        dispatch({
          type: MY_SELL_STOCKS,
          payload: {
            isLoading: false,
            data: null,
            error: null,
          },
        });
      });
  } catch (e) {
    console.error(e + ' coming from UserInfo');
  } finally {
    console.log('finally');
  }
};

export default getMySellStock;
