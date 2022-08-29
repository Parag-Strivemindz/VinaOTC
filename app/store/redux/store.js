import {
  applyMiddleware,
  legacy_createStore as createStore,
  combineReducers,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import auth from './auth/reducers';
import dashboard from './dashboard/reducers';
import Localization from './localization/reducers';
import userInfoReducer from './user/reducers';
import bankInfo from './bank/reducers';

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);

const rootReducer = combineReducers({
  auth,
  dashboard,
  local: Localization,
  user: userInfoReducer,
  bank: bankInfo,
});

export default store = createStore(rootReducer, enhancer);
