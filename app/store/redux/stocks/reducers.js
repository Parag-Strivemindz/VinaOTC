import {BANK_INFO_LIST, SELL_STOCKS} from './ActionTypes';

const initialState = {
  buyStocks: {
    isLoading: false,
    data: null,
    error: null,
  },
  sellStocks: {
    isLoading: false,
    data: null,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BANK_INFO_LIST:
      return {
        ...state,
        buyStocks: {
          ...state.bankInfoList,
          ...action.payload,
        },
      };
    case SELL_STOCKS:
      return {
        ...state,
        sellStocks: {
          ...state.sellStocks,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
