import React from 'react';
import { 
  Divider,
  Grid, 
  Typography 
} from '@material-ui/core';

class Trips extends React.Component {
  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h5' component='h1'>Trips</Typography>
          </Grid>
          <Grid item xs={12}><Divider /></Grid>

          <Grid item xs={12}>
            <p>TODO: Content goes here</p>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Trips;