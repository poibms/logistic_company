// import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import React from 'react';

type ButtonProps = {
  className?: string;
  onClick?: any;
  children: React.ReactNode;
  type?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({className, onClick, children, type, ...rest}) => {
  return (
    <button
    className={className}
    onClick={onClick}
    {...rest}>
      {children}
    </button>
  );
};

export default Button;
