import React from 'react'
import { NavLink } from 'react-router-dom';

type NewsPropsType = {
  image: string,
  text: string,
  date: string
}

const News: React.FC<NewsPropsType> = ({image, text, date}) => {
  return (
    <div className='news_list'>
      <div className='news_block'>
        {/* <NavLink to='/news/1'> */}
          <div className='news_img news-img_zoom'>
            <img src={image} alt='news_img'/>
          </div>
        {/* </NavLink> */}
          <div className='news_title'>
            <p>{text}</p>
          </div>
          <div className='news_date'>
            {date}
          </div>

      </div>
    </div>
  )
}

export default News;