import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@emotion/react';

const StyledButton = styled(Button)(({ theme, variant, color, size }) => ({
  backgroundColor: theme.palette[color].main,
  fontSize: theme.typography.fontSize,
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: theme.palette[color].dark,
  },
}));

const ButtonComponent = ({ label, variant, color, size, onClick }) => {
  return (
    <StyledButton
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
    >
      {label}
    </StyledButton>
  );
};

export default ButtonComponent;