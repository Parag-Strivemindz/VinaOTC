import {postRequest} from '../../utils/AxiosRequest';
import env from '../../config/env';
import SnackBar from '../../component/SnackBar';

function errorhandler(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(JSON.stringify(error.response) + ' server Response');
    if (error.response.data) {
      SnackBar(error.response.data.message);
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

function onResponseHandler(res, setter) {
  if (res.data.status === 400 || res.data.status === 401) {
    setter(prev => ({
      ...prev,
      isLoading: false,
    }));
    SnackBar(res.data.message);
  }
  if (res.data.status === 200) {
    setter(prev => ({
      ...prev,
      isLoading: false,
      isLinkSend: true,
    }));
    SnackBar(res.data.message);
  }
}

const ForgetPassword = (email, setter) => dispatch => {
  try {
    setter(prev => ({
      ...prev,
      isLoading: true,
    }));
    postRequest(env.FORGET_PASSWORD, {
      Email: email,
    })
      .then(res => {
        onResponseHandler(res, setter);
      })
      .catch(error => {
        setter(prev => ({
          ...prev,
          isLoading: false,
          isLinkSend: false,
        }));
        errorhandler(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export default ForgetPassword;
