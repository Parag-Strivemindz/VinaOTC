import {useDispatch} from 'react-redux';
import {MY_STOCK_PORTFOLIO} from '../../store/redux/dashboard/actionTypes';
import {postRequestWithHeader} from '../../utils/AxiosRequest';
import env from '../../config/env';
import {getItem} from '../../utils/AsyncStorage';
import {USER_ID} from '../../constants/AppConstant';
import SnackBar from '../../component/SnackBar';

export function errorhandler(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(JSON.stringify(error.response) + ' server Response');
    if (error.response.data) {
      SnackBar(error.response.data.message);
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

export function responseHandler(res, type, dispatch) {
  // console.log(res.status);
  if (res.status === 400 || res.status === 401) {
    dispatch({
      type: type,
      payload: {
        isLoading: false,
        data: null,
        error: null,
      },
    });
    SnackBar(res.message);
  }
  if (res.status === 200) {
    console.log(res);
    dispatch({
      type: type,
      payload: {
        isLoading: false,
        data: {
          ...res,
        },
        error: null,
      },
    });
  }
}

const GetMyStockPortfolio = () => {
  return async dispatch => {
    try {
      dispatch({
        type: MY_STOCK_PORTFOLIO,
        payload: {
          isLoading: true,
          data: null,
          error: null,
        },
      });
      const userId = await getItem(USER_ID);
      postRequestWithHeader(env.MY_STOCKS_PORTFOLIO, {UserID: userId})
        .then(res => {
          responseHandler(res.data, MY_STOCK_PORTFOLIO, dispatch);
        })
        .catch(error => {
          errorhandler(error);
        });
    } catch (error) {
      console.error(error + ' error from MyStockPortfolio');
    }
  };
};

export default GetMyStockPortfolio;
