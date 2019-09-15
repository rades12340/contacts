import isEmpty from "../../util/isEmpty";
import { SET_CURRENT_USER, GET_ERRORS, RESET_ERRORS } from "../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case "GET_ERRORS":
      return {
        ...state,
        err: action.payload
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

export default authReducer;
