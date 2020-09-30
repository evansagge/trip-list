import React from 'react';
import { Grid } from '@material-ui/core';
import TripListItem from './TripListItem';

const TripList = ({ trips, onEdit, onDelete }) => {
  const tripItems = trips.map((item) => (
    <Grid item key={item.id} xs={12} md={6} lg={4}>
      <TripListItem
        trip={item}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Grid>
  ));

  return <Grid container spacing={3}>{tripItems}</Grid>;
}

export default TripList;