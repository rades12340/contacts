import React, { useReducer } from "react";
import uuid from "uuid";
import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../../util/SetAuthToken";
import UserContext from "./userContext";
import userReducer from "./UserReducer";
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

const UserState = props => {
  const initialState = {
    open_modal: false
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  function handleClickOpen() {
    dispatch({ type: OPEN_MODAL });
  }

  function handleClose() {
    dispatch({ type: CLOSE_MODAL });
  }

  return (
    <UserContext.Provider
      value={{
        open_modal: state.open_modal,
        handleClickOpen,
        handleClose
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
