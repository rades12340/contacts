import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT_USER,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  GET_ALL_CONTACTS,
  FILTER_CONTACT,
  CLEAR_FILTER,
  GET_ERRORS,
  RESET_ERRORS
} from "../types";

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
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentContact: action.payload || undefined
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload.userId
        ),
        msg: action.payload.res.data.msg
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: action.payload
      };
    case "FILTER_CONTACT":
      return {
        ...state,
        contacts: action.payload
      };
    default:
      return state;
  }
};

export default contactReducer;
