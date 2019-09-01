import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT_USER,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  OPEN_MODAL,
  CLOSE_MODAL
} from "../types";
import uuid from "uuid";
import isEmpty from "../../util/isEmpty";

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
