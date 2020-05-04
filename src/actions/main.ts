import * as Types from "../constants";
import { Dispatch } from "redux";

export const toggleDrawer = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: Types.TOGGLE_DRAWER,
    })
  }
}

export const toggleModal = (value: boolean) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: Types.TOGGLE_MODAL,
      payload: value,
    })
  }
}

export const toggleSnackbar = (value: boolean, message: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: Types.TOGGLE_SNACKBAR,
      payload: { value, message },
    })
  }
}