import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axios.config';
import { API_ENDPOINTS } from '../../config/axios.config';
import { User } from '../../services/user/getList/type';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const response = await axiosInstance.get(API_ENDPOINTS.USERS.BY_ID(id));
        setUser(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError('Failed to load user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await axiosInstance.delete(API_ENDPOINTS.USERS.BY_ID(id));
      alert('User deleted successfully');
      navigate('/');
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <button
          onClick={handleBack}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Back to List
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete User
        </button>
      </div>

      <div className="bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-4">User Details</h1>

        <div className="mb-4">
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">ID:</p>
            <p className="font-semibold">{user.id}</p>
          </div>

          <div>
            <p className="text-gray-600">Name:</p>
            <p className="font-semibold">{user.first_name} {user.last_name}</p>
          </div>

          <div>
            <p className="text-gray-600">Email:</p>
            <p className="font-semibold">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
