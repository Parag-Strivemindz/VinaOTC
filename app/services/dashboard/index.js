import SnackBar from '../../component/SnackBar';

export function errorhandler(error, actionType, dispatch) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(JSON.stringify(error.response) + ' server Response');
    if (error.response.data) {
      SnackBar(error.response.data.message);
      console.log(error.response.data);
      // alert(error.response.data.message);
    }
  } else if (error.request) {
    console.log(error.request + ' Server not responding');
  } else {
    //something happen in setting up request that triggers an Error
    alert('Someting went wrong please try again');
    console.log(error.message + ' Someting went wrong');
  }
  if (dispatch) {
    dispatch({
      type: actionType,
      payload: {
        isLoading: false,
        data: null,
        error: 'Something Went Wrong',
      },
    });
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
