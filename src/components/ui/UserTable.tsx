import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../services/user/getList/type';
import Pagination from './Pagination';

interface UserTableProps {
  users: User[];
  currentPage: number;
  onPageChange: (page: number) => void;
  hasMore: boolean;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  currentPage,
  onPageChange,
  hasMore
}) => {
  const navigate = useNavigate();

  const handleRowClick = (userId: number) => {
    navigate(`/users/${userId}`);
  };

  if (users.length === 0) {
    return (
      <div>
        <p>No users found</p>
        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          hasMore={hasMore}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr
                key={user.id}
                onClick={() => handleRowClick(user.id)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">{user.first_name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        hasMore={hasMore}
      />
    </div>
  );
};

export default UserTable;



