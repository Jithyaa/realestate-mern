import React, { useState } from 'react';
import { Button, Modal, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { bookVisit } from '../../utils/api';

const BookingModal = ({ opened, setOpened, email, propertyId, availableTimes, propertyDetails }) => {
  const [dateValue, setDateValue] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(dateValue, propertyId, email, selectedTime, propertyDetails || []),
  });



  console.log('propertyDetails:', propertyDetails);
  // console.log('propertyDetails.timeSlots:', propertyDetails?.timeSlots);

  const timeSlots = propertyDetails.data || [];
  console.log('timeSlots:', timeSlots);

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

        <Button disabled={!dateValue} onClick={() => mutate()}>
          Book Visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
