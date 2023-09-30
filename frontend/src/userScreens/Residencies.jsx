import React from 'react'
import useProperties from './useProperties';
import PropertyCard from '../components/propertyCard/PropertyCard';
import {Swiper,SwiperSlide,useSwiper} from 'swiper/react';
import Loader from '../components/Loader';
import '../UserCss/Residencies.css';
import { sliderSettings } from '../utils/common';


const Residencies = () => {
    const {data,isError,isLoading} = useProperties();
    if (!data) {
      return null; 
    }
    if(isError){
     return(
      <div className='wrapper'>
        <span>Error while fetching data</span>
      </div>
     )
    }
    if (isLoading) {
      return <Loader />;
    }
  return (
    <div id='residencies' className='r-wrapper'>
        <div className='paddings innerWidth r-container'>
            <div className='flexColStart r-head'>
                <span className='orangeText'>Best Choices</span>
                <span className='primaryText'>Popular Residencies</span>
            </div>
            <div className='property-card-container'>
          {data.slice(0, 4).map((card, i) => (
            <PropertyCard key={i} card={card} />
          ))}
        </div>

        {/* Slider */}
        <Swiper {...sliderSettings}>
          <SlideNextButton />
        </Swiper>
      </div>
    </div>
  );
};

export default Residencies

const SlideNextButton = () => {
    const swiper = useSwiper();
    return (
      <div className="flexCenter r-buttons">
        <button onClick={() => swiper.slidePrev()} className="r-prevButton">
          &lt;
        </button>
        <button onClick={() => swiper.slideNext()} className="r-nextButton">
          &gt;
        </button>
      </div>
    );
  };