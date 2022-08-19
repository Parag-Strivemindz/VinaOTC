import {postRequestWithHeader} from '../../utils/AxiosRequest';
import {devEnviromentVariables} from '../../config/env';
import {AUTH_LOGIN} from '../../constants/AppConstant';

import {getItem} from '../../utils/AsyncStorage';
function errorhandler(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(JSON.stringify(error.response) + ' server Response');
    if (error.response.data) {
      alert(error.response.data.message);
    }
    if (error.response.status > 200) {
      // alert(error.response.status);
    }
    // alert(error.response.status);
    // alert(error.response.headers);
  } else if (error.request) {
    console.log(error.request + ' Server not responding');
    //the requset is made but no response is send by server
  } else {
    //something happen in setting up request that triggers an Error
    alert('Someting went wrong please try again');
    console.log(error.message + ' Someting went wrong');
  }
  // console.log(error.config);
}

const ChangePassword =
  (oldPassword, newPassword, confirmPassword, navigateTo, setter) =>
  dispatch => {
    try {
      setter(prev => ({
        ...prev,
        isLoading: true,
      }));
      postRequestWithHeader(devEnviromentVariables.CHANGE_PASSWORD, {
        oldpass: oldPassword,
        newpass: newPassword,
        confirmpass: confirmPassword,
      })
        .then(res => {
          setter(prev => ({
            ...prev,
            isLoading: false,
          }));
          navigateTo();
        })
        .catch(error => {
          setter(prev => ({
            ...prev,
            isLoading: false,
          }));
          errorhandler(error);
        });
    } catch (error) {
      setter(prev => ({
        ...prev,
        isLoading: true,
      }));
      console.log(Error + ' from postRequestWithHeader');
    }
  };

export default ChangePassword;
