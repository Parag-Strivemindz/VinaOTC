import {
  LOGOUT,
  USER_INFO,
  LOGIN,
  FORGET_PASSWORD,
  SIGN_UP,
} from './ActionsType';

const initialState = {
  loginData: {
    isLoading: false,
    data: '',
    error: null,
  },
  forgetPassword: {
    isLoading: false,
    data: '',
    error: null,
  },
  logout: {
    isLoading: false,
    data: '',
    error: null,
  },
  userSession: {
    isLoading: false,
    data: {
      token: null,
    },
    error: null,
  },
};

export const AuthReducer = (state, action) => {
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
    case USER_INFO:
      return {
        ...state,
        userSession: {
          ...state.userSession,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

// export const forgetPasswrod = (state, action) => {};
