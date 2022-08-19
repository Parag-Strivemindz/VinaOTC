import {DEV_API_URL_IDENTITY, PROD_API_URL_IDENTITY} from '@env';
//Store all of the api end points
export default {
  LOGIN: `${PROD_API_URL_IDENTITY}/api/login`,
  REGISTER: `${PROD_API_URL_IDENTITY}/api/register`,
  LOCAL_LOGIN: `${DEV_API_URL_IDENTITY}/login`,
  LOCAL_REGISTER: `${DEV_API_URL_IDENTITY}/register`,
  OTP_VERFICATION: `${DEV_API_URL_IDENTITY}/verify-otp`,
  FORGET_PASSWORD: `${DEV_API_URL_IDENTITY}/forgot-password`,
  VERIFY_FORGOT_OTP: `${DEV_API_URL_IDENTITY}/verify-forgot-otp`,
  RESET_PASSWORD: `${DEV_API_URL_IDENTITY}/reset-password`,
};
