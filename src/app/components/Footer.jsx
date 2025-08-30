import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Divider,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  return (
    <Box className="footer" component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              CONTACT US
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">KG17 Ave, Kigali</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">(+250)783558414</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">info@rtb.gov.rw</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TwitterIcon sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }} />
              <FacebookIcon sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }} />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              USEFUL LINKS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover">
                Rwanda Polytechnic
              </Link>
              <Link href="#" color="inherit" underline="hover">
                MINEDUC
              </Link>
              <Link href="#" color="inherit" underline="hover">
                University of Rwanda
              </Link>
              <Link href="#" color="inherit" underline="hover">
                E-Learning
              </Link>
              <Link href="#" color="inherit" underline="hover">
                TVET Management Portal
              </Link>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.2)' }} />
        
        <Typography variant="body2" align="center">
          © RWANDA TVET BOARD 2025
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
