import * as React from 'react';

import { connect } from "react-redux";
import { toggleModal } from "../../actions/main";

import * as ITF from "../../interface/trip";
import Typography from '@material-ui/core/Typography';

import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TableTrip from './TableTrip';
import Modal from '../Modal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    }
  }),
);

interface ITripManagementProps {
  trips: Array<ITF.Trip>,
  toggleModal: (value: boolean) => void
}

const TripManagement: React.FunctionComponent<ITripManagementProps> = (props) => {
  const classes = useStyles();
  const data = props.trips

  return (
    <React.Fragment>
      <div className="station-header">
        <Typography variant="h4" gutterBottom>
          All Trips
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<AddCircleOutline />}
          onClick={() => props.toggleModal(true)}
        >
          New Trip
        </Button>
      </div>
      <Modal />
      <TableTrip data={data} />

    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return { trips: state.trips }
}

export default connect(mapStateToProps, { toggleModal })(TripManagement);
