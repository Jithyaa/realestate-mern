import React, { useState } from 'react';
import { Button, Modal, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { bookVisit } from '../../utils/api';

const BookingModal = ({ opened, setOpened, email, propertyId, availableTimes }) => {
  const [dateValue, setDateValue] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(dateValue, propertyId, email), 
  });

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
        <Select
          label="Time"
          placeholder="Select a time"
          value={selectedTime}
          onChange={(value) => setSelectedTime(value)}
          data={availableTimes || []} // Add a check for availableTimes
        />

        <Button disabled={!dateValue} onClick={() => mutate()}>
          Book Visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
