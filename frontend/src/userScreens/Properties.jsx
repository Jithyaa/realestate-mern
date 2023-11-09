import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import '../UserCss/Properties.css';
import useProperties from './useProperties';
import Loader from '../components/Loader';
import PropertyCard from '../components/propertyCard/PropertyCard';
import ReactPaginate from 'react-paginate';

const Properties = ({modified}) => {
  const [currentPage, setCurrentPage] = useState(0); 
  
  const { data, isError, isLoading} = useProperties();  
  useEffect(()=>{
    
  },[modified])
  const itemsPerPage = 8; 

  const [filter, setFilter] = useState(""); 

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };


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
  
  if (!Array.isArray(data.residencies) || data.residencies.length === 0) {
    return (
      <div className='wrapper'>
        <img style={{width:'50%',height:'auto',marginLeft:'350px',marginTop:'120px'}} src="https://support.rentastic.io/wp-content/uploads/2020/07/add_property.png" alt="" />
      </div>
    );
  }

  
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredData = data.residencies
    .filter((property) =>
      property.title.toLowerCase().includes(filter.toLowerCase()) ||
      property.city.toLowerCase().includes(filter.toLowerCase()) ||
      property.country.toLowerCase().includes(filter.toLowerCase())
    )
    .slice(startIndex, endIndex)
    .map((card, i) => <PropertyCard card={card} key={i} />);

  return (
    <div className='wrapper'>
      <div className='flexColCenter paddings innerWidth properties-container'>
        <Search filter={filter} setFilter={setFilter} /> 
        <div className='padding flexCenter properties'>{filteredData}</div>
      </div>
      <ReactPaginate
        previousLabel="< previous"
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageCount={Math.ceil(data.totalResidencies / itemsPerPage)} 
        breakLabel="..."
        pageRangeDisplayed={8}
        previousClassName="pagination-previous"
        nextClassName="pagination-next"
        pageClassName="pagination-page"
      />
    </div>
  );
};

export default Properties;
