import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../ui/Button/Button';
import Container from '../common/Container/Container';
import ImageSliderItem from '../common/ImageSliderItem/ImageSliderItem';
// import News from '../common/News/News';
import NewsList from '../common/NewsList/NewsList';
import ImageSlider from '../common/Slider/ImageSlider';
import TextSliderItem from '../common/TextSliderItem/TextSliderItem';

const MainPage = () => {
  return (
    <main className='main'>
      {/* <ImageSlider className={'main_wrapper'}>
        <img className='main_wrapper-img' src='https://img.freepik.com/free-photo/cool-geometric-triangular-figure-neon-laser-light-great-backgrounds-wallpapers_181624-9331.jpg?w=2000'/>
        <img className='main_wrapper-img' src="https://i.redd.it/c3uhsgo1vx541.jpg" alt="a" />
        <img className='main_wrapper-img' src='https://c4.wallpaperflare.com/wallpaper/39/346/426/digital-art-men-city-futuristic-night-hd-wallpaper-thumb.jpg' alt='a'/>
      </ImageSlider> */}
      <section className='main_wrapper mg-btm-70'>
        <img className='main_wrapper-img' src="https://jenty-spedition.ru/wp-content/uploads/2020/11/2.jpg" alt="a" />
      </section>
      <Container className={'mg-btm-70'}>
        <ImageSlider className={'main_slider'}>
          <ImageSliderItem image={'https://jenty-spedition.ru/wp-content/themes/jenty/img/temp_1.gif'} text={'Перевозки с температурным режимом'}/>
          <ImageSliderItem image={'https://jenty-spedition.ru/wp-content/themes/jenty/img/temp_1.gif'} text={'Перевозки с температурным режимом'}/>
          <ImageSliderItem image={'https://jenty-spedition.ru/wp-content/themes/jenty/img/temp_1.gif'} text={'Перевозки с температурным режимом'}/>
          <ImageSliderItem image={'https://jenty-spedition.ru/wp-content/themes/jenty/img/temp_1.gif'} text={'Перевозки с температурным режимом'}/>
          <ImageSliderItem image={'https://jenty-spedition.ru/wp-content/themes/jenty/img/temp_1.gif'} text={'Перевозки с температурным режимом'}/>
        </ImageSlider>
      </Container>

      <Container>
      <h1 className='main_title'>Преимущества</h1>
      </Container>
      <section className='main_wrapper mg-btm-70'>
        <img className='main_wrapper-img' src="https://www.iveco.com/netherlands/PublishingImages/Jost%20Group_IVECO%20fleet%20(1600x1115)%20-%20kopie.jpg" alt="a" />
      </section>

      <Container className={'mg-btm-70'}>
        <ImageSlider className={'main_slider'}>
          <TextSliderItem/>
          <TextSliderItem/>
          <TextSliderItem/>
          <TextSliderItem/>
          <TextSliderItem/>
        </ImageSlider>
      </Container>
      
      <Container>
        <h1 className='main_title'>Наш автопарк</h1>
      </Container>
      <section className='main_wrapper mg-btm-70'>
        <img className='main_wrapper-img' src="https://jenty-spedition.ru/wp-content/uploads/2021/04/panorama_bez_nazvaniya-2-scaled.jpg" alt="a" />
      </section>

      <Container className={'mg-btm-70'}>
        <ImageSlider className={'main_slider'}>
          <ImageSliderItem image={'https://jenty-spedition.ru/wp-content/themes/jenty/img/temp_1.gif'} text={'Перевозки с температурным режимом'}/>
          <ImageSliderItem image={'https://jenty-spedition.ru/wp-content/themes/jenty/img/temp_1.gif'} text={'Перевозки с температурным режимом'}/>
          <ImageSliderItem image={'https://jenty-spedition.ru/wp-content/themes/jenty/img/temp_1.gif'} text={'Перевозки с температурным режимом'}/>
          <ImageSliderItem image={'https://jenty-spedition.ru/wp-content/themes/jenty/img/temp_1.gif'} text={'Перевозки с температурным режимом'}/>
        </ImageSlider>
      </Container>


      <Container>
        <div className='main_title'>
          <h1>Новости</h1>
          <NavLink to='/news' className='header-buttons-button'>
            <Button className='button'>Все новости</Button>
          </NavLink>
        </div>
      </Container>
      <div className='news'>
        <Container className={'mg-btm-70'}>
          <NewsList/>
        </Container>
      </div>
    
      <Container className={'mg-btm-70'}>
        <h1 className='main_title'>Сертификаты</h1>

        <ImageSlider className={'main_slider'}>
          <ImageSliderItem image={'https://jenty-spedition.ru/wp-content/themes/jenty/img/temp_1.gif'} text={'Перевозки с температурным режимом'}/>
          <ImageSliderItem image={'https://jenty-spedition.ru/wp-content/themes/jenty/img/temp_1.gif'} text={'Перевозки с температурным режимом'}/>
          <ImageSliderItem image={'https://jenty-spedition.ru/wp-content/themes/jenty/img/temp_1.gif'} text={'Перевозки с температурным режимом'}/>
          <ImageSliderItem image={'https://jenty-spedition.ru/wp-content/themes/jenty/img/temp_1.gif'} text={'Перевозки с температурным режимом'}/>
        </ImageSlider>
      </Container>


    </main>
  )
}

export default MainPage;