import * as types from './action-types';

// Loading actions
export const setLoading = (isLoading) => ({
  type: types.SET_LOADING,
  payload: isLoading,
});

// Error actions
export const setError = (error) => ({
  type: types.SET_ERROR,
  payload: error,
});

export const clearError = () => ({
  type: types.CLEAR_ERROR,
});

// Success message actions
export const setSuccessMessage = (message) => ({
  type: types.SET_SUCCESS_MESSAGE,
  payload: message,
});

export const clearSuccessMessage = () => ({
  type: types.CLEAR_SUCCESS_MESSAGE,
});

// User data actions
export const fetchUserByIdRequest = () => ({
  type: types.FETCH_USER_BY_ID_REQUEST,
});

export const fetchUserByIdSuccess = (userData) => ({
  type: types.FETCH_USER_BY_ID_SUCCESS,
  payload: userData,
});

export const fetchUserByIdFailure = (error) => ({
  type: types.FETCH_USER_BY_ID_FAILURE,
  payload: error,
});

export const clearUserData = () => ({
  type: types.CLEAR_USER_DATA,
});

// Async action for fetching user by ID
export const fetchUserById = (userId) => {
  return async (dispatch) => {
    dispatch(fetchUserByIdRequest());
    
    try {
      // Simulate API call - replace with actual API endpoint
      const response = await simulateUserFetch(userId);
      dispatch(fetchUserByIdSuccess(response));
    } catch (error) {
      dispatch(fetchUserByIdFailure(error.message));
    }
  };
};

// Simulate user data fetch - replace with actual API call
const simulateUserFetch = async (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock user data - replace with actual API response
      const mockUsers = {
        '1234567890123456': {
          id: '1234567890123456',
          firstName: 'Jean',
          lastName: 'Uwimana',
          dateOfBirth: '1995-03-15',
          sex: 'Gabo',
          phone: '+250788123456',
          email: 'jean.uwimana@example.com'
        },
        '9876543210987654': {
          id: '9876543210987654',
          firstName: 'Marie',
          lastName: 'Mukamana',
          dateOfBirth: '1998-07-22',
          sex: 'Gore',
          phone: '+250789654321',
          email: 'marie.mukamana@example.com'
        }
      };

      const user = mockUsers[userId];
      if (user) {
        resolve(user);
      } else {
        reject(new Error('User not found with the provided ID'));
      }
    }, 1000);
  });
};
