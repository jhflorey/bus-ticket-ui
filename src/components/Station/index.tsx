import * as React from 'react';

import { connect } from "react-redux";
import { toggleModal } from "../../actions/main";

import * as ITF from "../../interface/station";
import Typography from '@material-ui/core/Typography';

import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TableStation from './TableStation';
import Modal from '../Modal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    }
  }),
);

interface IStationProps {
  stations: Array<ITF.Station>,
  toggleModal: (value: boolean) => void
}

const Station: React.FunctionComponent<IStationProps> = (props) => {
  const classes = useStyles();
  const data = props.stations

  return (
    <React.Fragment>
      <div className="station-header">
        <Typography variant="h4" gutterBottom>
          All Stations
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<AddCircleOutline />}
          onClick={() => props.toggleModal(true)}
        >
          New Station
        </Button>
      </div>
      <Modal />
      <TableStation data={data} />

    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return { stations: state.stations }
}

export default connect(mapStateToProps, { toggleModal })(Station);
