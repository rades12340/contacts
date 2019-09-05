import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import userContext from "../context/user/userContext";
import authContext from "../context/auth/authContext";
import TextField from "@material-ui/core/TextField";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

export default function AlertDialogSlide() {
  const classes = useStyles();
  // const [open, setOpen] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });

  const usercontext = useContext(userContext);
  const authcontext = useContext(authContext);

  const { handleClose, open_modal } = usercontext;
  const { handleSubmit } = authcontext;

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmmit = e => {
    e.preventDefault();
    console.log(values);
    handleSubmit(values);
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open_modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Login User</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmmit}
            className={classes.container}
            noValidate
            autoComplete="off"
          >
            <TextField
              name="email"
              label="Email"
              style={{ margin: 8 }}
              placeholder="Placeholder"
              helperText="Full width!"
              fullWidth
              margin="normal"
              onChange={onChange}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              name="password"
              label="Password"
              style={{ margin: 8 }}
              placeholder="Placeholder"
              helperText="Full width!"
              fullWidth
              type="password"
              margin="normal"
              onChange={onChange}
              InputLabelProps={{
                shrink: true
              }}
            />
            <DialogActions>
              <Button
                type="submit"
                onClick={handleClose}
                color="primary"
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
