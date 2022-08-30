import {CONTACT_US, GET_IN_TOUCH} from './actionTypes';

const initialState = {
  contactUS: {
    isLoading: false,
    data: null,
    error: null,
  },
  getInTouch: {
    isLoading: false,
    data: null,
    error: null,
  },
  // Stock_List: {
  //   isLoading: false,
  //   data: null,
  //   error: null,
  // },
  // Stock_View: {
  //   isLoading: false,
  //   data: null,
  //   error: null,
  // },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_US:
      return {
        ...state,
        contactUS: {
          ...state.contactUS,
          ...action.payload,
        },
      };
    case GET_IN_TOUCH:
      return {
        ...state,
        getInTouch: {
          ...state.getInTouch,
          ...action.payload,
        },
      };
    // case STOCK_LIST:
    //   return {
    //     ...state,
    //     Stock_List: {
    //       ...state.Stock_List,
    //       ...action.payload,
    //     },
    //   };
    // case STOCK_VIEW:
    //   return {
    //     ...state,
    //     Stock_View: {
    //       ...state.Stock_View,
    //       ...action.payload,
    //     },
    //   };
    default:
      return state;
  }
};
