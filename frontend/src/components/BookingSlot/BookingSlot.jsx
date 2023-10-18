import React, { useState } from 'react';
import { Box, Button, Group, MultiSelect } from '@mantine/core';
import { useSelector } from 'react-redux';
import useProperties from '../../userScreens/useProperties';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { createResidency } from '../../utils/api';

const BookingSlot = ({ prevStep, propertyDetails, setPropertyDetails, setOpened, setActiveStep }) => {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const userInfoId = useSelector((state)=>state.auth.userInfo._id);
 
  const handleTimeSlotSelection = (selectedTimeSlots) => {
    setSelectedTimeSlots(selectedTimeSlots);
  };

  const handleSubmit = () => {
    setPropertyDetails((prev) => ({
      ...prev,
      timeSlots: selectedTimeSlots,
    }));
    mutate(selectedTimeSlots); // Pass selectedTimeSlots to mutate
  };

  const user = useSelector((state) => state.auth.userInfo);
  const { refetch: refetchProperties } = useProperties();
  console.log("❤️❤️❤️❤️❤️❤️",userInfoId)
  const { mutate, isLoading } = useMutation({
    mutationFn: (timeSlots) => createResidency({ // Pass timeSlots as a parameter
      ...propertyDetails,
      userInfoId,
      timeSlots,
    }),
    onError: ({ response }) => toast.error(response.data.message, { position: 'bottom-right' }),
    onSettled: () => {
      toast.success('Added Successfully', { position: 'bottom-right' });
      setPropertyDetails({
        title: '',
        description: '',
        price: 0,
        country: '',
        city: '',
        address: '',
        images: null,
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
        type: 'Buy',
        userEmail: user?.email,
        timeSlots: [],
      });
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });

  return (
    <Box maw="50%" mx="auto" my="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <MultiSelect
          withAsterisk
          label="Select Booking Time Slots"
          placeholder="Select time slots"
          data={[
            '10:00 AM - 11:00 AM',
            '12:00 PM - 1:00 PM',
            '3:00 PM - 4:00 PM',
            '6:00 PM - 7:00 PM',
          ]}
          defaultValue={['10:00 AM - 11:00 AM']}
          value={selectedTimeSlots}
          onChange={(selectedTimeSlots) => handleTimeSlotSelection(selectedTimeSlots)}
          multiple
          clearable
          searchable
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? 'Submitting' : 'Add Property'}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default BookingSlot;
