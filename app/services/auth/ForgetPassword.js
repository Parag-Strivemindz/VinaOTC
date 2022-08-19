import {postRequest} from '../../utils/AxiosRequest';
import ApiConstants from '../../constants/ApiConstants';

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

const ForgetPassword = (email, setter) => dispatch => {
  try {
    setter(prev => ({
      ...prev,
      isLoading: true,
    }));
    postRequest(ApiConstants.FORGET_PASSWORD, {
      email: email,
    })
      .then(res => {
        setter(prev => ({
          ...prev,
          isLoading: false,
          isOtpSend: true,
        }));
      })
      .catch(error => {
        setter(prev => ({
          ...prev,
          isLoading: false,
          isOtpSend: false,
        }));
        // console.log(error);
        errorhandler(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export default ForgetPassword;
