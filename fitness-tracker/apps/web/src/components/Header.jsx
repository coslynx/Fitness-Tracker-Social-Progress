import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Button,
} from '@mui/material';
import Link from 'next/link';
import useAuth from '../hooks/useAuth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GoalIcon from '@mui/icons-material/FitnessCenter';

const Header = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Fitness Tracker
        </Typography>

        {isLoggedIn && (
          <>
            <Link href="/dashboard">
              <IconButton color="inherit">
                <DashboardIcon />
              </IconButton>
            </Link>
            <Link href="/goals">
              <IconButton color="inherit">
                <GoalIcon />
              </IconButton>
            </Link>
          </>
        )}

        {isLoggedIn ? (
          <Link href="/profile">
            <Avatar src={user?.photoURL || '/default-avatar.png'} alt="Profile" />
          </Link>
        ) : (
          <Link href="/login">
            <Button variant="contained">Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;