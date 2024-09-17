'use client'
import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { 
  Tabs, 
  Tab, 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  CircularProgress 
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`address-tabpanel-${index}`}
      aria-labelledby={`address-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

const AddressList: React.FC = () => {
  const { addresses, fetchAddresses, setCurrentAddress } = useCartStore();
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAddresses = async () => {
      setIsLoading(true);
      try {
        await fetchAddresses();
      } catch (error) {
        console.error('Error fetching addresses:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAddresses();
  }, [fetchAddresses]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (addresses.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        No saved addresses found.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Saved Addresses
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="address tabs"
          variant="scrollable"
          scrollButtons="auto"
          className=' text-purple'
        >
          {addresses.map((address, index) => (
            <StyledTab key={address.id} label={address.state} id={`address-tab-${index}`} />
          ))}
        </Tabs>
      </Box>
      {addresses.map((address, index) => (
        <TabPanel key={address.id} value={value} index={index}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="body1" gutterBottom>House: {address.house}</Typography>
              <Typography variant="body1" gutterBottom>Street: {address.street}</Typography>
              <Typography variant="body1" gutterBottom>City: {address.city}</Typography>
              <Typography variant="body1" gutterBottom>State: {address.state}</Typography>
              <Typography variant="body1" gutterBottom>Postal Code: {address.postalCode}</Typography>
              <Typography variant="body1" gutterBottom>Full Location: {address.fullLocation}</Typography>
              <Typography variant="body1" gutterBottom>Road Near By: {address.roadNearBy}</Typography>
              <button 
                className=' bg-purple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4'
                onClick={() => setCurrentAddress(address)}
              >
                Use This Address
              </button>
            </CardContent>
          </Card>
        </TabPanel>
      ))}
    </Box>
  );
};

export default AddressList;