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
import moment from 'moment';

const TripItem = ({ trip, onDelete, onEdit }) => {
  const handleDelete = () => onDelete(trip);
  const handleEdit = () => onEdit(trip);

  let deleteButton;
  switch (trip.deleteStatus) {
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
          {trip.destination}
        </Typography>
        <div>
          <Typography variant='button' display='inline'>Start Date&nbsp;</Typography>
          <Typography display='inline'>{moment(trip.startDate).fromNow()}</Typography>
        </div>
        <div>
          <Typography variant='button' display='inline'>End Date&nbsp;</Typography>
          <Typography display='inline'>{moment(trip.endDate).fromNow()}</Typography>
        </div>
        <div>
          <Typography variant='button' display='inline'>Comments&nbsp;</Typography>
          <Typography display='inline'>{trip.comments}</Typography>
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

export default TripItem;