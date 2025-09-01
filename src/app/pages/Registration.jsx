import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  setFormField,
  submitRegistration,
  resetRegistrationForm,
  verifyNationalId,
  clearNidData,
  setFieldError,
} from "../../store/tvet/actions";
import {
	fetchDistricts,
	fetchCells,
	fetchProvinces,
	fetchSectors,
	fetchVillages,
} from "../../utils/rwandaApi";

const steps = [
  "Registration Type",
  "Personal Information",
  "Location Details",
  "Education & Skills",
  "Review & Submit",
];

const Registration = () => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);

  const {
    registrationForm,
    formErrors,
    submitting,
    submitSuccess,
    submitError,
    locationData,
    educationLevels,
    availableSkills,
    nidVerification,
  } = useSelector((state) => state.tvet);

  // const { userData } = useSelector((state) => state.common);
  const { verifying, verified, verificationError } = nidVerification;

  // Handle NID verification
  const handleNidVerification = async () => {
    if (
      !registrationForm.nationalId ||
      registrationForm.nationalId.length !== 16
    ) {
      dispatch(setFieldError("nationalId", "National ID must be 16 digits"));
      return;
    }

    try {
      const nidData = await dispatch(
        verifyNationalId(registrationForm.nationalId)
      );

      // Auto-fill form with NID data
      if (nidData) {
        dispatch(setFormField("firstName", nidData.firstName || ""));
        dispatch(setFormField("lastName", nidData.lastName || ""));
        dispatch(setFormField("gender", nidData.gender || ""));
        // dispatch(setFormField("gender", nidData.gender || ""));
        // Map sex to gender: M -> GABO, F -> GORE
        dispatch(setFormField("gender", nidData.sex === "M" ? "GABO" : nidData.sex === "F" ? "GORE" : ""));

        if (nidData.dateOfBirth) {
          dispatch(setFormField("dateOfBirth", dayjs(nidData.dateOfBirth)));
        }

        // Also set telephone if available in NID data
        if (nidData.phone) {
          dispatch(setFormField("telephone", nidData.phone));
        }
      }
    } catch (error) {
      // Error is handled by Redux
    }
  };

  // Clear NID data when nationalId changes
  useEffect(() => {
    if (registrationForm.nationalId && verified) {
      dispatch(clearNidData());
    }
  }, [registrationForm.nationalId, verified, dispatch]);

  const handleFieldChange = (fieldName, value) => {
    dispatch(setFormField(fieldName, value));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      await dispatch(submitRegistration(registrationForm));
      // Success handled by Redux
    } catch (error) {
      // Error handled by Redux
    }
  };

  const handleReset = () => {
    dispatch(resetRegistrationForm());
    setActiveStep(0);
  };

  const formatDate = (date) => {
    if (!date) return "Not provided";
    if (dayjs.isDayjs(date)) {
      return date.format("YYYY-MM-DD");
    }
    if (typeof date === "string") {
      return dayjs(date).format("YYYY-MM-DD");
    }
    return dayjs(date).format("YYYY-MM-DD");
  };

  const getDistrictsForProvince = (province) => {
    return locationData.districts[province] || [];
  };

  const getSectorsForDistrict = (district) => {
    return locationData.sectors[district] || [];
  };

  const getCellsForSector = (sector) => {
    return locationData.cells[sector] || [];
  };

  const getVillagesForCell = (cell) => {
    return locationData.villages[cell] || [];
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Card elevation={2}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                color="primary"
                className="section-title"
              >
                Hitamo icyo ushaka (Choose what you want)
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  value={registrationForm.registrationType}
                  onChange={(e) =>
                    handleFieldChange("registrationType", e.target.value)
                  }
                >
                  <FormControlLabel
                    value="KWIGA_IMYUGA"
                    control={<Radio />}
                    label="KWIGA IMYUGA (Learn Skills/Vocations)"
                  />
                  <FormControlLabel
                    value="GUSHAKIRWA_AKAZI"
                    control={<Radio />}
                    label="GUSHAKIRWA AKAZI (Job Seeking)"
                  />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card elevation={2}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                color="primary"
                className="section-title"
              >
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
                  >
                    <TextField
                      fullWidth
                      label="Numero y' Indangamuntu (National ID)"
                      value={registrationForm.nationalId}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 16);
                        handleFieldChange("nationalId", value);
                      }}
                      error={!!formErrors.nationalId || !!verificationError}
                      helperText={formErrors.nationalId || verificationError}
                      required
                      size="medium"
                      disabled={verifying}
                    />
                    <Button
                      variant="outlined"
                      onClick={handleNidVerification}
                      disabled={
                        verifying ||
                        !registrationForm.nationalId ||
                        registrationForm.nationalId.length !== 16
                      }
                      sx={{ minWidth: "120px", height: "56px" }}
                    >
                      {verifying ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Verify NID"
                      )}
                    </Button>
                  </Box>

                  {verifying && (
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        Verifying NID...
                      </Typography>
                    </Box>
                  )}

                  {verified && (
                    <Alert severity="success" sx={{ mt: 1 }}>
                      NID verified successfully! Personal information has been
                      auto-filled.
                    </Alert>
                  )}

                  {verificationError && !verifying && (
                    <Alert severity="error" sx={{ mt: 1 }}>
                      {verificationError}
                    </Alert>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Amazina yombi - First Name"
                    value={registrationForm.firstName}
                    onChange={(e) =>
                      handleFieldChange("firstName", e.target.value)
                    }
                    error={!!formErrors.firstName}
                    helperText={formErrors.firstName}
                    required
                    size="medium"
                    InputProps={{
                      readOnly: verified,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Amazina yombi - Last Name"
                    value={registrationForm.lastName}
                    onChange={(e) =>
                      handleFieldChange("lastName", e.target.value)
                    }
                    error={!!formErrors.lastName}
                    helperText={formErrors.lastName}
                    required
                    size="medium"
                    InputProps={{
                      readOnly: verified,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    required
                    error={!!formErrors.gender}
                    size="medium"
                  >
                    <InputLabel>Igitsina (Sex)</InputLabel>
                    <Select
                      value={registrationForm.gender}
                      onChange={(e) =>
                        handleFieldChange("gender", e.target.value)
                      }
                      label="Igitsina (Sex)"
                    >
                      <MenuItem value="GABO">Gabo (Male)</MenuItem>
                      <MenuItem value="GORE">Gore (Female)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Italiki y' amavuko (Date of Birth)"
                    value={registrationForm.dateOfBirth}
                    onChange={(newValue) =>
                      handleFieldChange("dateOfBirth", newValue)
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        error: !!formErrors.dateOfBirth,
                        helperText: formErrors.dateOfBirth,
                        size: "medium",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Telephone"
                    value={registrationForm.telephone}
                    onChange={(e) =>
                      handleFieldChange("telephone", e.target.value)
                    }
                    error={!!formErrors.telephone}
                    helperText={formErrors.telephone}
                    placeholder="+250..."
                    required
                    size="medium"
                    type="tel"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="E-mail"
                    type="email"
                    value={registrationForm.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    required
                    size="medium"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card elevation={2}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                color="primary"
                className="section-title"
              >
                AHO UTUYE (Where you live)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    required
                    error={!!formErrors.province}
                    size="medium"
                  >
                    <InputLabel>Intara (Province)</InputLabel>
                    <Select
                      value={registrationForm.province}
                      onChange={(e) => {
                        handleFieldChange("province", e.target.value);
                        handleFieldChange("district", "");
                        handleFieldChange("sector", "");
                        handleFieldChange("cell", "");
                        handleFieldChange("village", "");
                      }}
                      label="Intara (Province)"
                    >
                      {locationData.provinces.map((province) => (
                        <MenuItem key={province} value={province}>
                          {province}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    required
                    error={!!formErrors.district}
                    size="medium"
                  >
                    <InputLabel>Akarere (District)</InputLabel>
                    <Select
                      value={registrationForm.district}
                      onChange={(e) => {
                        handleFieldChange("district", e.target.value);
                        handleFieldChange("sector", "");
                        handleFieldChange("cell", "");
                        handleFieldChange("village", "");
                      }}
                      label="Akarere (District)"
                      disabled={!registrationForm.province}
                    >
                      {getDistrictsForProvince(registrationForm.province).map(
                        (district) => (
                          <MenuItem key={district} value={district}>
                            {district}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    required
                    error={!!formErrors.sector}
                    size="medium"
                  >
                    <InputLabel>Umurenge (Sector)</InputLabel>
                    <Select
                      value={registrationForm.sector}
                      onChange={(e) => {
                        handleFieldChange("sector", e.target.value);
                        handleFieldChange("cell", "");
                        handleFieldChange("village", "");
                      }}
                      label="Umurenge (Sector)"
                      disabled={!registrationForm.district}
                    >
                      {getSectorsForDistrict(registrationForm.district).map(
                        (sector) => (
                          <MenuItem key={sector} value={sector}>
                            {sector}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    required
                    error={!!formErrors.cell}
                    size="medium"
                  >
                    <InputLabel>Akagali (Cell)</InputLabel>
                    <Select
                      value={registrationForm.cell}
                      onChange={(e) => {
                        handleFieldChange("cell", e.target.value);
                        handleFieldChange("village", "");
                      }}
                      label="Akagali (Cell)"
                      disabled={!registrationForm.sector}
                    >
                      {getCellsForSector(registrationForm.sector).map(
                        (cell) => (
                          <MenuItem key={cell} value={cell}>
                            {cell}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    required
                    error={!!formErrors.village}
                    size="medium"
                  >
                    <InputLabel>Umudugudu (Village)</InputLabel>
                    <Select
                      value={registrationForm.village}
                      onChange={(e) =>
                        handleFieldChange("village", e.target.value)
                      }
                      label="Umudugudu (Village)"
                      disabled={!registrationForm.cell}
                    >
                      {getVillagesForCell(registrationForm.cell).map(
                        (village) => (
                          <MenuItem key={village} value={village}>
                            {village}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card elevation={2}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                color="primary"
                className="section-title"
              >
                Education & Skills
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" gutterBottom>
                  ICYICIRO CYAMASHURI WAGARUKIYEMO (Education Level)
                </Typography>
                <FormControl
                  fullWidth
                  required
                  error={!!formErrors.educationLevel}
                  size="medium"
                >
                  <InputLabel>Hitamo urwego rw'amashuri</InputLabel>
                  <Select
                    value={registrationForm.educationLevel}
                    onChange={(e) =>
                      handleFieldChange("educationLevel", e.target.value)
                    }
                    label="Hitamo urwego rw'amashuri"
                  >
                    {educationLevels.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" gutterBottom>
                IMYUGA WIFUZA KWIGA (Skills you want to learn)
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    required
                    error={!!formErrors.primarySkill}
                    size="medium"
                  >
                    <InputLabel>
                      1. Umwuga wa mbere (Primary Skill) - Required
                    </InputLabel>
                    <Select
                      value={registrationForm.primarySkill}
                      onChange={(e) =>
                        handleFieldChange("primarySkill", e.target.value)
                      }
                      label="1. Umwuga wa mbere (Primary Skill) - Required"
                    >
                      {availableSkills.map((skill) => (
                        <MenuItem key={skill} value={skill}>
                          {skill}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={!!formErrors.secondarySkill}
                    size="medium"
                  >
                    <InputLabel>
                      2. Umwuga wa kabiri (Secondary Skill) - Optional
                    </InputLabel>
                    <Select
                      value={registrationForm.secondarySkill}
                      onChange={(e) =>
                        handleFieldChange("secondarySkill", e.target.value)
                      }
                      label="2. Umwuga wa kabiri (Secondary Skill) - Optional"
                    >
                      <MenuItem value="">None</MenuItem>
                      {availableSkills.map((skill) => (
                        <MenuItem key={skill} value={skill}>
                          {skill}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={!!formErrors.tertiarySkill}
                    size="medium"
                  >
                    <InputLabel>
                      3. Umwuga wa gatatu (Tertiary Skill) - Optional
                    </InputLabel>
                    <Select
                      value={registrationForm.tertiarySkill}
                      onChange={(e) =>
                        handleFieldChange("tertiarySkill", e.target.value)
                      }
                      label="3. Umwuga wa gatatu (Tertiary Skill) - Optional"
                    >
                      <MenuItem value="">None</MenuItem>
                      {availableSkills.map((skill) => (
                        <MenuItem key={skill} value={skill}>
                          {skill}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="4. Undi mwuga (Other technical skills)"
                    multiline
                    rows={3}
                    value={registrationForm.otherSkills}
                    onChange={(e) =>
                      handleFieldChange("otherSkills", e.target.value)
                    }
                    placeholder="Urashobora kwandika umwuga utari mu rutonde rwo hejuru"
                    error={!!formErrors.otherSkills}
                    helperText={formErrors.otherSkills}
                    size="medium"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card elevation={2}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                color="primary"
                className="section-title"
              >
                Review & Submit Registration
              </Typography>

              {/* Registration Type */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="primary">
                  Registration Type:
                </Typography>
                <Typography variant="body1">
                  {registrationForm.registrationType === "KWIGA_IMYUGA"
                    ? "KWIGA IMYUGA (Learn Skills/Vocations)"
                    : "GUSHAKIRWA AKAZI (Job Seeking)"}
                </Typography>
              </Box>

              {/* Personal Information */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="primary">
                  Personal Information:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Name:</strong> {registrationForm.firstName}{" "}
                      {registrationForm.lastName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>National ID:</strong>{" "}
                      {registrationForm.nationalId}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Sex:</strong> {registrationForm.gender}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Date of Birth:</strong>{" "}
                      {formatDate(registrationForm.dateOfBirth)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Phone:</strong> {registrationForm.telephone}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Email:</strong> {registrationForm.email}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Location */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="primary">
                  Location:
                </Typography>
                <Typography variant="body2">
                  {registrationForm.village}, {registrationForm.cell},{" "}
                  {registrationForm.sector}, {registrationForm.district},{" "}
                  {registrationForm.province}
                </Typography>
              </Box>

              {/* Education & Skills */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="primary">
                  Education Level:
                </Typography>
                <Typography variant="body2">
                  {registrationForm.educationLevel}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="primary">
                  Skills:
                </Typography>
                <Typography variant="body2">
                  <strong>Primary:</strong> {registrationForm.primarySkill}
                </Typography>
                {registrationForm.secondarySkill && (
                  <Typography variant="body2">
                    <strong>Secondary:</strong>{" "}
                    {registrationForm.secondarySkill}
                  </Typography>
                )}
                {registrationForm.tertiarySkill && (
                  <Typography variant="body2">
                    <strong>Tertiary:</strong> {registrationForm.tertiarySkill}
                  </Typography>
                )}
                {registrationForm.otherSkills && (
                  <Typography variant="body2">
                    <strong>Other:</strong> {registrationForm.otherSkills}
                  </Typography>
                )}
              </Box>

              {submitError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {submitError}
                </Alert>
              )}

              {submitSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Registration submitted successfully! Your registration ID is:{" "}
                  {submitSuccess.registrationId}
                </Alert>
              )}
            </CardContent>
          </Card>
        );

      default:
        return "Unknown step";
    }
  };

  if (submitSuccess) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom color="primary">
          Registration Successful!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Thank you for registering with MIFOTRA-RTB
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Your registration has been submitted successfully. You will be
          contacted soon regarding your application.
        </Typography>
        <Button variant="contained" onClick={handleReset} size="large">
          Submit Another Registration
        </Button>
      </Paper>
    );
  }

  return (
    <Box sx={{ px: { xs: 1, sm: 2, md: 0 } }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 4 } }}>
        <Typography
          variant="h4"
          gutterBottom
          color="primary"
          textAlign="center"
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" } }}
        >
          MIFOTRA - RTB Registration Form
        </Typography>
        <Stepper
          activeStep={activeStep}
          alternativeLabel={window.innerWidth > 600}
          orientation={window.innerWidth <= 600 ? "vertical" : "horizontal"}
          sx={{ mt: 2 }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Box sx={{ mb: { xs: 2, sm: 4 } }}>{renderStepContent(activeStep)}</Box>

      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            fullWidth={window.innerWidth <= 600}
            size="large"
          >
            Back
          </Button>

          <Box
            sx={{ display: "flex", gap: 2, width: { xs: "100%", sm: "auto" } }}
          >
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={submitting}
                startIcon={submitting ? <CircularProgress size={20} /> : null}
                fullWidth={window.innerWidth <= 600}
                size="large"
              >
                {submitting ? "Submitting..." : "Submit Registration"}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                fullWidth={window.innerWidth <= 600}
                size="large"
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Registration;
