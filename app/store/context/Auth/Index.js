import createDataContext from '../store';
import {AuthReducer} from './Reducer';
import {userInfo} from './Actions';
import {
  loginUser,
  Register,
  OtpVerification,
  ForgetPassword as Forget,
  OtpVerification_Forgetpassword,
  ResetPassword,
  SignOut,
  ChangePassword,
} from '../../../services/auth/index';

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
      token: '',
    },
    error: null,
  },
};

export const {Context, Provider} = createDataContext(
  AuthReducer,
  {
    ChangePassword,
    ResetPassword,
    loginUser,
    SignOut,
    userInfo,
    Register,
    OtpVerification,
    Forget,
    OtpVerification_Forgetpassword,
  },
  initialState,
);
