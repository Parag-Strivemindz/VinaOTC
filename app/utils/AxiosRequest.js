import axios from 'axios';
import {getItem} from '../utils/AsyncStorage';
import {AUTH_LOGIN} from '../constants/AppConstant';

export const getRequest = async url => {
  const token = await getItem(AUTH_LOGIN);
  return await axios.request({
    method: 'get',
    url: url,
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
};

export const postRequest = async (url, data) => {
  console.log(JSON.stringify(data) + ' data from PostRequest');
  console.log(url + ' url');
  return await axios.request({
    method: 'post',
    url: url,
    data: {
      ...data,
    },
  });
};

export const postRequestWithHeader = async (url, data) => {
  const token = await getItem(AUTH_LOGIN); //use await before  to stop Execution Here Until get the access Token
  console.log(token + ' accessToken');
  console.log(JSON.stringify(data) + ' data from PostRequestWuthHeader');
  // const token = await AsyncStorage.getItem(AUTH_LOGIN);
  // console.log(token + ' item');
  console.log(url + ' postRequestWithHeader url');
  return await axios.request({
    method: 'post',
    url: url,
    data: {
      ...data,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postRequestMultipart = async (url, data) => {
  const token = await getItem(AUTH_LOGIN); //use await before  to stop Execution Here Until get the access Token
  console.log(JSON.stringify(data) + ' data from PostRequestWuthHeader');
  return await axios.request({
    method: 'post',
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': `multipart/form-data`,
    },
    data: data,
  });
};
