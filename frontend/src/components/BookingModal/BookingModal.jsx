import React, { useState } from 'react';
import { Button, Modal, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { bookVisit } from '../../utils/api.js';
import { toast } from 'react-toastify';
import '../BookingModal/BookingModal.css'

const BookingModal = ({ opened, setOpened, email, propertyId, availableTimes, timeSlots }) => {
  const [dateValue, setDateValue] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const { userInfo: { token } } = useSelector((state) => state.auth);
  const handleBookingSuccess = ()=>{
    toast.success("You have booked your visit")
  }
  const { mutate, isLoading } = useMutation({
    onSuccess:()=> handleBookingSuccess(),
    mutationFn: () => bookVisit(dateValue,selectedTime, propertyId, email,),
    onError : ({response}) => toast.error(response.data.message),
    onSettled : () => setOpened(false)
  });

  const handleTimeChange = (event) => {
    console.log("❤️👌",event.target.value)
    console.log("❤️👌",dateValue)
    setSelectedTime(event.target.value); // Update the selectedTime state when the value changes
  };

  // console.log('propertyDetails:', propertyDetails);



  // const timeSlots = propertyDetails.data || [];
  console.log('timeSlotszzzzzzzzz:', timeSlots);
  // console.log('timeSlots type:', typeof timeSlots);
  return (
    <Modal className='slot-modal'
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
        {Array.isArray(timeSlots) && timeSlots?.length > 0 ? (
             <select name="time" id="time" value={selectedTime} onChange={handleTimeChange}>
             <option value="">Select a time</option>
             {timeSlots.map((timeSlot, index) => (
               <option key={index} value={timeSlot}>
                 {timeSlot}
               </option>
             ))}
           </select>
          // <Select
          //   label="Time"
          //   placeholder="Select a time"
          //   value={selectedTime}
          //   onChange={(value) => setSelectedTime(value)}
          // >
          //   {
          //     dummy && dummy.map((slot,ind)=>(
          //       <Select.Option key={ind} value="hh">
          //       BAM
          //     </Select.Option>
          //     ))
          //   }
          //   {/* {timeSlots.map((timeSlot, index) => (
          //     <Select.Option key={index} value={timeSlot}>
          //       {timeSlot}
          //     </Select.Option>
          //   ))}  */}
          // </Select>
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
