import {GET_IN_TOUCH} from '../../store/redux/setting/actionTypes';
import {postRequestWithHeader} from '../../utils/AxiosRequest';
import env from '../../config/env';
import {errorhandler, responseHandler} from './ReqReshandler';
import SnackBar from '../../component/SnackBar';

const GetInTouch = (name, email, message, setter) => {
  return async dispatch => {
    try {
      setter(prev => ({
        ...prev,
        isLoading: true,
      }));

      const autoDismiss = false;
      const action = true;

      postRequestWithHeader(env.GET_IN_TOUCH, {
        Name: name,
        Email: email,
        Message: message,
      })
        .then(res => {
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
          setter(prev => ({
            ...prev,
            isLoading: false,
          }));
        });
    } catch (error) {
      console.error(error + ' error from GetinTouch');
    }
  };
};

export default GetInTouch;
