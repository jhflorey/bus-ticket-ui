import * as Types from "../constants/trip";
import * as ITF from "../interface/trip";
// import _ from "lodash";

const initialState: Array<ITF.Trip> = []

const main = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_TRIPS:
      return action.payload;

    case Types.CREATE_TRIP:
      return [...state, action.payload];

    case Types.DELETE_TRIP:
      return state.filter((trip) => trip._id !== action.payload);

    case Types.UPDATE_TRIP:
      // let newStations = [...state];
      // let index = newStations.findIndex((station) => station._id === action.payload.id);
      // const newStation = { ...action.payload.data, _id: action.payload.id }
      // newStations[index] = newStation;
      return state;

    default:
      return state;
  }
}

export default main;