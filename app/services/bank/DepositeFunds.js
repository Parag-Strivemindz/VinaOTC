import {postRequestMultipart} from '../../utils/AxiosRequest';
import env from '../../config/env';

import SnackBar from '../../component/SnackBar';

import {USER_ID} from '../../constants/AppConstant';
import {errorhandler} from '../dashboard';
import {getItem} from '../../utils/AsyncStorage';

const DepositeFunds = (navigation, amount, file, setter) => {
  return async dispatch => {
    try {
      setter(prev => ({
        ...prev,
        isLoading: true,
      }));

      const data = new FormData();
      const userId = await getItem(USER_ID);
      data.append('UserID', userId);
      data.append('Amount', amount);
      data.append('AttachedFile', file);
      //   console.log(JSON.stringify(data) + ' data');
      postRequestMultipart(env.DEPOSITE_FUNDS, data)
        .then(res => {
          console.log(res.data);
          if (res.data.status === 200) {
            navigation.goBack();
          }
          SnackBar(res.data.message);
        })
        .catch(error => {
          console.error(error + ' erorr');
          errorhandler(error);
        });
    } catch (error) {
      console.error(error + ' error from MyStockPortfolio');
    } finally {
      setter(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  };
};

export default DepositeFunds;
