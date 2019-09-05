import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ContactPhoneTwoToneIcon from "@material-ui/icons/ContactPhoneTwoTone";
import userContext from "../../context/user/userContext";
import authContext from "../../context/auth/authContext";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  },
  avatar: {
    margin: 4
  }
}));

const NavBar = () => {
  const classes = useStyles();

  const usercontext = useContext(userContext);
  const authcontext = useContext(authContext);

  const { handleClickOpen } = usercontext;
  const { isAuthenticated, user, logoutUser } = authcontext;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <ContactPhoneTwoToneIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Contact Keeper
          </Typography>

          <Button variant="text" component={Link} color="inherit" to="/">
            Home
          </Button>
          <Button variant="text" component={Link} color="inherit" to="/about">
            About
          </Button>
          {isAuthenticated ? (
            <Button color="inherit" onClick={logoutUser}>
              <Avatar className={classes.avatar}>H</Avatar>
            </Button>
          ) : (
            <Button color="inherit" onClick={handleClickOpen}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
