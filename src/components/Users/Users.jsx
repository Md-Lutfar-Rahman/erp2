import { useEffect, useState } from 'react';

// Modal Component
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        {children}
        <button onClick={onClose} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
}

function Users() {
  const [users, setUsers] = useState([]); // State to hold the list of users
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(""); // State to handle errors
  const [editingUser, setEditingUser] = useState(null); // State to hold user being edited
  const [editFormData, setEditFormData] = useState({ name: '', email: '', phone: '', role: '' }); // State for edit form data with role
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Edit modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Delete modal state
  const [deleteUserId, setDeleteUserId] = useState(null); // Hold ID of user to delete

  useEffect(() => {
    // Function to fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data); // Set the users data
          setLoading(false); // Stop loading
        } else {
          setError("Failed to fetch users");
          setLoading(false);
        }
      } catch (err) {
        setError("An error occurred while fetching users");
        setLoading(false);
      }
    };

    fetchUsers(); // Call the fetch function when the component loads
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Delete user by ID
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/${deleteUserId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers(users.filter((user) => user._id !== deleteUserId)); // Remove user from state
        setIsDeleteModalOpen(false); // Close the modal
      } else {
        alert("Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Edit user: prepare form for editing
  const handleEditClick = (user) => {
    setEditingUser(user._id); // Set the user to be edited
    setEditFormData({ name: user.name, email: user.email, phone: user.phone, role: user.role }); // Set form data with user details
    setIsEditModalOpen(true); // Open the edit modal
  };

  // Handle edit form input changes
  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit the edited user data
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/users/${editingUser}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map((user) => (user._id === editingUser ? updatedUser : user))); // Update user in state
        setIsEditModalOpen(false); // Close the modal
      } else {
        alert("Failed to update user");
      }
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  // Sidebar rendering based on role
  const renderSidebarOptions = (role) => {
    switch (role) {
      case 'Super Admin':
        return ['Dashboard', 'Manage Users', 'Reports', 'Settings'];
      case 'Moderator':
        return ['Dashboard', 'Manage Content', 'Settings'];
      case 'Course Coordinator':
        return ['Dashboard', 'Manage Courses', 'Student Progress'];
      case 'Student':
        return ['Dashboard', 'My Courses', 'Profile'];
      default:
        return [];
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Users List</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Phone</th>
            <th className="py-2">Role</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.phone}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEditClick(user)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteUserId(user._id);
                    setIsDeleteModalOpen(true);
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <form onSubmit={handleEditSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleEditFormChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={editFormData.email}
              onChange={handleEditFormChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={editFormData.phone}
              onChange={handleEditFormChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Role</label>
            <select
              name="role"
              value={editFormData.role}
              onChange={handleEditFormChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Role</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Moderator">Moderator</option>
              <option value="Course Coordinator">Course Coordinator</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Changes
          </button>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
      <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete this user?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Delete
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Users;

