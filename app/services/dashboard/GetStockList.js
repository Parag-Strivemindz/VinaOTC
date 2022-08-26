import {STOCK_LIST} from '../../store/redux/dashboard/actionTypes';
import {postRequestWithHeader} from '../../utils/AxiosRequest';
import env from '../../config/env';
import {USER_ID} from '../../constants/AppConstant';
import {errorhandler, responseHandler} from './GetMyStockPortfolio';
import {getItem} from '../../utils/AsyncStorage';

const getStockList = () => {
  return async dispatch => {
    try {
      dispatch({
        type: STOCK_LIST,
        payload: {
          isLoading: true,
          data: null,
          error: null,
        },
      });
      const userId = await getItem(USER_ID);
      postRequestWithHeader(env.STOCK_LISTING, {UserID: userId})
        .then(res => {
          responseHandler(res.data, STOCK_LIST, dispatch);
        })
        .catch(error => {
          errorhandler(error);
        });
    } catch (error) {
      console.error(error + ' error from MyStockPortfolio');
    }
  };
};

export default getStockList;
