import React from 'react';
import './PropertyCard.css';
import { truncate } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';

const PropertyCard = ({ card }) => {
  const navigate = useNavigate();

  // Get the first image URL from the images array
  const firstImage = card.images && card.images.length > 0 ? card.images[3] : '';

  return (
    <div className='flexColStart r-card'>
      <img src={firstImage} alt="home" /> {/* Display the first image */}
      <AiFillHeart size={24} color='white' />
      <div className="price-type">
        <span
          className="secondaryText r-price"
          onClick={() => navigate(`../properties/${card.id}`)}
        >
          <span style={{ color: "orange" }}>Rs  </span>
          <span>{card.price}</span>
        </span>
        <span className="secondaryText r-type">{card.type}</span>
      </div>
      <span className="primaryText">{truncate(card.title, { length: 15 })}</span>
      <span className="secondaryText">{truncate(card.description, { length: 80 })}</span>
    </div>
  );
};

export default PropertyCard;
