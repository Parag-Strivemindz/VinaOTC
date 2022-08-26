import {
  MY_STOCK_PORTFOLIO,
  WALLET_DETAILS,
  STOCK_LIST,
  STOCK_VIEW,
} from './actionTypes';

const initialState = {
  Stock_Portfolio: {
    isLoading: false,
    data: null,
    error: null,
  },
  Wallet_Details: {
    isLoading: false,
    data: null,
    error: null,
  },
  Stock_List: {
    isLoading: false,
    data: null,
    error: null,
  },
  Stock_View: {
    isLoading: false,
    data: null,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MY_STOCK_PORTFOLIO:
      return {
        ...state,
        Stock_Portfolio: {
          ...state.Stock_Portfolio,
          ...action.payload,
        },
      };
    case WALLET_DETAILS:
      return {
        ...state,
        Wallet_Details: {
          ...state.Wallet_Details,
          ...action.payload,
        },
      };
    case STOCK_LIST:
      return {
        ...state,
        Stock_List: {
          ...state.Stock_List,
          ...action.payload,
        },
      };
    case STOCK_VIEW:
      return {
        ...state,
        Stock_View: {
          ...state.Stock_View,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
