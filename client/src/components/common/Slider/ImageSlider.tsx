import React from 'react';
import Slider, { CustomArrowProps, Settings as SlickSettings } from 'react-slick';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const defaultSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextButton />,
  prevArrow: <PrevButton />,
  // autoplay: true,
  // autoplaySpeed: 4000,
  // pauseOnHover: true
};

function NextButton({ onClick }: CustomArrowProps) {
  return (
    <button className='slick-arrow slick-arrow--next' onClick={onClick}>
      <ArrowForwardIosIcon />
    </button>
  );
}

function PrevButton({ onClick }: CustomArrowProps) {
  return (
    <button className='slick-arrow slick-arrow--before' onClick={onClick}>
      <ArrowBackIosIcon />
    </button>
  );
}

type ImageSliderProps = {
  children: React.ReactNode | React.ReactNode[];
  settings?: SlickSettings;
  [x: string]: any;
};

const ImageSlider: React.FC<ImageSliderProps> = ({children, ...settings}) => {
  return (
    <section>
      <Slider {...defaultSettings} {...settings}>
      {children}
    </Slider>
    </section>
  )
}

export default ImageSlider;