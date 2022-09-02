import {NETWORK_ERROR} from './ActionTypes';

const initialState = {
  isNetworkError: {
    message: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NETWORK_ERROR:
      return {
        ...state,
        isNetworkError: {
          ...state.isNetworkError,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
