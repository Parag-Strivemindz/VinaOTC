import {ActionType} from '../../store/redux/localization/index';

const LocalizationAction = currentLanguage => ({
  type: ActionType.LOCAL_LANGUAGE,
  payload: {
    code: currentLanguage,
  },
});

export default LocalizationAction;
