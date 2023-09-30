import React from 'react'
import './RentalManagement.css'

const RentalManagement = () => {
    return (
        <section className='g-wrapper'>
            <div className='paddings innerWidth g-container'>
                <div className='flexColCenter inner-container'>
                    <span className='primaryText'>Advertice Your Rental</span>
                    <span className='SecondaryText'>Connect with more than 75 million renters looking for new homes
                        using our comprehensive
                        marketing platform.</span>
                        <button className="button">
                            <a href="/rental-tools">Manage Rentals</a>
                        </button>
                </div>
            </div>
        </section>
    )
}

export default RentalManagement
