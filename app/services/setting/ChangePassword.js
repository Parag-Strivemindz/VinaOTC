import {postRequestWithHeader} from '../../utils/AxiosRequest';
import env from '../../config/env';
import {USER_ID} from '../../constants/AppConstant';
import {getItem} from '../../utils/AsyncStorage';
import {errorhandler} from './ReqReshandler';
import SnackBar from '../../component/SnackBar';

const ChangePasswordAction =
  (currentPassword, newPassword, setter) => async dispatch => {
    try {
      setter(prev => ({
        ...prev,
        isLoading: true,
      }));

      const autoDismiss = false;
      const action = !autoDismiss;

      const userId = await getItem(USER_ID);
      postRequestWithHeader(env.CHANGE_PASSWORD, {
        UserID: userId,
        CurrentPassword: currentPassword,
        NewPassword: newPassword,
      })
        .then(res => {
          if (res.data.status === 200) {
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
      console.error(error + ' from ChangePassword');
    }
  };

export default ChangePasswordAction;
