import * as Types from "../constants/trip";
import * as ITF from "../interface/trip";
import { Dispatch } from "redux";
import api from "../api";

import M from "moment";

import { convertDataTrip } from "../utils";

export const getTrips = () => {
  return (dispatch: Dispatch) => {
    api.get("/trips")
      .then((res) => {
        dispatch({
          type: Types.GET_TRIPS,
          payload: convertDataTrip(res.data)
        })
      })
      .catch((err) => console.log(err))
  }
}

export const getTripById = (id: string) => {
  return (dispatch: Dispatch) => {
    api.get(`/trips/${id}`)
      .then((res) => {
        dispatch({
          type: Types.GET_TRIP_BY_ID,
          payload: res.data,
        })
      })
      .catch((err) => console.log(err))
  }
}

export const addTrip = (data: ITF.Trip) => {
  const newData = { ...data };
  const time = M(newData.startTime).format('DD MM YYYY HH:mm:ss');
  const price = Number(newData.price);
  newData.startTime = time;
  newData.price = price
  return (dispatch: Dispatch) => {
    api.post("trips", newData)
      .then((res) => {
        dispatch({
          type: Types.CREATE_TRIP,
          payload: newData
        })
      })
      .catch((err) => console.log(err))
  }
}

export const deleteTrip = (id: string) => {
  return (dispatch: Dispatch) => {
    api.delete(`trips/${id}`)
      .then((res) => {
        dispatch({
          type: Types.DELETE_TRIP,
          payload: id
        })
      })
      .catch((err) => console.log(err))
  }
}

export const updateTrip = (data: ITF.Trip, id: string) => {
  return (dispatch: Dispatch) => {
    api.put(`trips/${id}`, data)
      .then((res) => {
        dispatch({
          type: Types.UPDATE_TRIP,
          payload: { data, id }
        })

        dispatch({
          type: Types.GET_TRIP_BY_ID,
          payload: {}
        })
      })
      .catch((err) => console.log(err))
  }
}