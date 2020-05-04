import { combineReducers } from "redux";
import main from "./main"; //only for UI
import Station from "./station";
import Trip from "./trip";
import UserInformation from "./user";
import SelectedTrip from "./selectedTrip";
import SelectedStation from "./selectedStation";

export const rootReducer = combineReducers({
  main: main,
  stations: Station,
  userInformation: UserInformation,
  trips: Trip,
  selectedTrip: SelectedTrip,
  selectedStation: SelectedStation
});