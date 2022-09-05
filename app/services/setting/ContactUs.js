import {CONTACT_US} from '../../store/redux/setting/actionTypes';
import {getRequest} from '../../utils/AxiosRequest';
import env from '../../config/env';
import {errorhandler, responseHandler} from './ReqReshandler';

const ContactUs = language => {
  return async dispatch => {
    try {
      dispatch({
        type: CONTACT_US,
        payload: {
          isLoading: true,
          data: null,
          error: null,
        },
      });
      getRequest(env.CONTACT_US)
        .then(res => {
          responseHandler(res.data, CONTACT_US, dispatch);
        })
        .catch(error => {
          errorhandler(error, CONTACT_US, payload);
        });
    } catch (error) {
      console.error(error + ' error from GetinTouch');
    }
  };
};

export default ContactUs;
