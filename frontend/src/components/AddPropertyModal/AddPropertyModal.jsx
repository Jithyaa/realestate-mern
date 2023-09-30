import React, { useState } from 'react'
import { Container, Modal, Stepper } from '@mantine/core'
import AddLocation from '../AddLocation/AddLocation.jsx'
import { useSelector } from 'react-redux';
import UploadImage from '../UploadImage/UploadImage.jsx';
import BasicDetails from '../BasicDetails/BasicDetails.jsx';
import BookingSlot from '../BookingSlot/BookingSlot.jsx';
import Facilities from '../Facilities/Facilities.jsx';

const AddPropertyModal = ({opened,setOpened}) => {
    const [active,setActive] = useState(0);
    const {userInfo} = useSelector((state) => state.auth);
console.log("hjjkjkjjkjk",userInfo);
    const [propertyDetails,setPropertyDetails] = useState({
        title:"",
        description:"",
        price:0,
        country:"",
        city:"",
        address:"",
        image:null,
        facilities:{
            bedrooms:0,
            parkings:0,
            bathrooms:0,
        },
        type:"Buy",
        userEmail:userInfo?.email,
        timeSlots: [],
       
    })

    const nextStep =()=>{
        setActive((current)=>(current <5)? current +1: current)
    }

    const prevStep=()=>{
        setActive((current)=>(current >0 ? current-1 : current))
    }

  return (
    <Modal
    opened={opened}
    onClose={()=>setOpened(false)}
    closeOnClickOutside 
    size={"90rem"}
    >
     <Container h={"40rem"} w={"100%"}>
     <Stepper active={active} onStepClick={setActive} breakpoint="sm" allowNextStepsSelect={false}>
        <Stepper.Step label="Location" description="Address">
          <AddLocation
          nextStep={nextStep}
          propertyDetails={propertyDetails}
          setPropertyDetails={setPropertyDetails}
          
          />
        </Stepper.Step>
        <Stepper.Step label="Images" description="Upload">
          <UploadImage
           prevStep={prevStep}
           nextStep={nextStep}
           propertyDetails={propertyDetails}
           setPropertyDetails={setPropertyDetails}
          
          />
        </Stepper.Step>
        <Stepper.Step label="Basic" description="Basic Details">
          <BasicDetails
          prevStep={prevStep}
          nextStep={nextStep}
          propertyDetails={propertyDetails}
          setPropertyDetails={setPropertyDetails}
          />
        </Stepper.Step>

        <Stepper.Step label="Facilities" description="Facilities">
          <Facilities
          prevStep={prevStep}
          nextStep={nextStep}
          propertyDetails={propertyDetails}
          setPropertyDetails={setPropertyDetails}
          />
        </Stepper.Step>

        <Stepper.Step label="Booking Slot" description="Booking Slot">
          <BookingSlot 
          prevStep={prevStep}
          propertyDetails={propertyDetails}
          setPropertyDetails={setPropertyDetails}
          setOpened={setOpened}
          setActiveStep={setActive}
          />
        </Stepper.Step>

        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

     </Container>
    </Modal>
  )
}

export default AddPropertyModal
