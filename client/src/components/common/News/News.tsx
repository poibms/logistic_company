import React from 'react'
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';
import Container from '../Container';
import NewsList from '../NewsList/NewsList';

const News = () => {
  return (
    <div className='news_list'>
      <div className='news_block'>
        <NavLink to='/news/1'>
          <div className='news_img news-img_zoom'>
            <img src='https://lkwstore.ro/wp-content/uploads/2019/12/iveco-3.jpg' alt='news_img'/>
          </div>
        </NavLink>
          <div className='news_title'>
            <p>Доставка грузов из Европы в условиях ограничительных мер</p>
          </div>
          <div className='news_date'>
            18.01.2023
          </div>

      </div>
    </div>
  )
}

export default News;