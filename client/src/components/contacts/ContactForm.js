import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import contactContext from "../../context/contact/contactContext";
import authContext from "../../context/auth/authContext";
import { checkPropTypes } from "prop-types";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  formControl: {
    margin: theme.spacing(1),
    margin: 8
  },
  group: {
    margin: theme.spacing(1, 0)
  }
}));

const ContactForm = () => {
  const classes = useStyles();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });
  const [errs, setErrs] = useState();

  const nameRef = useRef(contact.name);
  const emailRef = useRef(contact.email);
  const phoneRef = useRef(contact.phone);
  const typeRef = useRef(contact.type);

  const contactcontext = useContext(contactContext);
  const authcontext = useContext(authContext);
  const { user } = authcontext;
  const {
    addContact,
    err: { errors },
    currentContact,
    clearCurrentContact,
    updateContact
  } = contactcontext;

  const { name, email, phone, type } = contact;

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addContact(contact);
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal"
    });
    setErrs();
  };

  useEffect(() => {
    if (errors && errors.length > 0) {
      let err = {};
      for (let i = 0; i < errors.length; i++) {
        if (errors[i].param === "name") {
          err.name = errors[i].msg;
        }
        if (errors[i].param === "email") {
          err.email = errors[i].msg;
        }
      }
      setErrs(err);
    }
  }, [errors]);

  const clearContact = async () => {
    await clearCurrentContact();
    nameRef.current.value = currentContact.name;
    emailRef.current.value = currentContact.email;
    phoneRef.current.value = currentContact.phone;
    typeRef.current.label = currentContact.type;
    setContact({
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      type: typeRef.current.label
    });
  };

  useEffect(() => {
    if (currentContact) {
      nameRef.current.value = currentContact.name;
      emailRef.current.value = currentContact.email;
      phoneRef.current.value = currentContact.phone;
      typeRef.current.label = currentContact.type;
      setContact({
        name: nameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        type: typeRef.current.label
      });
      clearContact();
    }
  }, [currentContact]);

  const updateCont = () => {
    updateContact(contact);
  };
  // console.log(currentContact);
  const errName = Boolean(errs && errs.name);
  const errEmail = Boolean(errs && errs.email);
  return (
    <form
      className={classes.container}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        error={errName}
        id="name"
        name="name"
        label="Name"
        style={{ margin: 8 }}
        placeholder="Enter name..."
        value={name}
        inputRef={nameRef}
        fullWidth
        margin="normal"
        onChange={onChange}
        InputLabelProps={{
          shrink: true
        }}
      />
      {errName && (
        <FormHelperText
          id="name"
          style={{ color: "red", marginLeft: "0.5rem", marginTop: "0px" }}
        >
          {errs.name}
        </FormHelperText>
      )}

      <TextField
        error={errEmail}
        id="email"
        name="email"
        label="Email"
        value={email}
        inputRef={emailRef}
        style={{ margin: 8 }}
        placeholder="Enter email..."
        fullWidth
        margin="normal"
        onChange={onChange}
        InputLabelProps={{
          shrink: true
        }}
      />
      {errEmail && (
        <FormHelperText
          id="email"
          style={{ color: "red", marginLeft: "0.5rem", marginTop: "0px" }}
        >
          {errs.email}
        </FormHelperText>
      )}
      <TextField
        name="phone"
        label="Phone"
        value={phone}
        inputRef={phoneRef}
        style={{ margin: 8 }}
        placeholder="Enter phone..."
        fullWidth
        margin="normal"
        onChange={onChange}
        InputLabelProps={{
          shrink: true
        }}
      />
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Type of contact</FormLabel>
        <RadioGroup
          aria-label="type"
          name="type"
          value={type}
          ref={typeRef}
          className={classes.group}
          onChange={onChange}
        >
          <FormControlLabel
            value="personal"
            control={<Radio />}
            label="Personal"
          />
          <FormControlLabel
            value="professional"
            control={<Radio />}
            label="Professional"
          />
        </RadioGroup>
      </FormControl>
      {!currentContact ? (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          fullWidth={true}
        >
          Submit
        </Button>
      ) : (
        <>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            className={classes.button}
            fullWidth={true}
            onClick={updateCont}
            style={{ backgroundColor: "green", marginBottom: "1rem" }}
          >
            Update Contact
          </Button>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            className={classes.button}
            fullWidth={true}
            onClick={clearContact}
          >
            Clear Contact
          </Button>
        </>
      )}
      <Divider />
    </form>
  );
};

ContactForm.propTypes = {
  error: PropTypes.string
};

export default ContactForm;
