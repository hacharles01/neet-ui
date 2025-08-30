export const validateRegistrationForm = (formData) => {
  const errors = {};

  // Registration type validation
  if (!formData.registrationType) {
    errors.registrationType = 'Please select registration type';
  }

  // Personal information validation
  if (!formData.firstName?.trim()) {
    errors.firstName = 'First name is required';
  } else if (formData.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!formData.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  } else if (formData.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  if (!formData.nationalId?.trim()) {
    errors.nationalId = 'National ID is required';
  } else if (!/^\d{16}$/.test(formData.nationalId.trim())) {
    errors.nationalId = 'National ID must be exactly 16 digits';
  }

  if (!formData.sex) {
    errors.sex = 'Sex is required';
  }

  if (!formData.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else {
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 16 || age > 30) {
      errors.dateOfBirth = 'Age must be between 16 and 30 years';
    }
  }

  if (!formData.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\+?250\d{9}$/.test(formData.phone.trim().replace(/\s/g, ''))) {
    errors.phone = 'Please enter a valid Rwandan phone number (+250XXXXXXXXX)';
  }

  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  // Location validation
  if (!formData.province) {
    errors.province = 'Province is required';
  }

  if (!formData.district) {
    errors.district = 'District is required';
  }

  if (!formData.sector) {
    errors.sector = 'Sector is required';
  }

  if (!formData.cell) {
    errors.cell = 'Cell is required';
  }

  if (!formData.village) {
    errors.village = 'Village is required';
  }

  // Education validation
  if (!formData.educationLevel) {
    errors.educationLevel = 'Education level is required';
  }

  // Skills validation
  if (!formData.primarySkill) {
    errors.primarySkill = 'Primary skill is required';
  }

  // Check for duplicate skills
  const skills = [formData.primarySkill, formData.secondarySkill, formData.tertiarySkill].filter(Boolean);
  const uniqueSkills = new Set(skills);
  
  if (skills.length !== uniqueSkills.size) {
    errors.secondarySkill = 'Skills cannot be duplicated';
    errors.tertiarySkill = 'Skills cannot be duplicated';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateStep = (step, formData) => {
  const allValidation = validateRegistrationForm(formData);
  const stepErrors = {};

  switch (step) {
    case 0: // Registration Type
      if (allValidation.errors.registrationType) {
        stepErrors.registrationType = allValidation.errors.registrationType;
      }
      break;

    case 1: // Personal Information
      ['firstName', 'lastName', 'nationalId', 'sex', 'dateOfBirth', 'phone', 'email'].forEach(field => {
        if (allValidation.errors[field]) {
          stepErrors[field] = allValidation.errors[field];
        }
      });
      break;

    case 2: // Location
      ['province', 'district', 'sector', 'cell', 'village'].forEach(field => {
        if (allValidation.errors[field]) {
          stepErrors[field] = allValidation.errors[field];
        }
      });
      break;

    case 3: // Education & Skills
      ['educationLevel', 'primarySkill', 'secondarySkill', 'tertiarySkill'].forEach(field => {
        if (allValidation.errors[field]) {
          stepErrors[field] = allValidation.errors[field];
        }
      });
      break;

    default:
      return allValidation;
  }

  return {
    isValid: Object.keys(stepErrors).length === 0,
    errors: stepErrors
  };
};
