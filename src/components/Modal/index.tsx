import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from "react-redux";
import { toggleModal } from "../../actions/main";
import { addStation, updateStation } from "../../actions/station";
import * as ITFStation from "../../interface/station";
import * as ITFTrip from "../../interface/trip";
import _ from "lodash";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import M from "moment";

import { addTrip, updateTrip } from "../../actions/trip";

interface ModalProps {
  openModal: boolean,
  stations: Array<ITFStation.Station>,
  selectedStation: ITFStation.Station,
  selectedTrip: ITFTrip.Trip,
  toggleModal: (value: boolean) => void,
  addStation: (dataStation: ITFStation.Station) => void,
  updateStation: (dataStation: ITFStation.Station, id: string) => void,
  addTrip: (dataTrip: ITFTrip.Trip) => void,
  updateTrip: (dataTrip: ITFTrip.Trip, id: string) => void,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      marginBottom: 32,
      minWidth: 120,
      width: '100%'
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    widthModal: {
      minWidth: 500,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%',
    },
  }),
);

const Modal = (props: ModalProps) => {
  const classes = useStyles();

  const [dataStation, setDataStation] = React.useState({
    name: "",
    address: "",
    province: "",
  } as ITFStation.Station);

  const [dataTrip, setDataTrip] = React.useState({
    fromStationId: "",
    toStationId: "",
    startTime: new Date(),
    price: 0
  } as ITFTrip.Trip);


  React.useEffect(() => {
    if (!_.isEmpty(props.selectedStation)) {
      setDataStation((prevState) => ({
        ...prevState,
        name: _.get(props, "selectedStation.name", ""),
        address: _.get(props, "selectedStation.address", ""),
        province: _.get(props, "selectedStation.province", ""),
      }))
    } else {
      setDataStation((prevState) => ({
        ...prevState,
        name: "",
        address: "",
        province: "",
      }))
    }
  }, [props.selectedStation]) // eslint-disable-line

  React.useEffect(() => {
    if (!_.isEmpty(props.selectedTrip)) {
      setDataTrip((prevState) => ({
        ...prevState,
        fromStationId: _.get(props, "selectedTrip.fromStationId._id", ""),
        toStationId: _.get(props, "selectedTrip.toStationId._id", ""),
        startTime: _.get(props, "selectedTrip.startTime", ""),
        price: _.get(props, "selectedTrip.price", ""),
      }))
    } else {
      setDataTrip((prevState) => ({
        ...prevState,
        fromStationId: "",
        toStationId: "",
        startTime: new Date(),
        price: 0
      }))
    }
  }, [props.selectedTrip]) // eslint-disable-line

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setDataStation((prevState: any) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const createNewStation = () => {
    props.addStation(dataStation);
  }

  const createNewTrip = () => {
    props.addTrip(dataTrip);
  }

  const updateNewStation = () => {
    props.updateStation(dataStation, _.get(props, "selectedStation._id", ""))
  }

  const updateNewTrip = () => {
    props.updateTrip(dataTrip, _.get(props, "selectedTrip._id", ""))
  }

  const handleChangeSelectTrip = (event: any) => {
    const { value, name } = event.target;
    setDataTrip((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleChangeTrip = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setDataTrip((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const { pathname } = window.location;
  const type = _.last(pathname.split("/"));

  const renderStation = () => {
    return (
      <React.Fragment>
        <DialogTitle id="form-dialog-title">Add new station</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus id="name" label="Name"
            type="text" fullWidth name="name" variant="outlined"
            className="mb-1" onChange={handleChange} value={dataStation.name}
          />

          <TextField
            id="address" label="Address" type="text"
            fullWidth name="address" variant="outlined" className="mb-1" value={dataStation.address}
            onChange={handleChange}
          />

          <TextField
            id="province" label="Province" type="text"
            fullWidth variant="outlined" name="province" className="mb-1" value={dataStation.province}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.toggleModal(false)} color="primary">
            Cancel
          </Button>

          {
            _.isEmpty(props.selectedStation) ?
              <Button onClick={() => {
                props.toggleModal(false);
                createNewStation();
              }} color="primary">
                Create
          </Button> : <Button onClick={() => {
                props.toggleModal(false);
                updateNewStation();
              }} color="primary">
                Update
          </Button>
          }
        </DialogActions>
      </React.Fragment>
    )
  }

  const renderTrip = () => {
    return (
      <React.Fragment>
        <DialogTitle id="form-dialog-title">Add new trip</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} className={classes.widthModal} >
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl} >
                <InputLabel id="Start-place">Start place</InputLabel>
                <Select
                  labelId="Start-place"
                  id="Start-place"
                  value={dataTrip.fromStationId}
                  onChange={handleChangeSelectTrip}
                  label="Start place"
                  name="fromStationId"
                >
                  {
                    props.stations.map((station: ITFStation.Station) => {
                      return <MenuItem key={station._id} value={station._id}>{station.name}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>

              <form noValidate>
                <TextField
                  id="datetime-local"
                  label="Start time"
                  type="datetime-local"
                  name="startTime"
                  value={M(dataTrip.startTime, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DDTHH:mm")}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChangeTrip}
                />
              </form>

            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="Destination">Destination</InputLabel>
                <Select
                  labelId="Destination"
                  id="Destination"
                  value={dataTrip.toStationId}
                  onChange={handleChangeSelectTrip}
                  label="Destination"
                  name="toStationId"
                >
                  {
                    props.stations.map((station: ITFStation.Station) => {
                      return <MenuItem key={station._id} value={station._id}>{station.name}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
              <TextField
                id="price" label="Price" type="text"
                fullWidth name="price" variant="outlined" className="mb-1 ml-05" value={dataTrip.price}
                onChange={handleChangeTrip}
              />
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.toggleModal(false)} color="primary">
            Cancel
          </Button>

          {
            _.isEmpty(props.selectedTrip) ?
              <Button onClick={() => {
                props.toggleModal(false);
                createNewTrip();
              }} color="primary">
                Create
          </Button> : <Button onClick={() => {
                props.toggleModal(false);
                updateNewTrip();
              }} color="primary">
                Update
          </Button>
          }
        </DialogActions>
      </React.Fragment>
    )
  }

  return (
    <Dialog open={props.openModal}
      onClose={() => props.toggleModal(false)} aria-labelledby="form-dialog-title">
      {type === "stations" ? renderStation() : renderTrip()}
    </Dialog>
  );
}

const mapStateToProps = (state: any) => {
  return {
    openModal: state.main.openModal,
    selectedStation: state.selectedStation,
    stations: state.stations,
    selectedTrip: state.selectedTrip
  }
}

export default connect(mapStateToProps, { toggleModal, addStation, updateStation, addTrip, updateTrip })(Modal);