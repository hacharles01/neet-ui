import * as types from './action-types';
import { initialState } from './state';

const tvetReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_REGISTRATION_FORM:
      return {
        ...state,
        registrationForm: {
          ...state.registrationForm,
          ...action.payload,
        },
      };

    case types.RESET_REGISTRATION_FORM:
      return {
        ...state,
        registrationForm: initialState.registrationForm,
        formErrors: {},
      };

    case types.SET_FORM_FIELD:
      return {
        ...state,
        registrationForm: {
          ...state.registrationForm,
          [action.payload.fieldName]: action.payload.value,
        },
      };

    case types.SET_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload,
      };

    case types.CLEAR_FORM_ERRORS:
      return {
        ...state,
        formErrors: {},
      };

    case types.SET_FIELD_ERROR:
      return {
        ...state,
        formErrors: {
          ...state.formErrors,
          [action.payload.fieldName]: action.payload.error,
        },
      };

    case types.CLEAR_FIELD_ERROR:
      return {
        ...state,
        formErrors: {
          ...state.formErrors,
          [action.payload]: undefined,
        },
      };

    case types.SUBMIT_REGISTRATION_REQUEST:
      return {
        ...state,
        submitting: true,
        submitError: null,
        submitSuccess: false,
      };

    case types.SUBMIT_REGISTRATION_SUCCESS:
      return {
        ...state,
        submitting: false,
        submitSuccess: true,
        submitResponse: action.payload,
        submitError: null,
      };

    case types.SUBMIT_REGISTRATION_FAILURE:
      return {
        ...state,
        submitting: false,
        submitSuccess: false,
        submitError: action.payload,
      };

      case types.RESET_REGISTRATION_FORM:
      return {
        ...state,
        registrationForm: initialState.registrationForm,
        formErrors: {},
        submitSuccess: false,
        submitError: null, 
        submitResponse: null,
      };

    case types.SET_PROVINCES:
      return {
        ...state,
        locationData: {
          ...state.locationData,
          provinces: action.payload,
        },
      };

    case types.SET_DISTRICTS:
      return {
        ...state,
        locationData: {
          ...state.locationData,
          districts: action.payload,
        },
      };

    case types.SET_SECTORS:
      return {
        ...state,
        locationData: {
          ...state.locationData,
          sectors: action.payload,
        },
      };

    case types.SET_CELLS:
      return {
        ...state,
        locationData: {
          ...state.locationData,
          cells: action.payload,
        },
      };

    case types.SET_VILLAGES:
      return {
        ...state,
        locationData: {
          ...state.locationData,
          villages: action.payload,
        },
      };

    case types.SET_AVAILABLE_SKILLS:
      return {
        ...state,
        availableSkills: action.payload,
      };

    case types.SET_SELECTED_SKILLS:
      return {
        ...state,
        selectedSkills: action.payload,
      };

  
case types.VERIFY_NID_REQUEST:
  return {
    ...state,
    nidVerification: {
      ...state.nidVerification,
      verifying: true,
      verificationError: null,
    },
  };

case types.VERIFY_NID_SUCCESS:
  return {
    ...state,
    nidVerification: {
      ...state.nidVerification,
      verifying: false,
      verified: true,
      nidData: action.payload,
      verificationError: null,
    },
  };

case types.VERIFY_NID_FAILURE:
  return {
    ...state,
    nidVerification: {
      ...state.nidVerification,
      verifying: false,
      verified: false,
      verificationError: action.payload,
      nidData: null,
    },
  };

case types.CLEAR_NID_DATA:
  return {
    ...state,
    nidVerification: {
      verifying: false,
      verified: false,
      verificationError: null,
      nidData: null,
    },
  };

case types.SET_NID_VERIFIED:
  return {
    ...state,
    nidVerification: {
      ...state.nidVerification,
      verified: action.payload,
    },
  };

    default:
      return state;
  }
};

export default tvetReducer;
