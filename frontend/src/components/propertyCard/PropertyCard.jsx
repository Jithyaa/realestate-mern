import React from 'react';
import './PropertyCard.css';
import { truncate } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';

const PropertyCard = ({ card }) => {
  const navigate = useNavigate();

  // Get the first image URL from the images array
  const firstImage = card.images && card.images.length > 0 ? card.images[3] : '';
  function formatLargeNumber(number) {
    if (number >= 10000000) {
      return (number / 10000000).toFixed(1) + ' Cr';
    } else if (number >= 100000) {
      return (number / 100000).toFixed(0) + ' Lakh';
    } else {
      return number.toString();
    }
  }
  return (
    <div className='flexColStart r-card'>
      <img src={firstImage} alt="home" /> {/* Display the first image */}
      <AiFillHeart size={24} color='white' />
      <div className="price-type">
        <span
          className="secondaryText r-price"
          onClick={() => navigate(`../properties/${card.id}`)}
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
