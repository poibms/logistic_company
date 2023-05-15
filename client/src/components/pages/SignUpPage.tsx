import React from "react";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "../ui/Button/Button"
import SignUpForm from "../ui/SignUpForm/SignUpForm";


const SignUpPage = () => {
  return (
    <div className="sign_form">
      <div className="sign_form-wrapper">
        <Paper elevation={3} className='login_form-card form_card'>
          <h2>Sign Up</h2>
            <SignUpForm />
          <div className='login_form-footer'>
            <span>already registered?</span>
            <Link to='../login/signIn' className='login_form-link'>
              <Button className='button_outline'>
              Sign In
              </Button>
            </Link>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default SignUpPage