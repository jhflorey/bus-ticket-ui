import * as Types from "../constants/auth";

const initialState = {}

const UserInformation = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_USER_INFORMATION:
      return action.payload;

    case Types.REMOVE_USER_INFORMATION:
      return {};

    default:
      return state;
  }
}

export default UserInformation;