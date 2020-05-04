import * as Types from "../constants/ticket";
// import * as ITF from "../interface/station";
import { Dispatch } from "redux";
import api from "../api";


export const getTickets = () => {
  return (dispatch: Dispatch) => {
    api.get("tickets")
      .then((res) => {
        console.log(res.data)
        // dispatch({
        //   type: Types.GET_TICKETS,
        //   payload: convertDataStation(res.data)
        // })
      })
      .catch((err) => console.log(err))
  }
}

export const bookTickets = (data: any) => {
  return (dispatch: Dispatch) => {
    api.post("/tickets", data)
      .then((res) => {
        dispatch({
          type: Types.BOOK_TICKETS,
          payload: data
        })
      })
      .catch((err) => console.log(err))
  }
}

