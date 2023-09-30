import React, { useState } from 'react';
import { Button, Modal } from '@mantine/core';
import { DateInput } from '@mantine/dates';

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [dateValue, setDateValue] = useState(null);
  const modalStyles = {
    content: {
      maxWidth: '100%', // Adjust the width as needed
    },
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title='Select your date of visit'
      centered
      size="lg"
      styles={modalStyles} 
      
    >
      <div className='flexColCenter'>
        <DateInput
          value={dateValue}
          onChange={setDateValue}
          label="Date input"
          placeholder="Date input"
        />
        <Button onClick={() => console.log('Booking date:', dateValue)}>
          Book Visit
        </Button>
      </div>
    </Modal>
  );
}

export default BookingModal;
