import React, { useReducer } from "react";
import uuid from "uuid";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  GET_ALL_CONTACTS,
  GET_ERRORS,
  RESET_ERRORS,
  DELETE_CONTACT,
  SET_CURRENT_USER,
  UPDATE_CONTACT,
  FILTER_CONTACT
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [],
    currentContact: undefined,
    err: {},
    msg: undefined
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

  // Delete contact
  const deleteContact = async userId => {
    try {
      const res = await axios.delete(`api/contacts/${userId}`);

      dispatch({ type: DELETE_CONTACT, payload: { res, userId } });
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_ERRORS, payload: err.response });
    }
  };
  // Set current contact
  const setCurrentContact = async userId => {
    try {
      const res = state.contacts.filter(contact => contact._id === userId)[0];

      dispatch({ type: SET_CURRENT_USER, payload: res });
    } catch (err) {
      console.log(err);
    }
  };
  // Clear current contact
  const clearCurrentContact = async () => {
    try {
      dispatch({ type: SET_CURRENT_USER });
    } catch (err) {
      console.log(err);
    }
  };
  // Update contact
  const updateContact = async contact => {
    try {
      if (!state.currentContact) {
        return;
      } else {
        const res = await axios.put(
          `api/contacts/${state.currentContact._id}`,
          contact
        );
        const newContacts = state.contacts.filter(
          contact => contact._id !== res.data._id
        );
        const newConts = [res.data, ...newContacts];

        dispatch({ type: UPDATE_CONTACT, payload: newConts });
        getContacts();
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
  // Filter contacts

  const filterContact = (cont, initContacts) => {
    let users = [];
    if (cont) {
      initContacts.map(contact => {
        if (contact.name.toLowerCase().indexOf(cont.toLowerCase()) > -1) {
          return users.push(contact);
        } else {
          return users;
        }
      });
    } else {
      getContacts();
    }
    dispatch({ type: FILTER_CONTACT, payload: users });
  };
  // Clear filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        err: state.err,
        addContact,
        getContacts,
        deleteContact,
        msg: state.msg,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        currentContact: state.currentContact,
        filterContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
