import SnackBar from '../../component/SnackBar';
import env from '../../config/env';
import {USER_ID} from '../../constants/AppConstant';
import {WITHDRAW_REQUEST} from '../../store/redux/paymentRequest/ActionTypes';
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

const getMyWithDrawRequest =
  (pageNumber = 1, itemFetchPerPage = 10, filterType) =>
  async (dispatch, getState) => {
    try {
      const {
        payment: {withdraw_request},
      } = getState();

      dispatch({
        type: WITHDRAW_REQUEST,
        payload: {
          ...withdraw_request,
          isLoading: true,
        },
      });
      const userId = await getItem(USER_ID);

      const params = filterType
        ? {
            UserID: userId,
            start: pageNumber,
            length: itemFetchPerPage,
            ...filterType,
          }
        : {
            UserID: userId,
            start: pageNumber,
            length: itemFetchPerPage,
          };

      postRequestWithHeader(env.WITHDRAWALLIST, params)
        .then(res => {
          // console.log(state.user.myPaymentHistory.data + ' getState');
          responseHandler(
            res.data,
            WITHDRAW_REQUEST,
            dispatch,
            withdraw_request,
          );
        })
        .catch(e => {
          errorhandler(e, WITHDRAW_REQUEST, dispatch);
        });
    } catch (e) {
      console.error(e + ' coming from witdraw');
    }
  };

export default getMyWithDrawRequest;
