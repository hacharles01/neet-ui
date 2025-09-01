import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import commonReducer from './common/reducers';
import tvetReducer from './tvet/reducers';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
  common: commonReducer,
  tvet: tvetReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;
