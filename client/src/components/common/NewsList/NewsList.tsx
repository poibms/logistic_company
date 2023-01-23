import React from 'react';
import News from '../News/News';

const NewsList = () => {
  return (
    <section>
      <div className='news_index'>
        <div className='news_flex'>
          <News />
          <News />
          <News />
        </div>
      </div>
    </section>
  )
}

export default NewsList;