import React, { useReducer } from "react";
import uuid from "uuid";
import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../../util/SetAuthToken";
import AuthContext from "./authContext";
import authReducer from "./AuthReducer";
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

const AuthState = props => {
  const initialState = {
    isAuthenticated: false,
    user: {}
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const handleSubmit = async user => {
    try {
      const res = await axios.post("/api/auth", user);
      const { token } = res.data;

      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);
    } catch (err) {
      console.error(err);
    }
  };

  function setCurrentUser(decoded) {
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  }

  const logoutUser = () => {
    // Remove token from LS
    localStorage.removeItem("jwtToken");
    // Remove auth heade fro future requests
    setAuthToken(false);
    // set ccurrent use to {} which will set isAuthticated to false
    setCurrentUser({});
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        handleSubmit,
        logoutUser,
        setCurrentUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
