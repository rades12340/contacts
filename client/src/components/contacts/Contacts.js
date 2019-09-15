import React, { useContext, useEffect, useState, useRef } from "react";
import ContactContext from "../../context/contact/contactContext";
import AuthContext from "../../context/auth/authContext";
import ContactItem from "./ContactItem";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Signup from "../pages/Signup";
import { withRouter } from "react-router-dom";
import HomePage from "../pages/homePage";

const Contacts = ({ history }) => {
  const [cont, setCont] = useState();
  const contactContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);
  const filterRef = useRef();

  const {
    contacts,
    filterContact,
    getContacts,
    filteredContacts
  } = contactContext;
  const { isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      getContacts();
    }
  }, [isAuthenticated]);

  const handleChange = e => {
    setCont(e.target.value);
    filterContact(e.target.value);
  };

  const clearInput = () => {
    if (cont) {
      filterRef.current.value = "";
      setCont(filterRef.current.value);
    }
  };

  return (
    <>
      {isAuthenticated && contacts.length > 0 && (
        <TextField
          className="filter"
          label="Name"
          onChange={handleChange}
          margin="normal"
          fullWidth
          inputRef={filterRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="toggle password visibility"
                  onClick={clearInput}
                  // onMouseDown={handleMouseDownPassword}
                >
                  {cont && "x"}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      )}
      {isAuthenticated ? (
        contacts ? (
          cont ? (
            filteredContacts.map(contact => (
              <ContactItem key={contact._id} contact={contact} />
            ))
          ) : (
            contacts.map(contact => (
              <ContactItem key={contact._id} contact={contact} />
            ))
          )
        ) : (
          <h1>No Contacts</h1>
        )
      ) : null}
    </>
  );
};

export default withRouter(Contacts);
