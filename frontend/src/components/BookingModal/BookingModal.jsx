import React, { useState } from 'react';
import { Button, Modal, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { bookVisit } from '../../utils/api.js';
import { toast } from 'react-toastify';

const BookingModal = ({ opened, setOpened, email, propertyId, availableTimes, propertyDetails }) => {
  const [dateValue, setDateValue] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const { userInfo: { token } } = useSelector((state) => state.auth);
  const handleBookingSuccess = ()=>{
    toast.success("You have booked your visit")
  }
  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(dateValue,selectedTime, propertyId, email, token,  timeSlots),
    onSuccess:()=> handleBookingSuccess(),
    onError : ({response}) => toast.error(response.data.message),
    onSettled : () => setOpened(false)
  });



  console.log('propertyDetails:', propertyDetails);



  const timeSlots = propertyDetails.data || [];
  console.log('timeSlotszzzzzzzzz:', timeSlots);
  console.log('timeSlots type:', typeof timeSlots);
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Select your date of visit"
      centered
      size="lg"
    >
      <div className="flexColCenter">
        <DateInput
          value={dateValue}
          onChange={setDateValue}
          minDate={new Date()}
          label="Date input"
          placeholder="Date input"
        />
        {Array.isArray(timeSlots) && timeSlots.length > 0 ? (
          <Select
            label="Time"
            placeholder="Select a time"
            value={selectedTime}
            onChange={(value) => setSelectedTime(value)}
          >
            {timeSlots.map((timeSlot, index) => (
              <Select.Option key={index} value={timeSlot}>
                {timeSlot}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <p>No available times</p>
        )}


        <Button disabled={!dateValue || isLoading} onClick={() => mutate()}>
          Book Visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
