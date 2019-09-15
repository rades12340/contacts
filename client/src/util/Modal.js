import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
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
import FormHelperText from "@material-ui/core/FormHelperText";
import { CLOSE_MODAL } from "../context/types";

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

const AlertDialogSlide = ({ history }) => {
  const classes = useStyles();
  const [errs, setErrs] = useState();
  const [values, setValues] = useState({ email: "", password: "" });

  const usercontext = useContext(userContext);
  const authcontext = useContext(authContext);

  const { handleClose, open_modal } = usercontext;
  const {
    loginUser,
    err: { errors },
    resetErrors,
    isAuthenticated
  } = authcontext;

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmmit = async e => {
    e.preventDefault();
    try {
      resetErrors();
      await loginUser(values, history);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (errors && errors.length > 0) {
      let err = {};
      for (let i = 0; i < errors.length; i++) {
        if (errors[i].param === "email") {
          err.email = errors[i].msg;
        }
        if (errors[i].param === "password") {
          err.password = errors[i].msg;
        }
      }
      setErrs(err);
    }
  }, [errors]);

  useEffect(() => {
    if (isAuthenticated) {
      handleClose();
    } else {
      handleClose();
      setErrs();
    }
  }, [isAuthenticated]);

  const errEmail = Boolean(errs && errs.email);
  const errPassword = Boolean(errs && errs.password);

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
              error={errEmail}
              name="email"
              label="Email"
              style={{ margin: 8 }}
              placeholder="Placeholder"
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
              error={errPassword}
              id="password"
              name="password"
              label="Password"
              style={{ margin: 8 }}
              placeholder="Placeholder"
              fullWidth
              type="password"
              margin="normal"
              onChange={onChange}
              InputLabelProps={{
                shrink: true
              }}
            />
            {errPassword && (
              <FormHelperText
                id="password"
                style={{
                  color: "red",
                  marginLeft: "0.5rem",
                  marginTop: "0px",
                  lineHeight: "12px"
                }}
              >
                {errs.password}
              </FormHelperText>
            )}
            <DialogActions>
              <Button type="submit" color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default withRouter(AlertDialogSlide);
