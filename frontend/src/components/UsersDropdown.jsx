
import { useGetUsersQuery } from '../utils/api/apiSlice';

const UsersDropdown = ({ selectedUser, onChange }) => {

  // Retrieving all the users
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users.</p>;
      
  return (
    <header className="flex h-16 items-center justify-end px-4 md:px-6 shadow-md">
      <nav className="space-x-4 flex h-16 items-center justify-between px-4 md:px-6">
        <label htmlFor="options">Select User : </label>
        <select value={selectedUser} className="cursor-pointer border rounded bg-gray-100 px-3 py-1" onChange={(e) => onChange(e.target.value)}>
            <option value="">Select a user</option>
            {/* Mapping all the users as options */}
            {users.map((user) => (
              <option className='' key={user.username} value={user.username}>
                {user.username}
              </option>
            ))}
        </select>      
      </nav>
    </header>
  )
}


export default UsersDropdown;
