import { Paper } from "@mui/material";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../ui/Button/Button";
import SignInDriverForm from "../ui/SignInDriver/SignInDriverForm";
import SignInForm from "../ui/SignInForm/SignInForm";

const SignInPage = () => {
  const [queryParams, setQueryParams] = useSearchParams();
  const driverFilter = queryParams.get("type");
  return (
    <div className="sign_form">
      <div className="sign_form-wrapper">
        <Paper elevation={3} className="login_form-card form_card">
          {!driverFilter ? (
            <>
              <h2>Sign In</h2>
              <SignInForm />
              <div className="login_form-footer">
                <span>No account?</span>
                <Link to="../login/signUp" className="login_form-link">
                  <Button className="button_outline">Sign Up</Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2>Login as a driver</h2>
              <SignInDriverForm />
            </>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default SignInPage;
