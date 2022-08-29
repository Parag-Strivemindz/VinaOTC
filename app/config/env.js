import {DEV_API_URL_IDENTITY, PROD_API_URL_IDENTITY} from '@env';

import {
  myStockPortfolioApi,
  walletsdetails,
  stockListing,
  stockView,
  bankInfoList,
  deposit,
  mySellStockApi,
  paymentHistoryListing,
  updateProfile,
  buyStock,
  sellStock,
} from '../constants/ApiConstants';

console.log(DEV_API_URL_IDENTITY);
//make config for devEnviroment
const devEnviromentVariables = {
  LOCAL_LOGIN: `${DEV_API_URL_IDENTITY}/login`,
  LOCAL_REGISTER: `${DEV_API_URL_IDENTITY}/registration`,
  OTP_VERFICATION: `${DEV_API_URL_IDENTITY}/verify-otp`,
  FORGET_PASSWORD: `${DEV_API_URL_IDENTITY}/forgot`,
  VERIFY_FORGOT_OTP: `${DEV_API_URL_IDENTITY}/verify-forgot-otp`,
  RESET_PASSWORD: `${DEV_API_URL_IDENTITY}/reset-password`,
  CHANGE_PASSWORD: `${DEV_API_URL_IDENTITY}/change-password`,
  GET_PROFILE_DETAILS: `${DEV_API_URL_IDENTITY}/get_profile_details`,
  LOGOUT: `${DEV_API_URL_IDENTITY}/logout_user`,
  MY_STOCKS_PORTFOLIO: `${DEV_API_URL_IDENTITY}/${myStockPortfolioApi}`,
  WALLET_DETAILS: `${DEV_API_URL_IDENTITY}/${walletsdetails}`,
  STOCK_LISTING: `${DEV_API_URL_IDENTITY}/${stockListing}`,
  STOCK_VIEW: `${DEV_API_URL_IDENTITY}/${stockView}`,
  BANK_INFO_LIST: `${DEV_API_URL_IDENTITY}/${bankInfoList}`,
  DEPOSITE_FUNDS: `${DEV_API_URL_IDENTITY}/${deposit}`,
  SELL_STOCK_LIST: `${DEV_API_URL_IDENTITY}/${mySellStockApi}`,
  MY_PAYMENT_HISTORY: `${DEV_API_URL_IDENTITY}/${paymentHistoryListing}`,
  UPDATE_PROFILE: `${DEV_API_URL_IDENTITY}/${updateProfile}`,
  BUY_STOCKS: `${DEV_API_URL_IDENTITY}/${buyStock}`,
  SELL_STOCKS: `${DEV_API_URL_IDENTITY}/${sellStock}`,
};

//make config for productionEnviroment
const prodEnviromentVariables = {
  LOGIN: `${PROD_API_URL_IDENTITY}/api/login`,
  REGISTER: `${PROD_API_URL_IDENTITY}/api/register`,
};

export default __DEV__ ? devEnviromentVariables : prodEnviromentVariables;
