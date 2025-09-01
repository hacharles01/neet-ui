import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Typography,
  Chip,
  Tooltip,
  styled,
} from '@mui/material';
import * as XLSX from 'xlsx';
import http from '../../utils/axiosInsitance';
import debounce from 'lodash/debounce'; 

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StatusChip = styled(Chip)(({ status, theme }) => ({
  backgroundColor: 
    status === 'PENDING' ? theme.palette.warning.light :
    status === 'ACCEPTED' ? theme.palette.success.light :
    status === 'REJECTED' ? theme.palette.error.light :
    theme.palette.grey[300],
  color:
    status === 'PENDING' ? theme.palette.warning.contrastText :
    status === 'ACCEPTED' ? theme.palette.success.contrastText :
    status === 'REJECTED' ? theme.palette.error.contrastText :
    theme.palette.text.primary,
}));

const Registrations = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [registrations, setRegistrations] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch registrations from backend
  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await http.get('/applications', {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          search: searchTerm.trim() || undefined,
          status: statusFilter !== 'All' ? statusFilter : undefined,
        },
      });
      setRegistrations(response.data.data.applications);
      setTotal(response.data.data.total);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, searchTerm, statusFilter]);

  // Debounced search handler
  const debouncedFetchRegistrations = useCallback(
    debounce(() => {
      fetchRegistrations();
    }, 500),
    [fetchRegistrations]
  );

  // Fetch data when page, rowsPerPage, searchTerm, or statusFilter changes
  useEffect(() => {
    debouncedFetchRegistrations();
    return () => debouncedFetchRegistrations.cancel();
  }, [page, rowsPerPage, searchTerm, statusFilter, debouncedFetchRegistrations]);

  // Reset filters handler
  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setPage(0);
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Format date properly
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format registration type for display
  const formatRegistrationType = (type) => {
    return type?.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) || 'N/A';
  };

  // Format location
  const formatLocation = (reg) => {
    const parts = [reg.province, reg.district, reg.sector].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'N/A';
  };

  // Export to Excel with enhanced data
  const exportToExcel = () => {
    const exportData = registrations.map((reg) => ({
      ID: reg.id,
      'First Name': reg.firstName,
      'Last Name': reg.lastName,
      'Full Name': `${reg.firstName} ${reg.lastName}`,
      'National ID': reg.nationalId,
      Gender: reg.gender,
      'Date of Birth': reg.dateOfBirth ? formatDate(reg.dateOfBirth) : 'N/A',
      Telephone: reg.telephone,
      Email: reg.email,
      Province: reg.province,
      District: reg.district,
      Sector: reg.sector,
      Cell: reg.cell,
      Village: reg.village,
      Location: formatLocation(reg),
      'Education Level': reg.educationLevel,
      'Registration Type': formatRegistrationType(reg.registrationType),
      'Primary Skill': reg.primarySkill,
      'Secondary Skill': reg.secondarySkill,
      'Tertiary Skill': reg.tertiarySkill,
      'Other Skills': reg.otherSkills,
      'Applied Date': formatDate(reg.appliedAt),
      'Updated Date': formatDate(reg.updatedAt),
      Status: reg.status,
      Message: reg.message || 'N/A',
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `registrations_${new Date().toISOString().split('T')[0]}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'grey.100', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Registrations Management
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Search by Name, Email, or National ID"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter search term..."
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Status Filter</InputLabel>
              <Select
                value={statusFilter}
                label="Status Filter"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="All">All Statuses</MenuItem>
                <MenuItem value="PENDING">Pending</MenuItem>
                <MenuItem value="ACCEPTED">Approved</MenuItem>
                <MenuItem value="REJECTED">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleResetFilters}
              sx={{ height: '56px', width: '100%' }}
            >
              Reset Filters
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={exportToExcel}
              sx={{ height: '56px', width: '100%' }}
              disabled={registrations.length === 0 || loading}
            >
              Export to Excel ({registrations.length} records)
            </Button>
          </Grid>
        </Grid>
        
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Total: {total} registrations
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Program</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Primary Skill</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Applied Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    Loading registrations...
                  </TableCell>
                </TableRow>
              ) : registrations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    No registrations found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                registrations.map((row) => (
                  <StyledTableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {`${row.firstName} ${row.lastName}`}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {row.nationalId}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">{row.telephone}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {row.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={`${row.cell}, ${row.village}`}>
                        <Typography variant="body2" sx={{ maxWidth: 120 }}>
                          {formatLocation(row)}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatRegistrationType(row.registrationType)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={row.primarySkill}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            maxWidth: 150, 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {row.primarySkill || 'N/A'}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(row.appliedAt)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <StatusChip 
                        label={row.status} 
                        status={row.status}
                        size="small"
                      />
                    </TableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default Registrations;