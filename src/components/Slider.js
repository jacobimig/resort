import React from 'react'
import SingleSlide from './SingleSlide'
import slider_data from '../slider_data'

const Slider = () => {
 return (
  <header className='slider'>
   <SingleSlide data={slider_data} />
  </header>
 )
}

export default Slider