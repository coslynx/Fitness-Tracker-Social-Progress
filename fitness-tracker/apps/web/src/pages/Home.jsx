import React from 'react';
import { Typography, Grid, Button } from '@mui/material';
import { styled } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = styled('div')({
  backgroundColor: '#f5f5f5',
  padding: '40px 0',
  textAlign: 'center',
});

const FeatureSection = styled('div')({
  padding: '20px 0',
});

const ActionSection = styled('div')({
  padding: '20px 0',
  textAlign: 'center',
});

const HomePage = () => {
  return (
    <div>
      <HeroSection>
        <Typography variant="h2" gutterBottom>
          Start Your Fitness Journey Today!
        </Typography>
        <Typography variant="h5" gutterBottom>
          Track your progress, set goals, and stay motivated with our fitness tracker.
        </Typography>
        <Image
          src="/hero-image.jpg"
          alt="Fitness Hero Image"
          width={500}
          height={300}
        />
      </HeroSection>

      <FeatureSection>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Track Your Progress
            </Typography>
            <Typography variant="body1">
              Monitor your weight, workouts, and other important metrics.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Set Achievable Goals
            </Typography>
            <Typography variant="body1">
              Define your fitness objectives and track your progress towards them.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Stay Motivated
            </Typography>
            <Typography variant="body1">
              Join a community of like-minded individuals and share your journey.
            </Typography>
          </Grid>
        </Grid>
      </FeatureSection>

      <ActionSection>
        <Link href="/login">
          <Button variant="contained" size="large">
            Log In
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="outlined" size="large">
            Sign Up
          </Button>
        </Link>
      </ActionSection>
    </div>
  );
};

export default HomePage;