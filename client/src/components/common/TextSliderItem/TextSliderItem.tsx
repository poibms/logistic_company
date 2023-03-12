import React from 'react';
import { TextSliderProps } from '../../../types/slider';

const TextSliderItem: React.FC<TextSliderProps> = ({ title, subtitle }) => {
  return (
    <div className='slider_item'>
      <div className='slider_item-title'>
        <div>25</div>
      </div>
      <div className='slider_item-subtitle'>
        <p>Лет на рынке</p>
      </div>
    </div>
  )
}

export default TextSliderItem;