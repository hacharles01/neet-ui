import * as types from './action-types';
import http from '../../utils/axiosInsitance';

// Registration form actions
export const updateRegistrationForm = (formData) => ({
  type: types.UPDATE_REGISTRATION_FORM,
  payload: formData,
});

export const resetRegistrationForm = () => ({
  type: types.RESET_REGISTRATION_FORM,
});

export const setFormField = (fieldName, value) => ({
  type: types.SET_FORM_FIELD,
  payload: { fieldName, value },
});

// Form validation actions
export const setFormErrors = (errors) => ({
  type: types.SET_FORM_ERRORS,
  payload: errors,
});

export const clearFormErrors = () => ({
  type: types.CLEAR_FORM_ERRORS,
});

export const setFieldError = (fieldName, error) => ({
  type: types.SET_FIELD_ERROR,
  payload: { fieldName, error },
});

export const clearFieldError = (fieldName) => ({
  type: types.CLEAR_FIELD_ERROR,
  payload: fieldName,
});

// Registration submission actions
export const submitRegistrationRequest = () => ({
  type: types.SUBMIT_REGISTRATION_REQUEST,
});

export const submitRegistrationSuccess = (response) => ({
  type: types.SUBMIT_REGISTRATION_SUCCESS,
  payload: response,
});

export const submitRegistrationFailure = (error) => ({
  type: types.SUBMIT_REGISTRATION_FAILURE,
  payload: error,
});

// Location actions
export const setProvinces = (provinces) => ({
  type: types.SET_PROVINCES,
  payload: provinces,
});

export const setDistricts = (districts) => ({
  type: types.SET_DISTRICTS,
  payload: districts,
});

export const setSectors = (sectors) => ({
  type: types.SET_SECTORS,
  payload: sectors,
});

export const setCells = (cells) => ({
  type: types.SET_CELLS,
  payload: cells,
});

export const setVillages = (villages) => ({
  type: types.SET_VILLAGES,
  payload: villages,
});

// Skills actions
export const setAvailableSkills = (skills) => ({
  type: types.SET_AVAILABLE_SKILLS,
  payload: skills,
});

export const setSelectedSkills = (skills) => ({
  type: types.SET_SELECTED_SKILLS,
  payload: skills,
});


// actions.js - Add these to your existing actions
export const verifyNidRequest = () => ({
  type: types.VERIFY_NID_REQUEST,
});

export const verifyNidSuccess = (nidData) => ({
  type: types.VERIFY_NID_SUCCESS,
  payload: nidData,
});

export const verifyNidFailure = (error) => ({
  type: types.VERIFY_NID_FAILURE,
  payload: error,
});

export const clearNidData = () => ({
  type: types.CLEAR_NID_DATA,
});

export const setNidVerified = (status) => ({
  type: types.SET_NID_VERIFIED,
  payload: status,
});

// Async action for NID verification
export const verifyNationalId = (nationalId) => {
  return async (dispatch) => {
    dispatch(verifyNidRequest());
    
    try {
      // First authenticate to get token
      const authResponse = await http.post('https://ippis.rw/api/authenticate', {
        user: 'ilas',
        secretKey: 'RdQ4R0soVaLft5IhGgtYkQC6w'
      });
      
      const token = authResponse.data.token;
      
      // Then verify NID with the token
      const nidResponse = await http.get(`https://ippis.rw/api/${nationalId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      dispatch(verifyNidSuccess(nidResponse.data));
      return nidResponse.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'NID verification failed';
      dispatch(verifyNidFailure(errorMessage));
      throw error;
    }
  };
};

// Async action for submitting registration
// export const submitRegistration = (formData) => {
//   return async (dispatch) => {
//     dispatch(submitRegistrationRequest());
    
//     try {
//       // Simulate API call - replace with actual API endpoint
//       const response = await simulateRegistrationSubmission(formData);
//       dispatch(submitRegistrationSuccess(response));
//       return response;
//     } catch (error) {
//       dispatch(submitRegistrationFailure(error.message));
//       throw error;
//     }
//   };
// };

export const submitRegistration = (formData) => {
  return async (dispatch) => {
    dispatch(submitRegistrationRequest());
    
    try {
      
      const response = await http.post('/applications', formData);
      dispatch(submitRegistrationSuccess(response.data));
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      dispatch(submitRegistrationFailure(errorMessage));
      throw error;
    }
  };
};

// Simulate registration submission - replace with actual API call
// const simulateRegistrationSubmission = async (formData) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // Simulate validation
//       if (!formData.nationalId || !formData.firstName || !formData.lastName) {
//         reject(new Error('Required fields are missing'));
//         return;
//       }
      
//       resolve({
//         success: true,
//         message: 'Registration submitted successfully',
//         registrationId: `REG-${Date.now()}`,
//         submittedAt: new Date().toISOString(),
//       });
//     }, 2000);
//   });
// };
