import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getBookings } from '../utils/api';
import PropertyCard from '../components/propertyCard/PropertyCard';

const Bookings = () => {
    const {userInfo} = useSelector((state)=>state.auth);
    const [userBookings,setUserBookings] = useState([]);

    useEffect(()=>{
        if(userInfo){
            getBookings(userInfo.email,userInfo.token)
            .then((bookings)=>setUserBookings(bookings)).catch((error)=>
            console.error(error));
        }
    },[userInfo])
    console.log("mmmmmmmmmmmmmm",userInfo);
    return (
        <div className='wrapper'>
          <div className='flexColCenter paddings innerWidth properties-container'>
            {userBookings.length === 0 ? (
              <h4 style={{marginTop:'250px'}}>You haven't booked any residencies yet..!</h4>
            ) : (
                userBookings.map((booking, index) => (
                    <PropertyCard/>
              ))
            )}
          </div>
        </div>
      );
}

export default Bookings
