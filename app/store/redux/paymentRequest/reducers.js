import {DEPOSITE_REQUEST, WITHDRAW_REQUEST} from './ActionTypes';

const initialState = {
  deposite_request: {
    isLoading: false,
    data: null,
    error: null,
    noRecordFound: false,
  },
  withdraw_request: {
    isLoading: false,
    data: null,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEPOSITE_REQUEST:
      return {
        ...state,
        deposite_request: {
          ...state.deposite_request,
          ...action.payload,
        },
      };
    case WITHDRAW_REQUEST:
      return {
        ...state,
        withdraw_request: {
          ...state.withdraw_request,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
