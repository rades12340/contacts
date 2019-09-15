import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import userContext from "../../context/user/userContext";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import homePage from "./homePage.css";

const HomePage = () => {
  const usercontext = useContext(userContext);
  const { handleClickOpen } = usercontext;
  return (
    <>
      <div className="cover"></div>
      <div className="homePage">
        <Typography variant="h3" m={5}>
          This is a home page of Contact Keeper app. You should authenticate to
          be able to use it.
        </Typography>
        <div className="links">
          <Button
            variant="contained"
            component={Link}
            color="primary"
            to="/signup"
          >
            Signup
          </Button>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
