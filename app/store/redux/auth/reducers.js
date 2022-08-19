import {
  SLICE_NAME,
  LOGOUT,
  USER_INFO,
  FORGET_PASSWORD,
  LOGIN,
} from './ActionTypes';

const initialState = {
  loginData: {
    isLoading: false,
    data: [],
    error: null,
  },
  forgetPassword: {
    isLoading: false,
    data: [],
    error: null,
  },
  logout: {
    isLoading: false,
    data: [],
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loginData: {
          ...state.loginData,
          ...action.payload,
        },
      };
    case FORGET_PASSWORD:
      return {
        ...state,
        forgetPassword: {
          ...state.forgetPassword,
          ...action.payload,
        },
      };
    case LOGOUT:
      return {
        ...state,
        logout: {
          ...state.logout,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};