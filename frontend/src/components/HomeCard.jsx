import React, { useState } from 'react';
import EditUsersModal from './EditUsersModal';

const HomeCard = ({ home, currentUsername }) => {
  
  // Initial setup for modal
  const [showModal, setShowModal] = useState(false);

  const handleEditUsers = () => {
    setShowModal(true);
  };

  return (
    
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between">
                <div className="p-4 font-semibold">
                    <h2 className='text-xl font-bold py-2'>{home.street_name}</h2>
                    <p >List Price: ${home.list_price}</p>
                    <p>State: {home.state}</p>
                    <p>Zip: {home.zip}</p>
                    <p>Sqft: {home.sqft}</p>
                    <p>Beds: {home.beds}</p>
                    <p>Baths: {home.baths}</p>
                    
                </div>
                <div className=''>
                    <button 
                        className='border px-3 py-1 rounded mx-3 my-3 bg-blue-300 hover:underline' 
                        onClick={handleEditUsers}>
                        Edit Users
                    </button>
                </div> 
                    {showModal && (
                        <EditUsersModal
                        streetName={home.street_name}
                        onClose={() => setShowModal(false)}
                        isOpen={true}
                        currentUsername={currentUsername}
                        />
                    )}
                
                </div>
            
  );
};

export default HomeCard;
