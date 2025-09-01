import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  useTheme,
} from '@mui/material';

// Styled components for enhanced visuals
const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);

  // Handle navigation for quick actions
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Sample data for recent registrations table
  const recentRegistrations = [
    { id: 1, name: 'John Smith', program: 'Web Development', date: '2025-08-28' },
    { id: 2, name: 'Jane Doe', program: 'Data Science', date: '2025-08-27' },
    { id: 3, name: 'Alice Johnson', program: 'Cybersecurity', date: '2025-08-26' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ mb: 4, fontWeight: 'bold', color: theme.palette.text.primary }}
        >
          Welcome back, {user?.firstName || 'John'}!
        </Typography>

        {/* Statistics Cards */}
        <Grid container spacing={3}>
          {[
            { title: 'Total Registrations', value: '1,234', color: 'primary.main' },
            { title: 'Active Programs', value: '15', color: 'secondary.main' },
            { title: 'Completed Trainings', value: '892', color: 'info.main' },
            { title: 'Job Placements', value: '567', color: 'success.main' },
          ].map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <StyledCard>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" sx={{ color: stat.color }}>
                    {stat.value}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {/* Recent Activities */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                Recent Registrations
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Program</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentRegistrations.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.program}</TableCell>
                        <TableCell>{row.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleNavigation('/dashboard/registrations')}
                  sx={{ textTransform: 'none', py: 1.5 }}
                >
                  View All Registrations
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleNavigation('/dashboard/reports')}
                  sx={{ textTransform: 'none', py: 1.5 }}
                >
                  Generate Report
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleNavigation('/dashboard/training')}
                  sx={{ textTransform: 'none', py: 1.5 }}
                >
                  Manage Programs
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;