import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../../ui/Button/Button";
import Container from "../Container";

const Header = () => {
  return (
    <header className="header">
      <Container className={'header__container'}>
        <div className="header__inner">
          <div className="header__logo">
            <h3>Logistic company</h3>
          </div>
          <div className='header-buttons'>
              <NavLink to='/login/signIn' className='header-buttons-button'>
                <Button className='button'>
                  Sign In
                </Button>
              </NavLink>
              <NavLink to='/login/signUp' className='header-buttons-button'>
                <Button className='button'>
                  Sign Up
                </Button>
              </NavLink>
            </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
