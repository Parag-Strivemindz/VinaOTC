import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import {combineReducers, StoreEnhancer} from 'redux';
import thunk from 'redux-thunk';
import auth from './auth/reducers';
import dashboard from './dashboard/reducers';
import Localization from './localization/reducers';

const middleWare = [thunk];

const rootReducer = combineReducers({
  auth,
  dashboard,
  local: Localization,
});

export default store = createStore(rootReducer, applyMiddleware(...middleWare));
