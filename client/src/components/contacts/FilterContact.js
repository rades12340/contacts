import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ContactContext from "../../context/contact/contactContext";

const useStyles = makeStyles(theme => ({}));

const FilterContact = () => {
  const classes = useStyles();
  const [cntcs, setCntcs] = useState();
  const contactcontext = useContext(ContactContext);

  const { filterContact, getContacts, contacts } = contactcontext;

  useEffect(() => {
    setCntcs(Object.create(contacts));
  }, []);

  const handleChange = e => {
    // setUser(e.target.value);

    filterContact(e.target.value, cntcs);
  };

  return (
    <div>
      <TextField
        id="standard-name"
        label="Name"
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
    </div>
  );
};

export default FilterContact;
