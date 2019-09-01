import React, { useReducer } from "react";
import uuid from "uuid";
import axios from 'axios'
import ContactContext from "./contactContext";
import contactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: []
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact
  const addContact =(user) => {
  //  const res = await axios.post('/api/users', user)
   console.log(initialState)
    dispatch({type: ADD_CONTACT, payload: user})
  }
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
        addContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
