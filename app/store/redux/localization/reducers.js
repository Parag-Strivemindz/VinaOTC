import {LOCAL_LANGUAGE} from './actionTypes';

const initialState = {
  language: {
    code: 'en_US',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCAL_LANGUAGE:
      return {
        ...state,
        language: {
          ...state.language,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
