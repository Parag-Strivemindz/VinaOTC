import SplashScreen from 'react-native-splash-screen';
import SnackBar from '../../component/SnackBar';

import env from '../../config/env';
import {USER_ID} from '../../constants/AppConstant';
import {USER_INFO} from '../../store/redux/user/ActionTypes';
import {getItem} from '../../utils/AsyncStorage';
import {postRequestWithHeader} from '../../utils/AxiosRequest';

function errorhandler(error, dispatch) {
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

function responseHandler(res, dispatch) {
  if (res.data.status === 400 || res.data.status === 401) {
    dispatch({
      type: USER_INFO,
      payload: {
        isLoading: false,
        data: null,
        error: null,
      },
    });
    // SplashScreen.hide();
    SnackBar(res.data.message);
  }
  if (res.data.status === 200) {
    // console.log(JSON.stringify(res.data) + ' User_INFO Data');
    dispatch({
      type: USER_INFO,
      payload: {
        isLoading: false,
        data: {
          ...res.data.data,
        },
        error: null,
      },
    });
    // SplashScreen.hide();
  }
}

const getUserInfo = isLoader => async dispatch => {
  try {
    isLoader(true);
    const userId = await getItem(USER_ID);
    postRequestWithHeader(env.GET_PROFILE_DETAILS, {UserID: userId})
      .then(res => {
        responseHandler(res, dispatch);
        isLoader(false);
      })
      .catch(e => {
        errorhandler(e);
        isLoader(false);
        dispatch({
          type: USER_INFO,
          payload: {
            isLoading: false,
            data: null,
            error: 'Somthing Went Wrong...',
          },
        });
      });
  } catch (e) {
    console.error(e + ' coming from UserInfo');
  } finally {
    console.log('finally');
  }
};

export default getUserInfo;
