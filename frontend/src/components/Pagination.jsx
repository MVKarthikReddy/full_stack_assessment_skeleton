import React, { useEffect, useState } from 'react';

const Pagination = ({ nPages, currentPage, setCurrentPage, setCurPage }) => {

  
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1); // Setting page numbers for page navigation

  // This will take you to next page
  const goToNextPage = () => {
    if(currentPage !== nPages){
        setCurrentPage(currentPage + 1)
        setCurPage(currentPage + 1) // Go to Page
    }
  }

  // This will take you to previous page
  const goToPrevPage = () => {
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1)
      setCurPage(currentPage - 1)  // Go to Page
    }
        
  }
 

  return (
    <nav className='hidden sm:block'>
            <ul className='pagination justify-content-center flex flex-row'>
                <li className="cursor-pointer mx-3 w-6 text-center bg-gray-300 hover:bg-gray-400 rounded"> 
                    <a className="font-bold " 
                        onClick={goToPrevPage}  // For navigating to previous page
                        >
                        
                        {'<'}
                    </a>
                </li>
                 {/* Mapping through each page number */}
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} 
                        className= {`${currentPage == pgNumber ? 'active bg-blue-300 border' : 'bg-gray-100'} hover:bg-blue-200 mx-2 border text-center w-6 rounded cursor-pointer`} 
                        >
                        <a onClick={() => {
                          setCurrentPage(pgNumber)
                          setCurPage(pgNumber)}}  // For setting the current page
                            className='cursor-pointer' 
                            >
                            
                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li className="cursor-pointer mx-3 w-6 text-center bg-gray-300 hover:bg-gray-400 rounded">
                    <a className="font-bold cursor-pointer" 
                        onClick={goToNextPage} // For navigating to next page
                        >
                        
                        {'>'}
                    </a>
                </li>
            </ul>
        </nav>
  
  );
};

export default Pagination;