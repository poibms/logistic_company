import React from "react";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "../ui/Button/Button"
import SignUpForm from "../ui/SignUpForm/SignUpForm";


const SignUpPage = () => {
  return (
    <>
      <div className="sign_form-wrapper">
        <Paper elevation={3} className='login_form-card form_card'>
          <h2>Зарегистрироваться</h2>
            <SignUpForm />
          <div className='login_form-footer'>
            <span>Есть аккаунт?</span>
            <Link to='./signUp' className='login_form-link'>
              <Button className='button_outline'>
              Войти
              </Button>
            </Link>
          </div>
        </Paper>
      </div>
    </>
  )
}

export default SignUpPage