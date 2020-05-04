import * as React from 'react';
import * as ITF from "../../interface/trip";

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import M from "moment";
import _ from "lodash";
import Seat from '../Seat';

import { getTripById } from "../../actions/trip";
import { connect } from "react-redux";

import { bookTickets } from "../../actions/ticket";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);


interface ITripItemProps {
  trip: ITF.Trip,
  selectedTrip: any,
  getTripById: (id: string) => void,
  bookTickets: (data: any) => void
}

const TripItem: React.FunctionComponent<ITripItemProps> = (props) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [seats, setSeats] = React.useState([]);
  const [selectedSeats, setSelectedSeats] = React.useState([] as any);
  const [alreadySelectedSeats, setAlreadySelectedSeats] = React.useState([] as any);

  React.useEffect(() => {
    const bookedSeatCode = _.chain(_.get(props, "selectedTrip.seats"))
      .filter((seat) => seat.isBooked === true)
      .map((seat) => seat.code)
      .value();
    setAlreadySelectedSeats(bookedSeatCode);
    setSeats(_.get(props, "selectedTrip.seats", []));
  }, [props.selectedTrip]) // eslint-disable-line

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const book = () => {
    props.bookTickets({
      tripId: _.get(props, "selectedTrip._id", ""),
      seatCodes: selectedSeats
    })
  }

  const getSelectedSeats = (value: any) => {
    setSelectedSeats(value);
  }

  const getSeats = (value: any) => {
    setSeats(value);
  }

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Luxe Bus"
        />
        <CardMedia
          className={classes.media}
          image="/NYCBus.jpg"
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="overline" color="textSecondary" component="p" className="card-content__left">
            <span className="bold">Start</span> : {_.get(props, "trip.fromStationId.name", "")} / {_.get(props, "trip.fromStationId.province", "")}
          </Typography>
          <Typography variant="overline" color="textSecondary" component="p" className="card-content__left">
            <span className="bold">Destination</span> : {_.get(props, "trip.toStationId.name", "")} / {_.get(props, "trip.fromStationId.province", "")}
          </Typography>
          <Typography variant="overline" color="textSecondary" component="p" className="card-content__left">
            <span className="bold">Price</span> : {_.get(props, "trip.price", "")} $
          </Typography>
          <Typography variant="overline" color="textSecondary" component="p" className="card-content__left">
            <span className="bold">Start time</span> : {M(_.get(props, "trip.startTime", ""), "YYYY-MM-DDTHH:mm:ss").format("HH:mm DD/MM/YYYY")}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Button size="medium" color="primary" onClick={() => {
            handleClickOpen();
            props.getTripById(_.get(props, "trip._id", ""))
          }}>
            Book now
          </Button>
        </CardActions>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Choose seat(s)"}</DialogTitle>
        <DialogContent>
          <Seat seats={seats}
            selectedSeats={selectedSeats} getSelectedSeats={getSelectedSeats} getSeats={getSeats}
            alreadySelectedSeats={alreadySelectedSeats}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
            handleClose();
            book();
          }} color="primary" autoFocus>
            Book
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return { selectedTrip: state.selectedTrip }
}

export default connect(mapStateToProps, { getTripById, bookTickets })(TripItem);
