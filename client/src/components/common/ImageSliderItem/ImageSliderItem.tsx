import React from 'react';
import { ImageSliderProps } from '../../../types/slider';

const ImageSliderItem: React.FC<ImageSliderProps> = ({image, text}) => {
  return (
    <div className='slider_item'>
      <div className='slider_item-img'>
        <img src={image} alt='a'/>
      </div>
      <div className='slider_item-subtitle'>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default ImageSliderItem;