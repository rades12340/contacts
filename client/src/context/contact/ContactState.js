import React, { useReducer } from "react";
import uuid from "uuid";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  GET_ALL_CONTACTS,
  GET_ERRORS,
  RESET_ERRORS
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [],
    err: {}
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // get all contacts
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      dispatch({ type: GET_ALL_CONTACTS, payload: res.data });
    } catch (errors) {
      dispatch({ type: GET_ERRORS, payload: errors.response.data });
    }
  };

  // Add Contact
  const addContact = async user => {
    try {
      dispatch({ type: RESET_ERRORS });
      const res = await axios.post("/api/contacts", user);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    }
  };

  // Deletet contact
  // Set current contact
  // Clear current contact
  // Update contact
  // Filter contacts
  // Clear filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        getContacts,
        err: state.err
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
