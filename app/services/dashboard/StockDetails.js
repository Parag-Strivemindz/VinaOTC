import {STOCK_PRICE} from '../../store/redux/dashboard/actionTypes';

export const data = [
  {
    id: '1',
    title: 'Nifty 50',
    time: '12:30:30 | NSE',
    value: '32445$',
    statistics: '+120.50(+0,60%)',
  },
  {
    id: '2',
    title: 'BSE Sensex',
    time: '10:16:10 | BSE',
    value: '32445$',
    statistics: '+120.50(+0,60%)',
  },
  {
    id: '3',
    title: 'Nifty Bank',
    time: '06:40:20 | NYSE',
    value: '32445$',
    statistics: '+120.50(+0,60%)',
  },
  {
    id: '4',
    title: 'Dow Jones',
    time: '12:30:30 | NSE',
    value: '32445$',
    statistics: '+120.50(+0,60%)',
  },
  {
    id: '5',
    title: 'Down Jones',
    time: '12:30:30 | NSE',
    value: '32445$',
    statistics: '+120.50(+0,60%)',
  },
  {
    id: '6',
    title: 'Ajjo',
    time: '12:30:30 | NSE',
    value: '32445$',
    statistics: '+120.50(+0,60%)',
  },
  {
    id: '7',
    title: 'Kam Kar 30',
    time: '12:30:30 | NSE',
    value: '32445$',
    statistics: '+120.50(+0,60%)',
  },
  {
    id: '8',
    title: 'laita Hai',
    time: '12:30:30 | NSE',
    value: '32445$',
    statistics: '+120.50(+0,60%)',
  },
  {
    id: '9',
    title: 'Nifty 50',
    time: '12:30:30 | NSE',
    value: '32445$',
    statistics: '+120.50(+0,60%)',
  },
  {
    id: '10',
    title: 'Nifty 50',
    time: '12:30:30 | NSE',
    value: '32445$',
    statistics: '+120.50(+0,60%)',
  },
  {
    id: '11',
    title: 'Nifty 50',
    time: '12:30:30 | NSE',
    value: '32445$',
    statistics: '+120.50(+0,60%)',
  },
  {
    id: '12',
    title: 'Chala',
    time: '12:30:30 | NSE',
    value: '32445$',
    statistics: '+120.50(+0,60%)',
  },
  {
    id: '13',
    title: 'Ghar',
    time: '12:30:30 | NSE',
    value: '32445$',
    statistics: '+120.50(+0,60%)',
  },
  {
    id: '14',
    title: 'Rakhi 50',
    time: '12:30:30 | NSE',
    value: '32445$',
    statistics: '+120.50(+0,60%)',
  },
  {
    id: '15',
    title: 'hai',
    time: '12:30:30 | NSE',
    value: '32445$',
    statistics: '+120.50(+0,60%)',
  },
];
const getStockAction = count => {
  let newData = null;
  if (count > data.length) {
    newData = data;
  } else {
    newData = data.slice(0, count);
  }
  /*
   * api calles going to be here
   *
   */
  return {
    type: STOCK_PRICE,
    payload: {
      showItems: count,
      isLoading: false,
      data: newData,
      error: null,
    },
  };
};
export default getStockAction;
