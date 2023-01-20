import React from 'react';
import Container from '../common/Container/Container';
import ImageSlider from '../common/Slider/ImageSlider';
import TransportationType from '../common/TransportationType/TransportationType';

const MainLayout = () => {
  return (
    <main className='main'>
      {/* <ImageSlider className={'main_wrapper'}>
        <img className='main_wrapper-img' src='https://img.freepik.com/free-photo/cool-geometric-triangular-figure-neon-laser-light-great-backgrounds-wallpapers_181624-9331.jpg?w=2000'/>
        <img className='main_wrapper-img' src="https://i.redd.it/c3uhsgo1vx541.jpg" alt="a" />
        <img className='main_wrapper-img' src='https://c4.wallpaperflare.com/wallpaper/39/346/426/digital-art-men-city-futuristic-night-hd-wallpaper-thumb.jpg' alt='a'/>
      </ImageSlider> */}
      <section className='main_wrapper'>
        <img className='main_wrapper-img' src="https://c4.wallpaperflare.com/wallpaper/39/346/426/digital-art-men-city-futuristic-night-hd-wallpaper-thumb.jpg" alt="a" />
      </section>
      <Container>
        <ImageSlider className={'main_slider'}>
          <TransportationType/>
          <TransportationType/>
          <TransportationType/>
          <TransportationType/>
          <TransportationType/>
        </ImageSlider>
      </Container>

      {/* <section className='main_wrapper'>
        <img className='main_wrapper-img' src="image.png" alt="a" />
      </section> */}
    </main>
  )
}

export default MainLayout;