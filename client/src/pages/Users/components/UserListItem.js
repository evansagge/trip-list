import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  IconButton,
  Typography
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Error as ErrorIcon
} from '@material-ui/icons';

const UserItem = ({ user, onDelete, onEdit }) => {
  const handleDelete = () => onDelete(user);
  const handleEdit = () => onEdit(user);

  let deleteButton;
  switch (user.deleteStatus) {
    case 'in_progress':
      deleteButton = (
        <CircularProgress size={16} variant='indeterminate' />
      );
      break;
    case 'error':
      deleteButton = (
        <ErrorIcon />
      );
      break;
    default:
      deleteButton = (
        <IconButton color='secondary' onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      )
  };

  return (
    <Card>
      <CardContent>
        <Typography display='inline' variant='h5'>
          {user.destination}
        </Typography>
        <div>
          <Typography variant='button' display='inline'>Email&nbsp;</Typography>
          <Typography display='inline'>{user.email}</Typography>
        </div>
        <div>
          <Typography variant='button' display='inline'>Role&nbsp;</Typography>
          <Typography display='inline'>{user.role}</Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton color='primary' onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        {deleteButton}
      </CardActions>
    </Card>
  );
}

export default UserItem;
