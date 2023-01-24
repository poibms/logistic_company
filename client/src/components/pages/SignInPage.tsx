import { Paper } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button/Button";
import SignInForm from "../ui/SignInForm/SignInForm";


const SignInPage = () => {
  return (
    <>
      <div className="sign_form-wrapper">
        <Paper elevation={3} className='login_form-card form_card'>
          <h2>Войти</h2>
            <SignInForm />
          <div className='login_form-footer'>
            <span>Нет аккаунта?</span>
            <Link to='./signUp' className='login_form-link'>
              <Button className='button_outline'>
              Зарегистрироваться
              </Button>
            </Link>
          </div>
        </Paper>
      </div>
    </>
  )
}

export default SignInPage