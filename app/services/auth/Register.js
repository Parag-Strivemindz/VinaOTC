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
      // alert(error.response.data.message);
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

function responseHandler(res, setter) {
  if (res.data.status === 400) {
    setter(prev => ({
      ...prev,
      isLoading: false,
    }));
    SnackBar(res.data.message);
  }

  if (res.data.status === 200) {
    console.log(res.data + ' User Login token');

    setter(prev => ({
      ...prev,
      isLoading: false,
    }));
    SnackBar(res.data.message);
  }
}

export default Register = (fullName, email, password, setter) => dispatch => {
  try {
    setter(prev => ({
      ...prev,
      isLoading: true,
    }));
    postRequest(env.LOCAL_REGISTER, {
      FullName: fullName,
      Email: email,
      Password: password,
    })
      .then(res => {
        responseHandler(res, setter);
      })
      .catch(error => {
        errorhandler(error);
        // console.log(error + ' error From Regiseter');
        setter(prev => ({
          ...prev,
          isLoading: false,
        }));
      });
  } catch (error) {
    console.error(error);
  }
};
