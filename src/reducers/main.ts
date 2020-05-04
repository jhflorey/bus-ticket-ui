import * as Types from "../constants";
import _ from "lodash";

const initialState = {
  openDrawer: false,
  openModal: false,
  snackbarStatus: {
    openSnackbar: false,
    message: "",
  },
}

const main = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.TOGGLE_DRAWER:
      let openDrawer = state.openDrawer;
      return _.assign({}, state, { openDrawer: !openDrawer })

    case Types.TOGGLE_MODAL:
      return _.assign({}, state, { openModal: action.payload })

    case Types.TOGGLE_SNACKBAR:
      return _.assign({}, state, {
        snackbarStatus: {
          openSnackbar: action.payload.value,
          message: action.payload.message,
        }
      })

    default:
      return state;
  }
}

export default main;