import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import AuthContext from "../../context/auth/authContext";
import { withRouter } from "react-router-dom";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    height: "80vh",
    display: "grid",
    placeItems: "center"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const Signup = ({ history, location }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errs, setErrs] = useState();
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  const {
    signupUser,
    isAuthenticated,
    err: { errors }
  } = authContext;
  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    setErrs();
    e.preventDefault();
    signupUser(user, history);
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
        if (errors[i].param === "password") {
          err.password = errors[i].msg;
        }
      }
      setErrs(err);
    }
  }, [errors]);

  useEffect(() => {
    if (isAuthenticated) {
      if (location.pathname.split("/").includes("signup")) {
        history.push("/");
      }
    }
  }, [isAuthenticated]);

  const errName = Boolean(errs && errs.name);
  const errEmail = Boolean(errs && errs.email);
  const errPassword = Boolean(errs && errs.password);

  return (
    <Grid container spacing={3} className={classes.container}>
      <Grid item xs={10} sm={6} md={6} lg={4}>
        <form
          onSubmit={handleSubmit}
          className={classes.container}
          noValidate
          autoComplete="off"
        >
          <Paper className={classes.paper}>
            <TextField
              error={errName}
              id="name"
              name="name"
              label="Name"
              placeholder="Enter name..."
              //   value={name}
              //   inputRef={nameRef}
              fullWidth
              margin="normal"
              onChange={onChange}
              InputLabelProps={{
                shrink: true
              }}
            />
            {errName && (
              <FormHelperText
                id="email"
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
              placeholder="Enter email..."
              //   value={name}
              //   inputRef={nameRef}
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
              placeholder="Enter password..."
              //   value={name}
              // inputRef={nameRef}
              fullWidth
              margin="normal"
              onChange={onChange}
              InputLabelProps={{
                shrink: true
              }}
            />
            {errPassword && (
              <FormHelperText
                id="email"
                style={{ color: "red", marginLeft: "0.5rem", marginTop: "0px" }}
              >
                {errs.password}
              </FormHelperText>
            )}
            <Divider variant="middle" style={{ margin: "1rem 0" }} />
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
              color="primary"
            >
              Signup
            </Button>
          </Paper>
        </form>
      </Grid>
    </Grid>
  );
};

export default withRouter(Signup);
