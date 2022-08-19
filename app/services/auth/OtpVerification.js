import ApiConstants from '../../constants/ApiConstants';
import {postRequest, postRequestWithHeader} from '../../utils/AxiosRequest';

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

export const OtpVerification =
  (otp, email, navigationTo, setOtp) => dispatch => {
    console.log(otp + ' otp');
    console.log(email + ' email');
    try {
      setOtp(prev => ({
        ...prev,
        isLoading: true,
      }));
      postRequest(ApiConstants.OTP_VERFICATION, {otp: otp, email: email})
        .then(res => {
          setOtp(prev => ({
            ...prev,
            isLoading: false,
          }));
          navigationTo();
        })
        .catch(err => {
          console.log(JSON.stringify(err.response) + ' error');
          setOtp(prev => ({
            ...prev,
            otpError: 'otp invalid',
            isLoading: false,
          }));
        });
    } catch (err) {
      console.log(err + ' error inside otpVerifi');
    }
  };

export const OtpVerification_Forgetpassword =
  dispatch => (otp, email, navigationTo, setter) => {
    console.log(otp + ' otp');
    console.log(email + ' password');
    try {
      setter(prev => ({
        ...prev,
        isLoading: true,
      }));
      postRequest(ApiConstants.VERIFY_FORGOT_OTP, {
        email: email,
        otp: otp,
      })
        .then(res => {
          setter(prev => ({
            ...prev,
            isLoading: false,
          }));
          console.log(res + ' response ');
          navigationTo();
        })
        .catch(error => {
          errorhandler(error);
          setter(prev => ({
            ...prev,
            otpError: 'otp invalid',
            isLoading: false,
          }));
        });
    } catch (err) {
      console.log(err + ' error inside otpVerifi');
    }
  };
