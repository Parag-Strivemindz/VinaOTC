import {USER_ID} from '../../constants/AppConstant';

import {postRequestWithHeader} from '../../utils/AxiosRequest';
import {getItem} from '../../utils/AsyncStorage';
import {errorhandler} from '../dashboard/index';

import env from '../../config/env';
import SnackBar from '../../component/SnackBar';

const WithDrawFundAction = (getter, setter) => {
  const {
    ammount,
    accountNumber,
    ifscCode,
    accountHolder,
    bankName,
    branchCode,
    branchAddress,
  } = getter;

  return async dispatch => {
    try {
      setter(prev => ({
        ...prev,
        isLoading: true,
      }));

      const userId = await getItem(USER_ID);
      const autoDismiss = true;
      const action = autoDismiss;
      postRequestWithHeader(env.WITHDRAW_FUND, {
        UserID: userId,
        Amount: ammount,
        BankAccountNo: accountNumber,
        IFSCCode: ifscCode,
        AccountHolderName: accountHolder,
        BankName: bankName,
        BranchCode: branchCode,
        BankAddress: branchAddress,
      })
        .then(res => {
          console.log(res.data);
          if (res.data.status === 200) {
            // navigation.goBack();
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

export default WithDrawFundAction;
