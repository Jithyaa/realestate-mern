import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getProperty } from '../utils/api';
import Loader from '../components/Loader';
import { AiTwotoneCar } from 'react-icons/ai';
import '../UserCss/Property.css'
import { MdLocationPin, MdMeetingRoom } from 'react-icons/md';
import { FaShower } from 'react-icons/fa';
import Map from '../components/Map/Map.jsx';
import BookingModal from '../components/BookingModal/BookingModal.jsx';
import { Carousel } from 'react-responsive-carousel';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ChatModal from '../components/ChatModal/ChatModal';
import { createChatRoom } from '../utils/api';


const Property = () => {
  const { pathname } = useLocation()
  const id = pathname.split("/").slice(-1)[0]
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );
  const { userInfo } = useSelector((state) => state.auth);
  console.log({userInfo});
  const [modalOpened, setModalOpened] = useState(false)
  const [openChatModal, setOpenChatModal] = useState(false)
  const [isChatOpen,setIsChatOpen]=useState(false)
  const [chatRoomId,setChatRoomId]=useState()

  useEffect(() => {
    getProperty(id).then((data) => {
      console.log(data);
    })
      .catch((error) => {
        console.error(error);
      });

  }, [id]);

  const modalOpen = async () => {
    setOpenChatModal(true);
    setIsChatOpen(true)
    setChatRoomId(await createChatRoom(userInfo?._id,data?.owner,data._id))
  };

  const modalClose = () => {
    setOpenChatModal(false);
    setIsChatOpen(false);
  };

  function formatLargeNumber(number) {
    if (number >= 10000000) {
      return (number / 10000000).toFixed(1) + ' Cr';
    } else if (number >= 100000) {
      return (number / 100000).toFixed(1) + ' Lakh';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + ' Thousand';
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
  console.log({isChatOpen});
  return (
    <div className='wrapper'>
       <div className='chat-button-sticky'>
       <button onClick={isChatOpen ? modalClose : modalOpen} style={{ marginBottom: '1rem' }}>
           {isChatOpen ? (
             <i className="fa-solid fa-circle-xmark" style={{ fontSize: '1rem' }}></i>
           ) : (
             <i className="fa-brands fa-facebook-messenger" style={{ fontSize: '1rem' }}></i>
           )}
         </button>
       </div>
    
      {isChatOpen?<ChatModal 
      isOpen={openChatModal} 
      onClose={modalClose}
      ownerId={data?.owner}
      rid={data?._id}
      chatRoomId={chatRoomId}
       /> :null}

      <div className='flexColStart paddings innerWidth property-container'>
        <div className="like">
          {/* <Heart /> */}
        </div>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
          spaceBetween={10}
          slidesPerView={4}
          centeredSlides={true}
          zoom={false}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          initialSlide={0}
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
              userId={userInfo?._id}
              owner={data?.owner}
              timeSlots={data?.timeSlots}
              type={data?.type}
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
