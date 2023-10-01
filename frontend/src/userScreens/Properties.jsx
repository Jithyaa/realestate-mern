import React, { useState } from 'react';
import Search from '../components/Search';
import '../UserCss/Properties.css';
import useProperties from './useProperties';
import Loader from '../components/Loader';
import PropertyCard from '../components/propertyCard/PropertyCard';
import { property } from 'lodash';

const Properties = () => {
  const { data, isError, isLoading } = useProperties();
console.log("hiiiiiii",data);
const [filter,setFilter]=useState("")
  if (isError) {
    return (
      <div className='wrapper'>
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  // Check if data is undefined or empty
  if (!data || data.length === 0) {
    return (
      <div className='wrapper'>
        <span>No properties found</span>
      </div>
    );
  }

  return (
    <div className='wrapper'>
      <div className='flexColCenter paddings innerWidth properties-container'>
        <Search filter={filter} setFilter={setFilter}/>
        <div className='padding flexCenter properties'>
         {
          data.filter((property)=>property.title.toLowerCase().includes(filter.toLowerCase()) ||
          property.city.toLowerCase().includes(filter.toLowerCase()) ||
          property.country.toLowerCase().includes(filter.toLowerCase()) 
          ).map((card,i)=>(
            <PropertyCard card={card} key={i}/>
          ))
         }
        </div>
      </div>
    </div>
  );
};

export default Properties;
