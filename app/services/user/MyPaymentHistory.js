import SnackBar from '../../component/SnackBar';
import env from '../../config/env';
import {USER_ID} from '../../constants/AppConstant';
import {MY_PAYMENT_HISTORY} from '../../store/redux/user/ActionTypes';
import {getItem} from '../../utils/AsyncStorage';
import {postRequestWithHeader} from '../../utils/AxiosRequest';
import {errorhandler} from '../dashboard';

export function responseHandler(
  res,
  type,
  dispatch,
  previousState,
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
      SnackBar('No More Record Found', false, true);
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
          noRecordFound: false,
        },
      });
      if (showSnakbar) SnackBar(res.message);
    }
  } catch (error) {
    console.error(`${error} of ${type} from response Hander`);
  }
}

const getMyPaymentHistory =
  (pageNumber = 1, itemFetchPerPage = 10, filterType) =>
  async (dispatch, getState) => {
    try {
      const {
        user: {myPaymentHistory},
      } = getState();

      dispatch({
        type: MY_PAYMENT_HISTORY,
        payload: {
          ...myPaymentHistory,
          isLoading: true,
        },
      });
      const userId = await getItem(USER_ID);

      const withFilterType = {
        UserID: userId,
        start: pageNumber,
        length: itemFetchPerPage,
        type: filterType,
      };

      const notwithFilterType = {
        UserID: userId,
        start: pageNumber,
        length: itemFetchPerPage,
      };

      const params = filterType ? withFilterType : notwithFilterType;

      postRequestWithHeader(env.MY_PAYMENT_HISTORY, params)
        .then(res => {
          // console.log(state.user.myPaymentHistory.data + ' getState');
          responseHandler(
            res.data,
            MY_PAYMENT_HISTORY,
            dispatch,
            myPaymentHistory,
          );
        })
        .catch(e => {
          errorhandler(e, MY_PAYMENT_HISTORY, dispatch);
          dispatch({
            type: MY_PAYMENT_HISTORY,
            payload: {
              ...myPaymentHistory,
              isLoading: false,
            },
          });
        });
    } catch (e) {
      console.error(e + ' coming from UserInfo');
    } finally {
      console.log('finally');
    }
  };

export default getMyPaymentHistory;
