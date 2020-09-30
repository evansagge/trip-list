import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  Button,
  Divider,
  Grid, 
  Typography,
  Snackbar
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import toArray from 'lodash/toArray';

import { denormalize } from 'lib/jsonApi';
import { 
  fetchResources, 
  addResource, 
  updateResource, 
  deleteResource 
} from 'redux/resources/actions';
import LoadingBackdrop from 'shared/components/LoadingBackdrop';
import UserList from 'pages/Users/components/UserList';
import UserFormDrawer from 'pages/Users/components/UserFormDrawer';
import { Resources } from 'pages/Resources';

class Users extends Resources {
  resourceName = 'user';

  loadData() {
    this.props.fetchResources('users');
  }

  render() {
    if (!this.props.isLoaded) {
      return <LoadingBackdrop />;
    }

    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h5' component='h1'>Users</Typography>
          </Grid>
          <Grid item xs={12}><Divider /></Grid>
          <Grid item xs={12}>
            <Button variant='contained' color='primary' onClick={this.handeNewItem}>New User</Button>
          </Grid>
          <Grid item xs={12}>
            <UserList 
              users={this.props.users} 
              onEdit={this.handleEditItem}
              onDelete={this.handleDeleteItem} 
            />
          </Grid>
        </Grid>

        <UserFormDrawer
          user={this.state.user}
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
  const users = denormalize(data, 'users') || [];
  const isLoaded = !status?.loading;

  return { isAuthenticated, users, isLoaded, status }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ 
    fetchResources, 
    addResource, 
    updateResource, 
    deleteResource 
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
