import React, { useState } from 'react';
import {
  Button,
  Drawer, 
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  form: {
    padding: '20px',
    width: '100%',
    [theme.breakpoints.up(480)] : { // eslint-disable-line no-useless-computed-key
      width: '480px'
    }
  }
}));

const UserFormDrawer = ({ user, isOpen, onSubmit, onCancel }) => {
  const classes = useStyles();

  const [attributes, setAttributes] = useState({})

  React.useEffect(() => { 
    setAttributes(user);
  }, [user]);

  const setAttribute = (key, value) => {
    setAttributes({ ...attributes, [key]: value });
  }

  // FORM FUNCTIONS

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...attributes,
      startDate: moment(attributes.startDate).format("YYYY-MM-DD"),
      endDate: moment(attributes.endDate).format("YYYY-MM-DD"),
    });
  }

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel()
  }

  // RETURN JSX

  return (
    <Drawer width="50%" anchor="right" open={isOpen} onClose={handleCancel}>
      <form onSubmit={handleSubmit} noValidate className={classes.form}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h5'>{user.id ? 'Edit' : 'Add'} Job Application</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              type="text"
              label="Email"
              name='email'
              defaultValue={attributes.email}
              onChange={e => setAttribute('email', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              type="password"
              label="Password"
              name='password'
              defaultValue={attributes.password}
              onChange={e => setAttribute('password', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Button variant='contained' color='primary' fullWidth type='submit'>Submit</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant='contained' fullWidth onClick={handleCancel}>Cancel</Button>
          </Grid>
        </Grid>
      </form >
    </Drawer>
  );
}

UserFormDrawer.defaultProps = {
  companies: [],
  userStatuses: [],
  user: {},
  isOpen: false
}

export default UserFormDrawer;

