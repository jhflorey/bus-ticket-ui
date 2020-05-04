import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import WeekendOutlinedIcon from "@material-ui/icons/WeekendOutlined";

import _ from "lodash";

interface ISeatProps {
  seats: any,
  selectedSeats: any,
  getSelectedSeats: any,
  getSeats: any,
  alreadySelectedSeats: any
}

const Seat: React.FunctionComponent<ISeatProps> = (props) => {
  const leftSide = _.filter(props.seats, (seat: any) => {
    return seat.code.indexOf("A");
  })

  const rightSide = _.filter(props.seats, (seat: any) => {
    return seat.code.indexOf("B");
  })

  const renderSeat = (seatList: Array<any>) => {
    return seatList.map((seat: any) => {
      const index = _.findIndex(props.alreadySelectedSeats, (seatItem) => seatItem === seat.code);
      const color = !seat.isBooked ? "inherit" : (index !== -1 ? "primary" : "secondary");
      return <React.Fragment key={seat._id}>
        <IconButton onClick={() => onChooseSeat(seat._id)} className={`${index !== -1 ? "preventClick" : ""}`}>
          <WeekendOutlinedIcon color={color} />
        </IconButton>
        {seat.code}
      </React.Fragment>
    })
  }

  const onChooseSeat = (id: string) => {
    const seatIndex: any = _.findIndex(props.seats, (seat: any) => seat._id === id);
    let selectedSeat: any = props.seats[seatIndex];
    if (selectedSeat.isBooked) {
      selectedSeat.isBooked = false;
      const newSelectedSeats = _.filter(props.selectedSeats, (seat: any) => seat === selectedSeat.code);
      props.getSelectedSeats(newSelectedSeats);
    }
    else {
      selectedSeat.isBooked = true;
      const newSelectedSeats = [...props.selectedSeats, selectedSeat.code];
      props.getSelectedSeats(newSelectedSeats);
    }
    let newSeats: any = _.cloneDeep(props.seats);
    newSeats[seatIndex] = selectedSeat;
    props.getSeats(newSeats);
  }

  return (
    <div className="bus-seats">
      <div className="d-flex">
        <WeekendOutlinedIcon className="mr-1" />
        {" Bus driver"}
      </div>
      <div className="bus-line"></div>
      <div className="d-flex justify-between">
        <div>
          {renderSeat(rightSide)}
        </div>
        <div>
          {renderSeat(leftSide)}
        </div>
      </div>
    </div>
  );
};

export default Seat;
