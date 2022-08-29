import {BANK_INFO_LIST} from '../../store/redux/bank/ActionTypes';
import {postRequestWithHeader} from '../../utils/AxiosRequest';
import env from '../../config/env';
import {USER_ID} from '../../constants/AppConstant';
import {errorhandler, responseHandler} from '../dashboard';
import {getItem} from '../../utils/AsyncStorage';

const getBankInfoList = () => {
  return async dispatch => {
    try {
      dispatch({
        type: BANK_INFO_LIST,
        payload: {
          isLoading: true,
          data: null,
          error: null,
        },
      });
      const userId = await getItem(USER_ID);
      postRequestWithHeader(env.BANK_INFO_LIST, {UserID: userId})
        .then(res => {
          responseHandler(res.data, BANK_INFO_LIST, dispatch);
        })
        .catch(error => {
          errorhandler(error, BANK_INFO_LIST, dispatch);
        });
    } catch (error) {
      console.error(error + ' error from MyStockPortfolio');
    }
  };
};

export default getBankInfoList;
