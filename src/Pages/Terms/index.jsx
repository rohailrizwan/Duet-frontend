import React from 'react'
import Banner from '../Home/Banner';
import terms from '../../assets/images/terms.jpg';
import Termlisting from './Termlisting';
function Terms() {
  const banners = [
    {
      id: 1,
      image: terms,
      altText: "Terms and Condition",
      subtitle: 'These terms govern your use of DUET Hub. By accessing or using our platform, you agree to be bound by them.',
    },
  ];
  return (
    <div>
      <Banner banners={banners}/>
      <Termlisting/>
    </div>
  )
}

export default Terms
