// import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import React from 'react';

type ButtonProps = {
  className?: string;
  onClick?: any;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({className, onClick, children, ...rest}) => {
  console.log(className)
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
