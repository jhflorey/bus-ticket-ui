import * as React from 'react';
import { connect } from "react-redux";
import { getTrips } from "../../actions/trip";
import { getStations } from "../../actions/station";


import Trip from "../../components/Trip";
import _ from "lodash";
import TripManagement from '../../components/Trip/tripManagement';

interface ITripContainerProps {
  getTrips: () => void
}

let tripLength = 0;

const TripContainer: React.FunctionComponent<ITripContainerProps> = (props) => {
  const getTrips = _.get(props, "getTrips", _.identity);
  const trips = _.get(props, "trips", []);
  const { pathname } = window.location;

  React.useEffect(() => {
    getTrips();
  }, [getTrips])

  React.useEffect(() => {
    if (trips.length !== tripLength) {
      tripLength = trips.length;
      getTrips();
    }
  }, [getTrips, trips])

  const getStations = _.get(props, "getStations", _.identity);

  React.useEffect(() => {
    getStations();
  }, [getStations])

  return (
    <React.Fragment>
      {pathname.indexOf("admin") !== -1 ? <TripManagement /> : <Trip />}
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return { trips: state.trips }
}

export default connect(mapStateToProps, { getTrips, getStations })(TripContainer);
