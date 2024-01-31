// Replace the import statement for axios with the following
import { useState, useEffect } from 'react';

export default function Userslist() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [userName, setName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/userlist');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditUser(user);
    setName(user.userName);
    setRole(user.role);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/userlist?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers(users.filter((user) => user._id !== id));
      } else {
        console.error('Failed to delete user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/userlist?id=${editUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, role }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUsers(users.map((user) => (user._id === editUser._id ? { ...user, userName, role } : user)));
        setEditUser(null);
        setName('');
        setRole('');
      } else {
        console.error('Failed to update user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  return (
    <>
    <div className='w-screen h-screen bg-black'>
    <h1 className=' absolute font-bold text-xl  ml-[45%] text-red-800 '>USERS</h1>
      <table  className='absolute font-bold text-xl mt-[15%] w-[70%] leading-loose bg-black text-white ml-[15%]'>
      
      <thead>
          <tr>
            <th className='px-7'>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='text-white'>
          {users.map((user) => (
            <tr className='text-white  ' key={user._id}>
              <td className='px-16'>{user.userName}</td>
              <td>{user.role}</td>
              <td className=''>
                <button className='px-5' onClick={() => handleEdit(user)}>Edit</button>
                <button className='' onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editUser && (
        <form className='bg-black h-[20%] w-full absolute text-white' onSubmit={handleSubmit}>
          <h2 className='font-bold mb-[5%]'>Edit User</h2>
          <label className='text-white'>
            Name:
            <input className='bg-white rounded-lg text-black' type="text" value={userName} onChange={(event) => setName(event.target.value)} />
          </label>
          <label>
            Role:
            <input className='bg-white rounded-lg text-black' type="text" value={role} onChange={(event) => setRole(event.target.value)} />
          </label>
          <button className='bg-white w-[5%]  text-black rounded-lg absolute ml-[10%]' type="submit">Save</button>
          <button className='bg-white w-[5%] text-black rounded-lg absolute ml-[20%]' type="button" onClick={() => setEditUser(null)}>
            Cancel
          </button>
        </form>
      )}
      </div>
    </>
    
  )
}