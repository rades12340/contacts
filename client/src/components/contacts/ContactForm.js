import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import contactContext from '../../context/contact/contactContext'

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

  
  const contactcontext = useContext(contactContext)
  const {addContact} = contactcontext

  const { name, email, phone, type } = contact
  

  const onChange = e => {
    setContact({...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    addContact(contact)
  }


  return (
    <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"        
        style={{ margin: 8 }}
        placeholder="Enter name of contact..."
        fullWidth
        margin="normal"
        onChange={onChange}
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        name="email"
        label="Email"       
        style={{ margin: 8 }}
        placeholder="Enter email of contact..."
        fullWidth
        margin="normal"
        onChange={onChange}
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        name="phone"
        label="Phone"        
        style={{ margin: 8 }}
        placeholder="Enter phone of contact..."
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
      <Button type="submit" variant="contained" color="primary" className={classes.button} fullWidth={true}>
        Submit
      </Button>
      <Divider/>
    </form>
  );
};

export default ContactForm;
