import * as ITF from "../interface/user";
import * as Types from "../constants/auth";
import * as TypesMain from "../constants";
import api from "../api";
import { Dispatch } from "redux";

import _ from "lodash";
import jwtDecode from "jwt-decode";

export const login = (dataUser: ITF.User, callback?: () => void) => {
  return (dispatch: Dispatch) => {
    api.post("/users/login", dataUser)
      .then((res) => {
        localStorage.setItem("tokenBusTicket", res.data.token);
        api.defaults.headers.common["token"] = res.data.token;
        api.defaults.headers.common["Content-Type"] = "application/json";
        const data = jwtDecode(res.data.token);
        dispatch(getInformationUser(data));
        if (callback) callback();
        return data;
      })
      .then((data: any) => {
        dispatch({
          type: TypesMain.TOGGLE_SNACKBAR,
          payload: { value: true, message: `Welcome back, ${data.fullName}!` },
        })
        _.debounce(() => {
          dispatch({
            type: TypesMain.TOGGLE_SNACKBAR,
            payload: { value: false, message: "" },
          })
        }, 2000)();
      })
      .catch((err: any) => {
        dispatch({
          type: TypesMain.TOGGLE_SNACKBAR,
          payload: { value: true, message: "Please check email and password again!" },
        })
        _.debounce(() => {
          dispatch({
            type: TypesMain.TOGGLE_SNACKBAR,
            payload: { value: false, message: "" },
          })
        }, 2000)()
      })
  }
}

export const register = (dataUser: any, callback?: () => void) => {
  return (dispatch: Dispatch) => {
    api.post("/users", dataUser)
      .then((res) => {
        if (callback) callback();
      })
      .then(() => {
        dispatch({
          type: TypesMain.TOGGLE_SNACKBAR,
          payload: { value: true, message: "Sign up successfully!" },
        })
        _.debounce(() => {
          dispatch({
            type: TypesMain.TOGGLE_SNACKBAR,
            payload: { value: false, message: "" },
          })
        }, 2000)();
      })
      .catch((err: any) => {
        dispatch({
          type: TypesMain.TOGGLE_SNACKBAR,
          payload: { value: true, message: "Something went wrong!" },
        })
        _.debounce(() => {
          dispatch({
            type: TypesMain.TOGGLE_SNACKBAR,
            payload: { value: false, message: "" },
          })
        }, 2000)()
      })
  }
}

export const logout = (callback: () => void) => {
  return (dispatch: Dispatch) => {
    localStorage.removeItem("tokenBusTicket");
    dispatch({
      type: Types.REMOVE_USER_INFORMATION,
    })
    if (callback) callback();
  }
}

export const getInformationUser = (data: any) => {
  return {
    type: Types.GET_USER_INFORMATION,
    payload: data
  }
}

export const changeUserData = (data: any, id: string) => {
  return (dispatch: Dispatch) => {
    api.put(`/users/${id}`, data)
      .then((res) => {
        dispatch({
          type: Types.GET_USER_INFORMATION,
          payload: res.data
        })
      })
      .catch((err) => console.log(err))
  }
}


export const changePassword = (data: any, id: string) => {
  return (dispatch: Dispatch) => {
    api.patch(`/users/${id}`, data)
      .then((res) => {
        dispatch({
          type: TypesMain.TOGGLE_SNACKBAR,
          payload: { value: true, message: `New password was updated` },
        })
        _.debounce(() => {
          dispatch({
            type: TypesMain.TOGGLE_SNACKBAR,
            payload: { value: false, message: "" },
          })
        }, 2000)();
      })
      .catch((err) => {
        dispatch({
          type: TypesMain.TOGGLE_SNACKBAR,
          payload: { value: true, message: `Something went wrong` },
        })
        _.debounce(() => {
          dispatch({
            type: TypesMain.TOGGLE_SNACKBAR,
            payload: { value: false, message: "" },
          })
        }, 2000)();
      })
  }
}