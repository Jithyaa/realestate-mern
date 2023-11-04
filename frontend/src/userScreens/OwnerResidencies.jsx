import React, { useState } from 'react'
import useProperties from './useProperties';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import PropertyCard from '../components/propertyCard/PropertyCard';
import Search from '../components/Search';



const OwnedResidencies = () => {
    const { data, isError, isLoading } = useProperties();
    const [filter, setFilter] = useState("")
    const { userInfo } = useSelector((state) => state.auth);

    if (isError) {
        return (
            <div className='wrapper'>
                <span>Error while fetching data</span>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className='wrapper'>
                <Loader />
            </div>
        );
    }

    

    const filteredData = data.residencies
    .filter((property) =>
      property.title.toLowerCase().includes(filter.toLowerCase()) ||
      property.city.toLowerCase().includes(filter.toLowerCase()) ||
      property.country.toLowerCase().includes(filter.toLowerCase())
    )
    .filter((property) => property.userEmail === userInfo.email)
    .map((card, i) => <PropertyCard card={card} key={i} />);

    if (filteredData.length === 0) {
        return (
          <div className='wrapper'>
            <h4 style={{marginTop:'290px',marginLeft:'530px'}}>No Residencies Yet...!</h4>
          </div>
        );
      }


    return (

        <div className='wrapper'>
        <div className='flexColCenter paddings innerWidth properties-container'>
        {filteredData.length > 0 && (
          <Search filter={filter} setFilter={setFilter} />
        )}
        <div className='padding flexCenter properties'>{filteredData}</div>
        </div>
        </div>
    );
};

export default OwnedResidencies;





