import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { fetchUserById, clearUserData } from '../../store/common/actions';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState('');
  
  const { userData, loading, error } = useSelector(state => state.common);

  const handleSearch = () => {
    if (searchId.trim()) {
      dispatch(fetchUserById(searchId.trim()));
    }
  };

  const handleClearSearch = () => {
    setSearchId('');
    dispatch(clearUserData());
  };

  const handleProceedToRegistration = () => {
    navigate('/registration');
  };

  return (
    <Box>
      {/* Header Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center', background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)', color: 'white' }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          KWIYANDIKISHA KUBIFUZA KWIGA IMYUGA N'UBUMENYINGIRO BY'IGIHE GITO
        </Typography>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          CYANGWA GUHUZWA N'ISOKO RY'UMURIMO BARI HAGATI Y'IMYAKA 16 KUGEZA KURI 30
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, maxWidth: '800px', mx: 'auto' }}>
          Mu rwego rwo kwihutisha ihangwa ry'umurimo, hashyizweho gahunda yo kumenya urubyiruko rwifuza kwiga imyuga itandukanye mu gihe gito cyangwa guhuzwa n'isoko ry'umurimo, hagamijwe kurufasha kubona aho kwiga imyuga bifuza cyangwa se gushakirwa imirimo.
        </Typography>
      </Paper>

      {/* ID Search Section */}
      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
          Search User by National ID
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Enter your National ID to retrieve your information and proceed with registration
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2, 
          mb: 3 
        }}>
          <TextField
            fullWidth
            label="Numero y' Indangamuntu (National ID)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter 16-digit National ID"
            variant="outlined"
            inputProps={{ maxLength: 16 }}
            size="medium"
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={loading || !searchId.trim()}
            startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
            sx={{ 
              minWidth: { xs: '100%', sm: 120 },
              minHeight: 48
            }}
            size="large"
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Box>

        {/* Demo IDs */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Demo IDs for testing:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label="1234567890123456"
              onClick={() => setSearchId('1234567890123456')}
              variant="outlined"
              size="small"
            />
            <Chip
              label="9876543210987654"
              onClick={() => setSearchId('9876543210987654')}
              variant="outlined"
              size="small"
            />
          </Box>
        </Box>

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* User Data Display */}
        {userData && (
          <Card className="user-info-card" elevation={4}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon sx={{ mr: 1, fontSize: 28 }} />
                <Typography variant="h6" fontWeight="bold">
                  User Information Found
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    <strong>First Name:</strong> {userData.firstName}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    <strong>Last Name:</strong> {userData.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    <strong>Date of Birth:</strong> {userData.dateOfBirth}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    <strong>Sex:</strong> {userData.sex}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    <strong>Phone:</strong> {userData.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    <strong>Email:</strong> {userData.email}
                  </Typography>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleProceedToRegistration}
                  size="large"
                >
                  Proceed to Registration
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClearSearch}
                  size="large"
                  sx={{ color: 'white', borderColor: 'white' }}
                >
                  Clear Search
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Paper>

      {/* Instructions Section */}
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
          IYANDIKISHE WUZUZA AMAKURU AKURIKIRA
        </Typography>
        <Typography variant="body1" color="text.secondary">
          To complete your registration, you will need to provide the following information:
        </Typography>
        <Box component="ul" sx={{ mt: 2, pl: 3 }}>
          <li>Choose what you want: KWIGA IMYUGA or GUSHAKIRWA AKAZI</li>
          <li>Personal information (names, ID, gender, date of birth)</li>
          <li>Contact information (phone, email)</li>
          <li>Location details (province, district, sector, cell, village)</li>
          <li>Education level</li>
          <li>Desired skills/professions to learn</li>
        </Box>
        
        <Button
          variant="outlined"
          onClick={handleProceedToRegistration}
          sx={{ mt: 3 }}
          size="large"
        >
          Start Registration Without ID Search
        </Button>
      </Paper>
    </Box>
  );
};

export default Home;
