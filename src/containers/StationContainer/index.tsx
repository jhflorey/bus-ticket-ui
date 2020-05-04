import * as React from 'react';
import { connect } from "react-redux";
import { getStations } from "../../actions/station";

import Station from "../../components/Station";

import _ from "lodash";

interface IStationContainerProps {
  getStations: () => void
}

const StationContainer: React.FunctionComponent<IStationContainerProps> = (props) => {
  const getStations = _.get(props, "getStations", _.identity);

  React.useEffect(() => {
    getStations();
  }, [getStations])

  return (
    <React.Fragment>
      <Station />
    </React.Fragment>
  );
};

export default connect(null, { getStations })(StationContainer);
