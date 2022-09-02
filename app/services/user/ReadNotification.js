import SnackBar from '../../component/SnackBar';
import env from '../../config/env';
import {USER_ID} from '../../constants/AppConstant';
import {GET_NOTIFICATION} from '../../store/redux/user/ActionTypes';
import {getItem} from '../../utils/AsyncStorage';
import {postRequestWithHeader} from '../../utils/AxiosRequest';
import {errorhandler} from '../dashboard';

export function responseHandler(
  res,
  type,
  dispatch,
  previousState,
  index,
  showSnakbar = false,
) {
  try {
    if (res.status === 400 || res.status === 401) {
      dispatch({
        type: type,
        payload: {
          ...previousState,
          isLoading: false,
          noRecordFound: true,
        },
      });
      SnackBar(res.message, false, true);
    }
    if (res.status === 200) {
      console.log(previousState.data.data[index]);
      // console.log(res);
      previousState.data.data[index].is_read = 1;
      console.log(previousState.data.data[index]);

      dispatch({
        type: type,
        payload: {
          isLoading: false,
          data: {
            data: [...previousState.data.data],
          },
          error: null,
          noRecordFound: false,
        },
      });
      if (showSnakbar) SnackBar(res.message);
    }
  } catch (error) {
    console.error(`${error} of ${type} from response Hander`);
  }
}

const readNotification =
  (notificationId, index) => async (dispatch, getState) => {
    try {
      const {
        user: {getNotification},
      } = getState();
      dispatch({
        type: GET_NOTIFICATION,
        payload: {
          ...getNotification,
          isLoading: true,
        },
      });
      console.log(notificationId + ' notification_id');
      console.log(index + ' index');
      const userId = await getItem(USER_ID);
      postRequestWithHeader(env.READ_NOTIFICATION, {
        UserID: userId,
        notification_id: notificationId,
      })
        .then(res => {
          responseHandler(
            res.data,
            GET_NOTIFICATION,
            dispatch,
            getNotification,
            index,
          );
        })
        .catch(e => {
          errorhandler(e, GET_NOTIFICATION, dispatch);
        });
    } catch (e) {
      console.error(e + ' coming from ReadNotification');
    }
  };

export default readNotification;
