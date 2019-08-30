import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ContactPhone from "@material-ui/icons/ContactPhone";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  }
}));

const NavBar = () => {
  const classes = useStyles();
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
            <ContactPhone />
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
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
