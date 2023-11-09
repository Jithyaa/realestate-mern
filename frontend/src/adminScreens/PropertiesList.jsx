import React, { useEffect, useState } from 'react'
import axios from '../axioss'
import Slider from 'react-slick'
import Loader from '../components/Loader'
import '../AdminCss/PropertiesList.css'


import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';


const PropertiesList = () => {
  const [residency, setResidency] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/admin/residencies").then((response) => {
      setResidency([...response.data]);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, []);

  function formatLargeNumber(number) {
    if (number >= 10000000) {
      return (number / 10000000).toFixed(1) + ' Cr';
    } else if (number >= 100000) {
      return (number / 100000).toFixed(1) + ' Lakh';
    } else {
      return number.toString();
    }
  }


  const swiperParams = {
    modules: [Navigation, Pagination, Scrollbar, Autoplay],
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    spaceBetween:-10,
    slidesPerView: 3,
    centeredSlides: true,
    zoom: false,
    navigation: true,
    pagination: { clickable: true },
    onSwiper: (swiper) => console.log(swiper),
    onSlideChange: () => console.log('slide change'),
  };

  const handlePropertyStatusToggle=(property)=>{
    property.isListed = !property.isListed;
    setResidency([...residency]);
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        residency.length > 0 ? (
          residency.map((property) => (
            <div key={property._id} className="property-card">
              <h2 style={{color:'green'}}> <b> <u> {property.title}</u></b> </h2>
              <div className="image-gallery">
                <Swiper {...swiperParams}>
                  {property.images &&
                    property.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image}
                          alt={`Image ${index}`}
                          className="swiper-image"
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
              <p style={{fontSize:'30px'}}>Price: <b>{formatLargeNumber(property.price)}</b> </p>
              <p> <b>Country:</b>  {property.country}</p>
              <p> <b> City:</b> {property.city}</p>
              <p> <b>Address:</b>  {property.address}</p>
              <button
                onClick={() => handlePropertyStatusToggle(property)}
                style={{ 
                  color: property.isListed ? 'red' : 'green', 
                  border:`1px solid ${property.isListed ? 'red' : 'green'}`,
                  padding:'8px 16px',
                  borderRadius:'4px',
                  cursor:'pointer',
                  background:'none',
                  width:'130px'
                }}
              >
                {property.isListed ? 'Unlist' : 'List'}
              </button>
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )
      )}
    </div>
  );
};

export default PropertiesList
