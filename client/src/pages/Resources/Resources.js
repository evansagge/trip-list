
import React from 'react';
import { 
  Snackbar
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import toArray from 'lodash/toArray';

import { normalize } from 'lib/jsonApi';

class Resources extends React.Component {
  constructor(props) {
    super();
    this.state = { [this.resourceName]: {}, isFormOpen: false, isAlertsOpen: false };

    this.handeNewItem = this.handeNewItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleUpsertItem = this.handleUpsertItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.toggleAlerts = this.toggleAlerts.bind(this);
  }

  loadData() {
    throw new Error("Unimplemented");
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

    if (!prevProps.status?.errors && this.props.status?.errors) {
      this.setState({ isAlertsOpen: true, errors: this.props.status.errors });
    }
  }

  handeNewItem() {
    this.setState({ [this.resoureName]: {}, isFormOpen: true });
  }

  handleEditItem(resource) {
    this.setState({ [this.resourceName]: resource, isFormOpen: true });
  }

  async handleUpsertItem(resource) {
    const payload = normalize({ ...resource, type: `${this.resourceName}s` });

    if (resource.id) {
      await this.props.updateResource(payload);
    } else {
      await this.props.addResource(payload);
    }

    const status = this.props.status || {};
    if (!status.pending && status.errors == null) {
      this.setState({ [this.resourceName]: {}, isFormOpen: false });
    } else {
      this.setState({ errors: status.errors, isAlertsOpen: true  })
    }
  }

  handleDeleteItem(resource) {
    this.props.deleteResource(normalize(resource));
  }

  toggleForm() {
    this.setState({ isFormOpen: !this.state.isFormOpen });
  }

  toggleAlerts() {
    this.setState({ isAlertsOpen: false });
  }

  get alerts() {
    return toArray(this.state.errors).map((error, n) => 
      (
        <Snackbar open={this.state.isAlertsOpen} onClose={this.toggleAlerts} key={n}>
          <Alert onClose={this.toggleAlerts} severity="error"> {error.detail}</Alert>
        </Snackbar>
      )
    );
  }
}

export default Resources;
