import {postRequest} from '../../utils/AxiosRequest';
import {setItem} from '../../utils/AsyncStorage';
import {AUTH_LOGIN, USER_ID} from '../../constants/AppConstant';
import env from '../../config/env';
import {USER_INFO} from '../../store/redux/user/ActionTypes';
import SnackBar from '../../component/SnackBar';

export function errorhandler(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(JSON.stringify(error.response) + ' server Response');
    if (error.response.data) {
      SnackBar('Something Went Wrong');
      console.log(error.response.data);
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

function checkCredentials(res, dispatch) {
  if (res.status === 400 || res.data.status === 401) {
    dispatch({
      type: USER_INFO,
      payload: {
        isLoading: false,
        data: null,
        error: null,
      },
    });
    SnackBar(res.message);
  }
  if (res.status === 200) {
    const {api_token, UserID} = res?.data;
    const setAuthToken = setItem(AUTH_LOGIN, api_token);
    const setUserId = setItem(USER_ID, JSON.stringify(UserID));

    Promise.all([setAuthToken, setUserId]);

    dispatch({
      type: USER_INFO,
      payload: {
        isLoading: false,
        data: {
          ...res,
        },
        error: null,
      },
    });
    SnackBar(res.message);
  }
}

export default loginUser = (email, password) => dispatch => {
  try {
    dispatch({
      type: USER_INFO,
      payload: {
        isLoading: true,
        data: null,
        error: null,
      },
    });
    postRequest(env.LOCAL_LOGIN, {
      Email: email,
      Password: password,
    })
      .then(res => {
        checkCredentials(res.data, dispatch);
      })
      .catch(err => {
        errorhandler(err);
        dispatch({
          type: USER_INFO,
          payload: {
            data: null,
            isLoading: false,
            error: 'Somthing Went Wrong...',
          },
        });
      });
  } catch (error) {
    console.error(error);
  }
};
