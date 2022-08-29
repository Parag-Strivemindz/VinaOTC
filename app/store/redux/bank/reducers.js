import {BANK_INFO_LIST} from './ActionTypes';

const initialState = {
  bankInfoList: {
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
        bankInfoList: {
          ...state.bankInfoList,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
