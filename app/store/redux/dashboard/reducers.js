import {STOCK_PRICE} from './actionTypes';

const initialState = {
  Stock_Details: {
    showItems: 5,
    isLoading: false,
    data: [
      {
        id: '1',
        statistics: '+120.50(+0,60%)',
        time: '12:30:30 | NSE',
        title: 'Nifty 50',
        value: '32445$',
      },
      {
        id: '2',
        statistics: '+120.50(+0,60%)',
        time: '10:16:10 | BSE',
        title: 'BSE Sensex',
        value: '32445$',
      },
      {
        id: '3',
        statistics: '+120.50(+0,60%)',
        time: '06:40:20 | NYSE',
        title: 'Nifty Bank',
        value: '32445$',
      },
      {
        id: '4',
        statistics: '+120.50(+0,60%)',
        time: '12:30:30 | NSE',
        title: 'Dow Jones',
        value: '32445$',
      },
    ],
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STOCK_PRICE:
      return {
        ...state,
        Stock_Details: {
          ...state.Stock_Details,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
