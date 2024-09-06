// import React, { useState, useEffect } from 'react';
// import { useGetUsersQuery, useGetUsersByHomeQuery, useUpdateUsersForHomeMutation } from '../utils/api/apiSlice'

// const EditUsersModal = ({ streetName, onClose, currentUsername }) => {
  // const { data: allUsers, isLoading: usersLoading } = useGetUsersQuery();
  // const { data: homeUsers, isLoading: homeUsersLoading } = useGetUsersByHomeQuery(streetName);
  // const [updateUsersForHome] = useUpdateUsersForHomeMutation();

  // const [selectedUsers, setSelectedUsers] = useState([]);
  // const [error, setError] = useState('');

  // useEffect(() => {
  //   if (homeUsers) {
  //     setSelectedUsers(homeUsers.map((user) => user.username));
  //   }
  // }, [homeUsers]);

  // const handleCheckboxChange = (username) => {
  //   setSelectedUsers((prevSelected) =>
  //     prevSelected.includes(username)
  //       ? prevSelected.filter((user) => user !== username)
  //       : [...prevSelected, username]
  //   );
  // };

  // const handleSave = async () => {
  //   if (selectedUsers.length === 0) {
  //     setError('At least one user must be selected.');
  //     return;
  //   }
  //   setError('');
  //   await updateUsersForHome({ street_name: streetName, usernames: selectedUsers });
  //   onClose();
  // };

//   if (usersLoading || homeUsersLoading) return <p>Loading...</p>;

//   return (
//     <div className="modal">
//       <h2>Edit Users for {streetName}</h2>
//       {allUsers.map((user) => (
//         <div key={user.username}>
//           <input
//             type="checkbox"
//             id={user.username}
//             name={user.username}
//             checked={selectedUsers.includes(user.username)}
//             onChange={() => handleCheckboxChange(user.username)}
//           />
//           <label htmlFor={user.username}>{user.username}</label>
//         </div>
//       ))}
//       {error && <p className="error">{error}</p>}
//       <button onClick={onClose}>Cancel</button>
//       <button onClick={handleSave} disabled={selectedUsers.length === 0}>
//         Save
//       </button>
//     </div>
//   );
// };

// export default EditUsersModal;

import React, { useState, useEffect } from 'react';
import { useGetUsersByHomeQuery, useGetUsersQuery, useUpdateUsersForHomeMutation } from '../utils/api/apiSlice';

const EditUserModal = ({ streetName, onClose, isOpen, currentUsername }) => {

  // Getting all the users
  const { data: allUsers, isLoading: usersLoading } = useGetUsersQuery();
  // Getting all the homes for retrieving the users of that particular home
  const { data: homeUsers, isLoading: homeUsersLoading } = useGetUsersByHomeQuery(streetName);
  // To update the changes made in check boxes
  const [updateUsersForHome] = useUpdateUsersForHomeMutation();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (homeUsers) {    
      setSelectedUsers(homeUsers.map((user) => user.username)); // setting the users of the particular home for checking in the users list
    }
  }, [homeUsers]);

  // For toggling checkbox when user is selected or deselected
  const handleCheckboxChange = (username) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(username)
        ? prevSelected.filter((user) => user !== username)
        : [...prevSelected, username]
    );
  };

  // For updating the changes in db 
  const handleSave = async () => {
    if (selectedUsers.length === 0) {
      setError('At least one user must be selected.');
      return;
    }
    setError('');

    await updateUsersForHome({ street_name: streetName, users: selectedUsers });
    onClose();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-70 transform transition-all duration-500 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}>
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-semibold mb-4">Modify Users for : <span className='underline'>{streetName}</span></h2>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* List of Users */}
        <ul>
          {allUsers.map((user, index) => (
            <li key={user.username} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={user.username}
                checked={selectedUsers.includes(user.username)}
                onChange={() => handleCheckboxChange(user.username)}
                className={`mr-2`}
              />
              <label htmlFor={user.username} className={`text-gray-700 ${selectedUsers.includes(user.username) ? 'font-bold':''}`}>{user.username}</label>
            </li>
          ))}
        </ul>

        {/* Buttons save and cancel */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={selectedUsers.length == 0}
            className={`px-4 py-2 rounded ${
              selectedUsers.length == 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white'
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
