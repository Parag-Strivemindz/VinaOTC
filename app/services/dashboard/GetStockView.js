import {STOCK_VIEW} from '../../store/redux/dashboard/actionTypes';
import {postRequestWithHeader} from '../../utils/AxiosRequest';
import env from '../../config/env';
import {USER_ID} from '../../constants/AppConstant';
import {errorhandler, responseHandler} from './GetMyStockPortfolio';
import {getItem} from '../../utils/AsyncStorage';

const getStockView = codeId => {
  return async dispatch => {
    try {
      dispatch({
        type: STOCK_VIEW,
        payload: {
          isLoading: true,
          data: null,
          error: null,
        },
      });
      const userId = await getItem(USER_ID);
      postRequestWithHeader(env.STOCK_VIEW, {
        UserID: JSON.parse(userId),
        CodeID: codeId,
      })
        .then(res => {
          responseHandler(res.data, STOCK_VIEW, dispatch);
        })
        .catch(error => {
          errorhandler(error);
        });
    } catch (error) {
      console.error(error + ' error from MyStockPortfolio');
    }
  };
};

export default getStockView;
