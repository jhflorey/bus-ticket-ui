import * as Types from "../constants/trip";
import * as ITF from "../interface/trip";
import _ from "lodash";

const initialState: ITF.Trip = {} as ITF.Trip

const main = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_TRIP_BY_ID:
      return action.payload;

    case Types.BOOK_TICKETS:
      let newSeats: any = _.clone(state.seats);
      const bookedSeats = _.get(action, "payload.seatCodes", [])
      newSeats.forEach((seat: any) => {
        if (_.indexOf(bookedSeats, seat.code) !== -1) {
          seat.isBooked = true;
        }
      });
      const newTrip = _.assign({}, state, { seats: newSeats })
      return newTrip;

    default:
      return state;
  }
}

export default main;