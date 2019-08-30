import React, { useReducer } from "react";
import uuid from "uuid";
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
    contacts: [
      {
        name: "Radisav",
        email: "rades@gmail.com",
        phone: "3939-33993-3939"
      },
      {
        name: "Milun",
        email: "mica@gmail.com",
        phone: "4324-4343-21321"
      },
      {
        name: "Marko",
        email: "marko@gmail.com",
        phone: "96934-5435-423"
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact
  // Deletet contact
  // Set current contact
  // Clear current contact
  // Update contact
  // Filter contacts
  // Clear filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
