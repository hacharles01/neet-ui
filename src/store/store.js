import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import commonReducer from './common/reducers';
import tvetReducer from './tvet/reducers';

const rootReducer = combineReducers({
  common: commonReducer,
  tvet: tvetReducer,
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
