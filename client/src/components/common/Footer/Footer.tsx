import React from 'react';
import { NavLink } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer_inner'>
        <div className='footer_inner-contacts'>
          <div className='flex flex_column align_center justify-center'>
            <div className='footer_menu'>
              <span>RU </span>
              <span>+7312523141412</span>
            </div>
            <div className='footer_menu'>
              <span>BY </span>
              <span>+375295517734</span>
            </div>
            <div className='footer_menu'>
              <span>UA </span>
              <span>+380338012543</span>
            </div>
            <div className='footer_menu'>
              <span>PL </span>
              <span>+48343770000</span>
            </div>
          </div>
        </div>
        <div className='footer_inner-nav'>
          <div className='flex flex_row justify-spacearnd align_center'>
            <div className='flex flex_column align_center'>
              <div className='footer_menu'>
                <NavLink to='/news'>
                  <div>Новости</div>
                </NavLink>
              </div>
              <div className='footer_menu'>
                <NavLink to='/news'>
                  <div>О нас</div>
                </NavLink>
              </div>
            </div>
            <div className='flex flex_column align_center'>
              <div className='footer_menu'>
                <a href='https://www.instagram.com/poibms/'>
                  <InstagramIcon/>
                </a>
              </div>
              <div className='footer_menu'>
                <a href='https://github.com/poibms'>
                  <GitHubIcon/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;