import env from '../../config/env';
import {USER_ID} from '../../constants/AppConstant';
import {USER_INFO} from '../../store/redux/user/ActionTypes';
import {getItem} from '../../utils/AsyncStorage';
import {postRequestMultipart} from '../../utils/AxiosRequest';
import {errorhandler, responseHandler} from '../dashboard';

const data = new FormData();

const updateUserProfile =
  (fullName, email, profileImage, setter, navigation) => async dispatch => {
    console.log(JSON.stringify(profileImage) + ' profileImage');
    try {
      setter(prev => ({
        ...prev,
        isLoading: true,
      }));
      const userId = await getItem(USER_ID);
      data.append('UserID', userId);
      data.append('FullName', fullName);
      data.append('Email', email);
      if (profileImage.fileName != '') {
        data.append('ProfileImage', {
          uri: profileImage.uri,
          name: profileImage.fileName,
          type: profileImage.type,
        });
      }

      {
        /**
         * @param showSnakBar this parameter make snakbar show
         */
      }
      const showSnakBar = true;

      postRequestMultipart(env.UPDATE_PROFILE, data)
        .then(res => {
          responseHandler(res.data, USER_INFO, dispatch, showSnakBar);
          setter(prev => ({
            ...prev,
            isLoading: false,
          }));
          navigation.goBack();
        })
        .catch(e => {
          errorhandler(e, USER_INFO, dispatch);
          setter(prev => ({
            ...prev,
            isLoading: false,
          }));
        });
    } catch (e) {
      console.error(e + ' coming from UserInfo');
    } finally {
      console.log('finally');
    }
  };

export default updateUserProfile;
