import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import itemsReducer from './reducers/items';

const rootReducer = combineReducers({
  auth: authReducer,
  items: itemsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
