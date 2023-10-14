import React, { useState } from 'react';
import Search from '../components/Search';
import '../UserCss/Properties.css';
import useProperties from './useProperties';
import Loader from '../components/Loader';
import PropertyCard from '../components/propertyCard/PropertyCard';
import ReactPaginate from 'react-paginate';

const Properties = () => {
  const [currentPage, setCurrentPage] = useState(0); 
  const itemsPerPage = 8; 

  const { data, isError, isLoading} = useProperties(); 
  console.log("jjjjjjjjjjjjjjjjjjjjjjjjj 😊",data)
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
        <span>No properties found</span> 
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
        // forcePage={currentPage.current-1}
      />
    </div>
  );
};

export default Properties;
