import React, { useReducer } from "react";

import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../../util/SetAuthToken";
import AuthContext from "./authContext";
import authReducer from "./AuthReducer";
import { SET_CURRENT_USER, GET_ERRORS, RESET_ERRORS } from "../types";

const AuthState = props => {
  const initialState = {
    isAuthenticated: false,
    user: {},
    err: {}
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const resetErrors = () => {
    return {
      type: RESET_ERRORS
    };
  };

  const loginUser = async (user, history) => {
    try {
      dispatch({ type: RESET_ERRORS });
      const res = await axios.post("/api/auth", user);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);
      history.push("/");
    } catch (err) {
      getErrors(err.response.data);
    }
  };

  const signupUser = async (user, history) => {
    try {
      dispatch({ type: RESET_ERRORS });
      const res = await axios.post("/api/users", user);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);
      history.push("/");
    } catch (err) {
      getErrors(err.response.data);
    }
  };

  function setCurrentUser(decoded) {
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  }

  function getErrors(err) {
    dispatch({ type: GET_ERRORS, payload: err });
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
        err: state.err,
        loginUser,
        logoutUser,
        setCurrentUser,
        signupUser,
        resetErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
