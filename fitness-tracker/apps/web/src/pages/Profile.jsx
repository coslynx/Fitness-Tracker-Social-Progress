import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Button, Avatar, Alert } from '@mui/material';
import { styled } from '@emotion/react';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import localForageService from '../../packages/shared/utils/localForageService';
import { validateEmail } from '../utils/validators';

const Profile = () => {
  const { user, isLoggedIn } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const { fetchData } = useFetch();

  useEffect(() => {
    if (isLoggedIn) {
      const fetchProfile = async () => {
        try {
          const profile = await localForageService.getUserData('userProfile');
          setProfileData(profile);
        } catch (error) {
          console.error('Error fetching profile data:', error);
          // Handle errors gracefully (e.g., display an error message)
        }
      };
      fetchProfile();
    }
  }, [isLoggedIn, fetchData]);

  const handleProfileUpdate = async (updatedProfile) => {
    try {
      if (!validateEmail(updatedProfile.email)) {
        // Handle invalid email
        return;
      }

      await localForageService.saveUserData('userProfile', updatedProfile);
      setProfileData(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2} style={{ minHeight: '80vh' }}>
      {isLoggedIn ? (
        <>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>Your Profile</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Avatar src={profileData?.photoURL || '/default-avatar.png'} alt="Profile" sx={{ width: 150, height: 150, margin: 'auto' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <form onSubmit={(e) => { e.preventDefault(); handleProfileUpdate(profileData); }}>
              <TextField label="Username" name="username" fullWidth value={profileData?.username || ''} disabled />
              <TextField label="Email" name="email" fullWidth value={profileData?.email || ''} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} />
              <Button type="submit" variant="contained" fullWidth>Update Profile</Button>
            </form>
          </Grid>
        </>
      ) : (
        <Grid item xs={12}>
          <Typography variant="body1">Please log in to view your profile.</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Profile;