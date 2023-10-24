import React, { useState, useEffect } from 'react'
import { setCredentials } from '../slices/authSlice';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getProperty } from '../utils/api';
import Loader from '../components/Loader';
import { AiTwotoneCar } from 'react-icons/ai';
import '../UserCss/Property.css'
import { MdLocationPin, MdMeetingRoom } from 'react-icons/md';
import { FaShower } from 'react-icons/fa';
import Map from '../components/Map/Map.jsx';
import BookingModal from '../components/BookingModal/BookingModal.jsx';
import Heart from '../components/Heart/Heart';
import { userApiSlice } from '../slices/usersApiSlices';

import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { get } from 'lodash';


const Property = () => {
  const { pathname } = useLocation()
  const id = pathname.split("/").slice(-1)[0]
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );
  console.log("heyyyyyyyyyyyyyyyyyyyyyy ", data)
  console.log("iiiiiiiiiiiiiiiiiiiiii",id)

  const { userInfo } = useSelector((state) => state.auth);
  const [modalOpened, setModalOpened] = useState(false)

  useEffect(()=>{
    getProperty(id).then((data)=>{
      console.log(data);
    })
    .catch((error)=>{
      console.error(error);
    });

  },[id]);

  function formatLargeNumber(number) {
    if (number >= 10000000) {
      return (number / 10000000).toFixed(1) + ' Cr';
    } else if (number >= 100000) {
      return (number / 100000).toFixed(1) + ' Lakh';
    } else {
      return number.toString();
    }
  }




  if (isLoading) {
    return (
      <div className='wrapper'>
        <div className='flexCenter paddings'>
          <Loader />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className='wrapper'>
        <div className='flexCenter paddings'>
          <span>Error while fetching the Property details</span>
        </div>
      </div>

    )
  }
  console.log("Time Slotsssssssssss:", data?.timeSlots);
  return (

    <div className='wrapper'>
      <div className='flexColStart paddings innerWidth property-container'>
        <div className="like">
          {/* <Heart /> */}
        </div>

        {/* <img src={data?.image} alt="home image" /> */}

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
          // spaceBetween={10}
          slidesPerView={3}
          centeredSlides={true}
          zoom={false}
          navigation
          pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {data?.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`home image ${index + 1}`}
                className="swiper-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>



        <div className="flexCenter property-details">


          {/* left */}

          <div className='flexColStart left'>


            {/* head */}

            <div className='flexStart head'>
              <span className='primaryText'>{data?.title} </span>
              <span className='orangeText' style={{ fontSize: '1.5rem', marginLeft: '1.5rem' }}><b>₹ </b>{formatLargeNumber(data?.price)}</span>
              <button className='secondaryText'
                style={{
                  fontSize: '1rem',
                  marginLeft: '2.5rem',
                  fontWeight: '500',
                  backgroundColor: 'green',
                  color: 'white',
                  borderRadius: '4px',
                  padding: '5px 10px',
                  cursor: 'pointer'
                }}>{data?.type}</button>

            </div>
            {/* facilities */}
            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color='#1F3E72' />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color='#1F3E72' />
                <span>{data?.facilities?.parkings} Parking</span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color='#1F3E72' />
                <span>{data?.facilities?.bedrooms} Rooms</span>
              </div>
            </div>

            {/* description */}

            <span className='secondaryText' style={{ textAlign: 'justify', color: 'black' }}>
              {data?.description}
            </span>

            {/* address */}

            <div className='flexStart' style={{ gap: '1.5rem', }}>
              <MdLocationPin size={25} />
              <span className='secondaryText'>
                {data?.country && <>{data.country},</>}
                {data?.city && <>{data.city},</>}
                <br />
                {data?.address}
              </span>
            </div>

            {/* booking button */}

            <button className='button' onClick={() => setModalOpened(true)}>
              Book your visit
            </button>

            {/* <button>Chat With Owner</button> */}

            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={userInfo?.email}
              propertyDetails={data?.timeSlots}
            />

          </div>

          {/* right side */}

          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Property
