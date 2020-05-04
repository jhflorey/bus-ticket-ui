import * as Types from "../constants/station";
import * as ITF from "../interface/station";
import { Dispatch } from "redux";
import api from "../api";

import { convertDataStation } from "../utils";

export const getStations = () => {
  return (dispatch: Dispatch) => {
    api.get("stations")
      .then((res) => {
        dispatch({
          type: Types.GET_STATIONS,
          payload: convertDataStation(res.data)
        })
      })
      .catch((err) => console.log(err))
  }
}

export const getStationById = (id: string) => {
  return (dispatch: Dispatch) => {
    api.get(`stations/${id}`)
      .then((res) => {
        dispatch({
          type: Types.GET_STATION_BY_ID,
          payload: res.data,
        })
      })
      .catch((err) => console.log(err))
  }
}

export const addStation = (data: ITF.Station) => {
  return (dispatch: Dispatch) => {
    api.post("stations", data)
      .then((res) => {
        dispatch({
          type: Types.CREATE_STATION,
          payload: data
        })
      })
      .catch((err) => console.log(err))
  }
}

export const deleteStation = (id: string) => {
  return (dispatch: Dispatch) => {
    api.delete(`stations/${id}`)
      .then((res) => {
        dispatch({
          type: Types.DELETE_STATION,
          payload: id
        })
      })
      .catch((err) => console.log(err))
  }
}

export const updateStation = (data: ITF.Station, id: string) => {
  return (dispatch: Dispatch) => {
    api.put(`stations/${id}`, data)
      .then((res) => {
        dispatch({
          type: Types.UPDATE_STATION,
          payload: { data, id }
        })

        dispatch({
          type: Types.GET_STATION_BY_ID,
          payload: {}
        })
      })
      .catch((err) => console.log(err))
  }
}