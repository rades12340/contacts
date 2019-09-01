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

const userReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        open_modal: true
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        open_modal: false
      };

    default:
      return state;
  }
};

export default userReducer;
