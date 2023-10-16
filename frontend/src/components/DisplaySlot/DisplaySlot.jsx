// import React, { useState } from 'react';
// import { Button, Modal, Select } from '@mantine/core';
// import BookingModal from '../BookingModal/BookingModal.jsx'; 

// const Facilities = ({ propertyDetails, setPropertyDetails }) => {
//   const [bookingModalOpened, setBookingModalOpened] = useState(false); 
//   const openBookingModal = () => {
//     setBookingModalOpened(true);
//   };
//   return (
//     <div>
    
//       <BookingModal
//         opened={bookingModalOpened}
//         setOpened={setBookingModalOpened}
//         email={propertyDetails.userEmail}
//         propertyId={propertyDetails.id}
//         availableTimes={propertyDetails.timeSlots} 
//         onSelectTime={(selectedTime) => {
//           setPropertyDetails((prev) => ({
//             ...prev,
//             selectedTime,
//           }));
//           setBookingModalOpened(false);
//         }}
//       />
//     </div>
//   );
// };

// export default Facilities;
