import React from 'react';
import UserList from '../components/ui/UserList';

const UserListPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <UserList />
    </div>
  );
};

export default UserListPage;