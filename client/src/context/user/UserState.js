import React, { useReducer } from "react";
import axios from "axios";
import UserContext from "./userContext";
import userReducer from "./UserReducer";
import { OPEN_MODAL, CLOSE_MODAL } from "../types";

const UserState = props => {
  const initialState = {
    open_modal: false,
    user: {}
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const handleClickOpen = () => {
    dispatch({ type: OPEN_MODAL });
  };

  const handleClose = () => {
    dispatch({ type: CLOSE_MODAL });
  };

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
