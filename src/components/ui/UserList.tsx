import React, { useEffect, useState } from 'react';
import { getUsers } from '../../services/user/getList';
import { User } from '../../services/user/getList/type';
import UserTable from './UserTable';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers(page, limit);
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <UserTable
      users={users}
      currentPage={page}
      onPageChange={handlePageChange}
      hasMore={users.length >= limit}
    />
  );
};

export default UserList;


