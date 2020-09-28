import React from 'react';
import { 
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid, 
  Typography 
} from '@material-ui/core';


class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h5' component='h1'>Dashboard</Typography>
          </Grid>
          <Grid item xs={12}><Divider /></Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader title='Trips' />
              <CardContent>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader title='Users' />
              <CardContent>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;