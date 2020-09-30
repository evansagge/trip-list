import React from 'react';
import { Grid } from '@material-ui/core';
import UserListItem from './UserListItem';

const UserList = ({ users, onEdit, onDelete }) => {
  const userItems = users.map((item) => (
    <Grid item key={item.id} xs={12} md={6} lg={4}>
      <UserListItem
        user={item}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Grid>
  ));

  return <Grid container spacing={3}>{userItems}</Grid>;
}

export default UserList;