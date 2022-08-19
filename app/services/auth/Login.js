import {postRequest} from '../../utils/AxiosRequest';
import {setItem} from '../../utils/AsyncStorage';
import {AUTH_LOGIN} from '../../constants/AppConstant';
import {devEnviromentVariables} from '../../config/env';
import {USER_INFO} from '../../store/redux/auth/ActionTypes';

function errorhandler(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(JSON.stringify(error.response) + ' server Response');
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

export default loginUser = (email, password) => dispatch => {
  try {
    dispatch({
      type: USER_INFO,
      payload: {
        isLoading: true,
        data: {
          token: null,
        },
        error: null,
      },
    });

    postRequest(devEnviromentVariables.LOCAL_LOGIN, {
      email: email,
      password: password,
    })
      .then(res => {
        console.log(res.data.accessToken + ' User Login token');
        setItem(AUTH_LOGIN, res.data.accessToken);
        dispatch({
          type: USER_INFO,
          payload: {
            isLoading: false,
            data: {
              token: res.data.accessToken,
            },
            error: null,
          },
        });
      })
      .catch(err => {
        errorhandler(err);
        dispatch({
          type: USER_INFO,
          payload: {
            isLoading: false,
            data: {
              token: null,
            },
            error: null,
          },
        });
      });
  } catch (error) {
    console.error(error);
  }
};
