import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  Button,
  Divider,
  Grid, 
  Typography 
} from '@material-ui/core';

import { denormalize } from 'lib/jsonApi';
import { 
  fetchResources, 
  addResource, 
  updateResource, 
  deleteResource 
} from 'redux/resources/actions';
import LoadingBackdrop from 'shared/components/LoadingBackdrop';
import TripList from 'pages/Trips/components/TripList';
import TripFormDrawer from 'pages/Trips/components/TripFormDrawer';
import { Resources } from 'pages/Resources';

class Trips extends Resources {
  resourceName = 'trip';

  loadData() {
    this.props.fetchResources('trips');
  }

  render() {
    if (!this.props.isLoaded) {
      return <LoadingBackdrop />;
    }

    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h5' component='h1'>Trips</Typography>
          </Grid>
          <Grid item xs={12}><Divider /></Grid>
          <Grid item xs={12}>
            <Button variant='contained' color='primary' onClick={this.handeNewItem}>New Trip</Button>
          </Grid>
          <Grid item xs={12}>
            <TripList 
              trips={this.props.trips} 
              onEdit={this.handleEditItem}
              onDelete={this.handleDeleteItem} 
            />
          </Grid>
        </Grid>

        <TripFormDrawer
          trip={this.state.trip}
          isOpen={this.state.isFormOpen}
          onCancel={this.toggleForm} 
          onSubmit={this.handleUpsertItem}
        />

        {this.alerts}
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { isAuthenticated }, resources: { data, status } }) => {
  const trips = denormalize(data, 'trips') || [];
  const isLoaded = !status.loading;

  return { isAuthenticated, trips, isLoaded }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ 
    fetchResources, 
    addResource, 
    updateResource, 
    deleteResource 
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Trips);