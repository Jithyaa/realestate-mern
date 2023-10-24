import React from 'react';
import './PropertyCard.css';
import { truncate } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import Heart from '../Heart/Heart';

const PropertyCard = ({ card }) => {
  const navigate = useNavigate();
  console.log("qqqqqqqqqqqqqqqq",card)

  // Get the first image URL from the images array
  const firstImage = card.images && card.images.length > 0 ? card.images[3] : '';
  
  function formatLargeNumber(number) {
    if (number >= 10000000) {
      return (number / 10000000).toFixed(1) + ' Cr';
    } else if (number >= 100000) {
      return (number / 100000).toFixed(1) + ' Lakh';
    } else {
      return number.toString();
    }
  }
  return (
    <div className='flexColStart r-card'
    onClick={()=>navigate(`../properties/${card.id}`)}
    >
      <img src={firstImage} alt="home" /> 
      {/* <AiFillHeart size={24} color='white' /> */}
      <Heart id={card?.id}/>
      <div className="price-type">
        <span
          className="secondaryText r-price"
        >
          
          <span style={{ color: "orange" }}>₹  </span>
          <span>{formatLargeNumber(card.price)}</span>
        </span>
       
        <button
          className="secondaryText r-type"
          style={{
            fontSize:'1rem',
            backgroundColor: 'green', 
            color: 'white', 
            borderRadius: '4px', 
            padding: '5px 10px', 
            cursor: 'pointer', 
          }}
        >
          {card.type}
        </button>
      </div>
      <span className="primaryText">{truncate(card.title, { length: 15 })}</span>
      <span className="secondaryText">{truncate(card.description, { length: 80 })}</span>
    </div>
  );
};

export default PropertyCard;
