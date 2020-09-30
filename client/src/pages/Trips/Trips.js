import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  Button,
  Divider,
  Grid, 
  Typography 
} from '@material-ui/core';

import { normalize, denormalize } from 'lib/jsonApi';
import { 
  fetchResources, 
  addResource, 
  updateResource, 
  deleteResource 
} from 'redux/resources/actions';
import LoadingBackdrop from 'shared/components/LoadingBackdrop';
import TripList from 'pages/Trips/components/TripList';
import TripFormDrawer from 'pages/Trips/components/TripFormDrawer';

class Trips extends React.Component {
  constructor(props) {
    super();
    this.state = { trip: {}, isFormOpen: false };

    this.handeNewItem = this.handeNewItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleUpsertItem = this.handleUpsertItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  loadData() {
    this.props.fetchResources('trips');
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.loadData();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isAuthenticated && this.props.isAuthenticated) {
      this.loadData();
    }
  }

  handeNewItem() {
    this.setState({ trip: {}, isFormOpen: true });
  }

  handleEditItem(trip) {
    this.setState({ trip: trip, isFormOpen: true });
  }

  async handleUpsertItem(trip) {
    const payload = normalize({ ...trip, type: 'trips' });

    if (trip.id) {
      await this.props.updateResource(payload);
    } else {
      await this.props.addResource(payload);
    }

    const status = this.props.status.trips || {};
    if (!status.pending && status.error == null) {
      this.setState({ trip: {}, isFormOpen: false });
    } else {
      alert(status.error)
    }
  }

  handleDeleteItem(trip) {
    this.props.deleteResource(normalize(trip));
  }

  toggleForm() {
    this.setState({ isFormOpen: !this.state.isFormOpen });
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
      </div>
    );
  }
}

Trips.defaultProps = {
  companies: [],
  trips: [],
  tripStatuses: [],
  status: {
    trips: { pending: false, error: null }
  }
}

const mapStateToProps = ({ auth: { isAuthenticated }, resources: { data, status } }) => {
  const trips = denormalize(data, 'trips') || [];
  const isLoaded = status.trips && !status.trips?.loading;

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