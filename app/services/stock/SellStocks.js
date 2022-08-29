import {USER_ID} from '../../constants/AppConstant';
import {SELL_STOCKS} from '../../store/redux/stocks/ActionTypes';

import {postRequestWithHeader} from '../../utils/AxiosRequest';
import {getItem} from '../../utils/AsyncStorage';
import {responseHandler, errorhandler} from '../dashboard/index';

import env from '../../config/env';
import SnackBar from '../../component/SnackBar';

const sellStock = (qty, stockCode, setter, navigation) => {
  return async dispatch => {
    try {
      setter(prev => ({
        ...prev,
        isLoading: true,
      }));

      const userId = await getItem(USER_ID);
      const autoDismiss = true;
      const action = autoDismiss;
      postRequestWithHeader(env.SELL_STOCKS, {
        UserID: userId,
        Qty: qty,
        StockCode: stockCode,
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
          setter(prev => ({
            ...prev,
            isLoading: false,
          }));
        });
    } catch (error) {
      console.error(error + ' error from SellStock');
    }
  };
};

export default sellStock;
