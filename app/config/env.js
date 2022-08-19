import {DEV_API_URL_IDENTITY, PROD_API_URL_IDENTITY} from '@env';

console.log(DEV_API_URL_IDENTITY);
//make config for devEnviroment
export const devEnviromentVariables = {
  LOCAL_LOGIN: `${DEV_API_URL_IDENTITY}/login`,
  LOCAL_REGISTER: `${DEV_API_URL_IDENTITY}/register`,
  OTP_VERFICATION: `${DEV_API_URL_IDENTITY}/verify-otp`,
  FORGET_PASSWORD: `${DEV_API_URL_IDENTITY}/forgot-password`,
  VERIFY_FORGOT_OTP: `${DEV_API_URL_IDENTITY}/verify-forgot-otp`,
  RESET_PASSWORD: `${DEV_API_URL_IDENTITY}/reset-password`,
  CHANGE_PASSWORD: `${DEV_API_URL_IDENTITY}/change-password`,
};

//make config for productionEnviroment
export const prodEnviromentVariables = {
  LOGIN: `${PROD_API_URL_IDENTITY}/api/login`,
  REGISTER: `${PROD_API_URL_IDENTITY}/api/register`,
};

export default __DEV__ ? devEnviromentVariables : prodEnviromentVariables;
