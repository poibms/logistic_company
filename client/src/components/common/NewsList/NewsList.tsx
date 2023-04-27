import React from 'react';
import News from '../News/News';
import newsData from '../../../assets/imageSlider/News.json'

const NewsList = () => {
  return (
    <section>
      <div className='news_index'>
        <div className='news_flex'>
          {newsData.data.map((item) => (
            <News image={item.image} text={item.text} date={item.date}/>
          ))}
          {/* <News />
          <News />
          <News /> */}
        </div>
      </div>
    </section>
  )
}

export default NewsList;