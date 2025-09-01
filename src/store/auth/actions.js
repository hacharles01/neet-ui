import * as types from './action-types';
import http from '../../utils/axiosInsitance';

export const loginRequest = () => ({
  type: types.LOGIN_REQUEST,
});

export const loginSuccess = (userData) => ({
  type: types.LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = (error) => ({
  type: types.LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const clearAuthError = () => ({
  type: types.CLEAR_AUTH_ERROR,
});

// Async action for login
export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    
    try {
      const response = await http.post('/auth', credentials);
      
      if (response.data.success) {
        const { user, token } = response.data;
        
        // Store token in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(user));
        
        // Set default authorization header
        http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        dispatch(loginSuccess(user));
        return response.data;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      dispatch(loginFailure(errorMessage));
      throw error;
    }
  };
};

// Check if user is logged in on app load
export const checkAuthStatus = () => {
  return (dispatch) => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        dispatch(loginSuccess(user));
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
  };
};