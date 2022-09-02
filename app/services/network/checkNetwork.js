import {NETWORK_ERROR} from '../../store/redux/network/ActionTypes';

const NeworkError = () => {
  return {
    type: NETWORK_ERROR,
    payload: 'Please Connect to Internet',
  };
};

export default NeworkError;
