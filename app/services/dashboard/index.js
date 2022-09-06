import SnackBar from '../../component/SnackBar';

export function errorhandler(error, actionType, dispatch) {
  try {
    if (error.response) {
      if (error.response.data) {
        SnackBar(error.response.data.message);
        console.log(error.response.data);
      }
    } else if (error.request) {
      console.log(error.request + ' Server not responding');
      SnackBar('Server not responding Try Again');
    } else {
      console.log(error.message + ' Someting went wrong');
      SnackBar('Something went wrong');
    }
    if (dispatch) {
    }
  } catch (error) {
    console.error(`${error} of ${actionType} from error Hander`);
  }
}

export function responseHandler(res, type, dispatch, showSnakbar = false) {
  // console.log(res.status);
  try {
    if (res.status === 400 || res.status === 401) {
      dispatch({
        type: type,
        payload: {
          isLoading: false,
          data: null,
          error: null,
        },
      });
      // SnackBar(res.message);
    }
    if (res.status === 200) {
      // console.log(res);
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
      if (showSnakbar) SnackBar(res.message);
    }
  } catch (error) {
    console.error(`${error} of ${type} from response Hander`);
  }
}
