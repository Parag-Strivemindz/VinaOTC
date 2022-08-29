import {USER_ID} from '../../constants/AppConstant';
import {BUY_STOCKS} from '../../store/redux/stocks/ActionTypes';

import {postRequestWithHeader} from '../../utils/AxiosRequest';
import {getItem} from '../../utils/AsyncStorage';
import {responseHandler, errorhandler} from '../dashboard/index';

import env from '../../config/env';
import SnackBar from '../../component/SnackBar';

const buyStocks = (amount, stockid, setter, navigation) => {
  return async dispatch => {
    try {
      setter(prev => ({
        ...prev,
        isLoading: true,
      }));

      const userId = await getItem(USER_ID);
      const autoDismiss = true;
      const action = autoDismiss;
      postRequestWithHeader(env.BUY_STOCKS, {
        UserID: userId,
        Amount: amount,
        StockID: stockid,
      })
        .then(res => {
          console.log(res.data);
          if (res.data.status === 200) {
            navigation.goBack();
            SnackBar(res.data.message);
          }
          if (res.data.status >= 400) {
            SnackBar(res.data.message, autoDismiss, action);
          }
          setter(prev => ({
            ...prev,
            isLoading: false,
          }));
        })
        .catch(error => {
          errorhandler(error);
        });
    } catch (error) {
      console.error(error + ' error from BuyStocks');
    }
  };
};

export default buyStocks;
