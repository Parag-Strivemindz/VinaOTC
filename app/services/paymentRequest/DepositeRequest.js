import SnackBar from '../../component/SnackBar';
import env from '../../config/env';
import {USER_ID} from '../../constants/AppConstant';
import {DEPOSITE_REQUEST} from '../../store/redux/paymentRequest/ActionTypes';
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

const getMyDepositeList =
  (pageNumber = 1, itemFetchPerPage = 10, filterType) =>
  async (dispatch, getState) => {
    try {
      const {
        payment: {deposite_request},
      } = getState();

      dispatch({
        type: DEPOSITE_REQUEST,
        payload: {
          ...deposite_request,
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

      postRequestWithHeader(env.DEPOSITLIST, params)
        .then(res => {
          // console.log(state.user.myPaymentHistory.data + ' getState');
          responseHandler(
            res.data,
            DEPOSITE_REQUEST,
            dispatch,
            deposite_request,
          );
        })
        .catch(e => {
          errorhandler(e, DEPOSITE_REQUEST, dispatch);
        });
    } catch (e) {
      console.error(e + ' coming from UserInfo');
    } finally {
      console.log('finally');
    }
  };

export default getMyDepositeList;
