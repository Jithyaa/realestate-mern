import React, { useState } from 'react';
import { Button, Modal, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { bookVisit } from '../../utils/api';
import BookingModal from '../BookingModal/BookingModal.jsx'; 

const Facilities = ({ propertyDetails, setPropertyDetails }) => {
  const [bookingModalOpened, setBookingModalOpened] = useState(false); 
  const openBookingModal = () => {
    setBookingModalOpened(true);
  };
  return (
    <div>
      <Button onClick={openBookingModal}>Book Visit</Button>
      <BookingModal
        opened={bookingModalOpened}
        setOpened={setBookingModalOpened}
        email={propertyDetails.userEmail}
        propertyId={propertyDetails.id}
        availableTimes={propertyDetails.timeSlots} 
        onSelectTime={(selectedTime) => {
          setPropertyDetails((prev) => ({
            ...prev,
            selectedTime,
          }));
          setBookingModalOpened(false);
        }}
      />
    </div>
  );
};

export default Facilities;
