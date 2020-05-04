import * as React from 'react';
import { connect } from "react-redux";
import { getTickets } from "../../actions/ticket";

// import Station from "../../components/Station";

import _ from "lodash";

interface ITicketsContainerProps {
  getTickets: () => void
}

const TicketsContainer: React.FunctionComponent<ITicketsContainerProps> = (props) => {
  const getTickets = _.get(props, "getTickets", _.identity);

  React.useEffect(() => {
    getTickets();
  }, [getTickets])

  return (
    <React.Fragment>
      {/* <Station /> */}
    </React.Fragment>
  );
};

export default connect(null, { getTickets })(TicketsContainer);
