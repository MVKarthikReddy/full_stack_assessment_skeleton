import React, { useEffect, useState } from 'react';
import UsersDropdown from './UsersDropDown';
import HomeCard from './HomeCard';
import { useGetHomesByUserQuery } from '../utils/api/apiSlice';
import Pagination from './Pagination';

// For loading skeleton while loading.
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const HomesPage = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage,setRecordsPerPage] = useState(48);
  const [itemsPerPage,setItemsPerPage] = useState(48);
  const [curPage, setCurPage] = useState(1);
  const [msg,setMsg] = useState(false)

 
  // Getting homes data corresponding to selected user 
  const { data: homes, isLoading, isError } = useGetHomesByUserQuery(
    { username: selectedUser },
    { skip: !selectedUser }
  );


  const handleUserChange = (username) => {
    setSelectedUser(username); // Setting user when user changes
    setCurrentPage(1);
    setCurPage(1); // Resetting current page to first page when user changes
  };

  // Setting number of records for page
  const handleRecordsPerPage = () => {
    if(itemsPerPage>40){
      setRecordsPerPage(itemsPerPage)
      setMsg(false)
    }
    else{
      setMsg(true)
    }
  }


  // Setting details for Pagiantion
  if(homes && homes.length > 0){
    var indexOfLastRecord = currentPage * recordsPerPage;  
    var indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    var currentRecords = homes.slice(indexOfFirstRecord, indexOfLastRecord);
    var nPages = Math.ceil(homes.length / recordsPerPage)
  }

  return (
    <div>
      <UsersDropdown selectedUser={selectedUser} onChange={handleUserChange} />
      {isLoading &&  <div className='grid my-9 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' >
                <Skeleton count={3} className='h-60 w-60 my-3'/>
                <Skeleton count={3} className='h-60 w-60 my-3'/>
                <Skeleton count={3} className='h-60 w-60 my-3'/>
                <Skeleton count={3} className='h-60 w-60 my-3'/>
          </div> }
      {
        (!homes || selectedUser=='')  && <div className='flex justify-center items-center h-96'>
          Please Select a User.
        </div>
      }
      {isError && <p>Error loading homes.</p>}
      {homes && homes.length === 0 && <p>No homes found for this user.</p>}
      
      {homes && homes.length > 0 && selectedUser!='' && (
        <>
          <div className="px-4 py-8 sm:px-6 lg:px-8 w-full">
            <h1 className='text-2xl font-semibold mb-6'>Homes For {selectedUser}</h1>
            <div className="my-8  flex flex-col justify-center items-center">
                <div className='flex flex-row  text-center justify-center my-2'>
                  <h3>Records per Page :</h3>
                  <input type="text" className=' w-10 text-center' value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)} />
                  <span 
                    className='border cursor-pointer text-center px-3 mx-2 rounded bg-gray-300 hover:underline'
                    onClick={handleRecordsPerPage}
                  >set</span>
                </div>
                {msg ? <span className='mb-4' >Records per page must be more than 40</span> : <></>}
                <div className='flex flex-row  text-center justify-center my-2'>
                  <h3 className='mx-8'>Total no.of Pages : {nPages}</h3>
                  <h3>Go to Page : </h3><input type="text" className=' w-10 text-center' value={curPage} onChange={(e) => setCurPage(e.target.value)} />
                  <span 
                    className='border cursor-pointer text-center px-3 mx-2 rounded bg-gray-300 hover:underline'
                    onClick={() => setCurrentPage(curPage)}
                  >set</span>
                </div>
                <Pagination nPages={nPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            setCurPage={setCurPage}
                  />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              {currentRecords.map((home) => (
                <HomeCard key={home.street_address} home={home} currentUsername={selectedUser} />
              ))}
            </div>
          </div>
          <div className="my-8 flex justify-center">
              <Pagination nPages={nPages}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage} 
                />
          </div>
        </>
      )}

    </div>
  );
};

export default HomesPage;
