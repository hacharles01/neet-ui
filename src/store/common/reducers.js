import * as types from './action-types';
import { initialState } from './state';

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case types.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case types.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case types.SET_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: action.payload,
      };

    case types.CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: null,
      };

    case types.FETCH_USER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.FETCH_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload,
        error: null,
      };

    case types.FETCH_USER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        userData: null,
      };

    case types.CLEAR_USER_DATA:
      return {
        ...state,
        userData: null,
        error: null,
      };

    default:
      return state;
  }
};

export default commonReducer;
