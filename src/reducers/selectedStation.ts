import * as Types from "../constants/station";
import * as ITF from "../interface/station";
// import _ from "lodash";

const initialState: ITF.Station = {} as ITF.Station

const main = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_STATION_BY_ID:
      return action.payload;

    default:
      return state;
  }
}

export default main;