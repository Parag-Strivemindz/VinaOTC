import {WALLET_DETAILS} from '../../store/redux/dashboard/actionTypes';
import {postRequestWithHeader} from '../../utils/AxiosRequest';
import env from '../../config/env';
import {USER_ID} from '../../constants/AppConstant';
import {errorhandler, responseHandler} from './index';
import {getItem} from '../../utils/AsyncStorage';

const GetWalletDetails = () => {
  return async dispatch => {
    try {
      dispatch({
        type: WALLET_DETAILS,
        payload: {
          isLoading: true,
          data: [],
          error: null,
        },
      });
      const userId = await getItem(USER_ID);
      postRequestWithHeader(env.WALLET_DETAILS, {UserID: userId})
        .then(res => {
          responseHandler(res.data, WALLET_DETAILS, dispatch);
        })
        .catch(error => {
          errorhandler(error, WALLET_DETAILS, payload);
        });
    } catch (error) {
      console.error(error + ' error from MyStockPortfolio');
    }
  };
};

export default GetWalletDetails;
