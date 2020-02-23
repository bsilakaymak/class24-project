import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Sila Kaymak',
      image:
        'https://avatars2.githubusercontent.com/u/54150648?s=460&v=4',
      places: 3
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;
