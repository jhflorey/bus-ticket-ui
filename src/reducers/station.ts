import * as Types from "../constants/station";
import * as ITF from "../interface/station";

const initialState: Array<ITF.Station> = []

const Station = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_STATIONS:
      return action.payload;

    case Types.CREATE_STATION:
      return [...state, action.payload];

    case Types.DELETE_STATION:
      return state.filter((station) => station._id !== action.payload);

    case Types.UPDATE_STATION:
      let newStations = [...state];
      let index = newStations.findIndex((station) => station._id === action.payload.id);
      const newStation = { ...action.payload.data, _id: action.payload.id }
      newStations[index] = newStation;
      return newStations;

    default:
      return state;
  }
}

export default Station;