import React, { useState } from 'react'
import Search from '../components/Search'
import '../UserCss/Hero.css';
import Residencies from '../userScreens/Residencies.jsx'
import Value from '../components/Value/Value.jsx';
import RentalManagement from './RentalManagement/RentalManagement.jsx';

const Hero = () => {
  const [filter,setFilter]=useState("")
  return (
    <div>
    <section className='hero-wrapper'>
      <div className="paddings innerWidth flexCenter hero-container ">
        <div className='hero-text'>
         <h1><b>Discover Your  New Home</b></h1>
         <h4  className='hero-subtext' >  Helping 100 million renters find their perfect fit.</h4>
        </div>
        
       {/* <Search/> */}
      </div>
    </section>
    <Residencies/>
    <Value/>
    <RentalManagement/>
    </div>
  )
}

export default Hero
