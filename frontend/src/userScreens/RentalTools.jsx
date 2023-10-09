import React from 'react'
import '../UserCss/RentalTools.css'

const RentalTools = () => {
  return (
    <section>
   
        <div className='rental-wrapper'>
          {/* right side */}
            <div className='rental-container'></div>

              {/* left side */}

            <div className='left-div'>
            <h3 style={{color:"black", fontSize:'40px', fontFamily:'-moz-initial'}}>SELLING MANAGEMENT, <br /> SIMPLIFIED </h3>
            <p style={{gap:'2.8rem'}}>Fill your vacancies fast and collect rent easily with our all-in-one 
                  property <br /> management software.</p>

                  <button className='button'>GET STARTED</button>
            </div>   
        </div>

        <div style={{}} className='center-container'>
          <h2>List. Manage. Earn. It's really that simple.</h2>
              

              </div>
             
     </section>
    
  )
}

export default RentalTools
