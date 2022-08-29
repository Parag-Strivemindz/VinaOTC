import {USER_INFO, MY_SELL_STOCKS, MY_PAYMENT_HISTORY} from './ActionTypes';

const initialState = {
  userInfo: {
    isLoading: false,
    data: null,
    error: null,
  },
  mySellStock: {
    isLoading: false,
    data: null,
    error: null,
  },
  myPaymentHistory: {
    isLoading: false,
    data: null,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.payload,
        },
      };
    case MY_SELL_STOCKS:
      return {
        ...state,
        mySellStock: {
          ...state.mySellStock,
          ...action.payload,
        },
      };
    case MY_PAYMENT_HISTORY:
      return {
        ...state,
        myPaymentHistory: {
          ...state.myPaymentHistory,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
