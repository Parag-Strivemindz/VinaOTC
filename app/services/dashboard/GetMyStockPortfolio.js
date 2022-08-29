import {USER_ID} from '../../constants/AppConstant';
import {MY_STOCK_PORTFOLIO} from '../../store/redux/dashboard/actionTypes';

import {postRequestWithHeader} from '../../utils/AxiosRequest';
import {getItem} from '../../utils/AsyncStorage';
import {responseHandler, errorhandler} from './index';

import env from '../../config/env';

const GetMyStockPortfolio = () => {
  return async dispatch => {
    try {
      dispatch({
        type: MY_STOCK_PORTFOLIO,
        payload: {
          isLoading: true,
          data: null,
          error: null,
        },
      });
      const userId = await getItem(USER_ID);
      postRequestWithHeader(env.MY_STOCKS_PORTFOLIO, {UserID: userId})
        .then(res => {
          responseHandler(res.data, MY_STOCK_PORTFOLIO, dispatch);
        })
        .catch(error => {
          errorhandler(error, MY_STOCK_PORTFOLIO, dispatch);
        });
    } catch (error) {
      console.error(error + ' error from MyStockPortfolio');
    }
  };
};

export default GetMyStockPortfolio;
