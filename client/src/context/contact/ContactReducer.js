import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  GET_ALL_CONTACTS,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  GET_ERRORS,
  RESET_ERRORS
} from "../types";
import uuid from "uuid";

const contactReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_CONTACTS":
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case "GET_ERRORS":
      return {
        ...state,
        err: action.payload
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case "RESET_ERRORS":
      return {
        ...state,
        err: {}
      };
    default:
      return state;
  }
};

export default contactReducer;
