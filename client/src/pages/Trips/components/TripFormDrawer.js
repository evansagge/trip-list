import React, { useState } from 'react';
import {
  Button,
  Drawer, 
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import { 
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
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

const TripFormDrawer = ({ trip, isOpen, onSubmit, onCancel }) => {
  const classes = useStyles();

  // const [id, setId] = useState();
  // const [destination, setDestination] = useState();
  // const [startDate, setStartDate] = useState();
  // const [endDate, setEndDate] = useState();
  // const [comments, setComments] = useState();
  const [attributes, setAttributes] = useState({})

  React.useEffect(() => { 
    setAttributes(trip);
  }, [trip]);

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
    <MuiPickersUtilsProvider utils={MomentUtils}>
    <Drawer width="50%" anchor="right" open={isOpen} onClose={handleCancel}>
      <form onSubmit={handleSubmit} noValidate className={classes.form}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h5'>{trip.id ? 'Edit' : 'Add'} Job Application</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              label="Destination"
              name='destination'
              defaultValue={attributes.destination}
              onChange={e => setAttribute('destination', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <DatePicker 
              fullWidth 
              value={attributes.startDate} 
              label="Start Date" 
              autoOk 
              onChange={val => setAttribute('startDate', val)} 
              />
          </Grid>
          <Grid item xs={12}>
            <DatePicker 
              fullWidth 
              value={attributes.endDate} 
              label="End Date" 
              autoOk 
              onChange={val => setAttribute('endDate', val)} 
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              label="Comment"
              name='comment'
              defaultValue={attributes.comments}
              onChange={e => setAttribute('comments', e.target.value)}
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
    </MuiPickersUtilsProvider>
  );
}

TripFormDrawer.defaultProps = {
  companies: [],
  tripStatuses: [],
  trip: {},
  isOpen: false
}

export default TripFormDrawer;

