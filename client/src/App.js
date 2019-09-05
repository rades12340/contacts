import React, { useEffect, useContext } from "react";
import "./App.css";
import Axios from "axios";
import Container from "@material-ui/core/Container";
import NavBar from "./components/layout/NavBar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import userContext from "./context/user/userContext";
import authContext from "./context/auth/authContext";
import ContactState from "./context/contact/ContactState";
import UserState from "./context/user/UserState";
import Modal from "./util/Modal";
import setAuthToken from "./util/SetAuthToken";
import jwtDecode from "jwt-decode";
import axios from "axios";

const App = () => {
  const authcontext = useContext(authContext);

  const { isAuthenticated, setCurrentUser, logoutUser, user } = authcontext;

  useEffect(() => {
    const fetchData = () => {
      setAuthToken(localStorage.jwtToken);
      // Decode token and get user info and exp
      const decoded = jwtDecode(localStorage.jwtToken);
      //Set user and isAuthnticated
      setCurrentUser(decoded);

      // Check for expired token
      const currentTime = Date.now() / 1000;
      console.log(decoded.exp - currentTime);
      if (decoded.exp < currentTime) {
        // Logout user
        logoutUser();
      }
    };
    if (localStorage.jwtToken) {
      fetchData();
    }
  }, []);

  return (
    <ContactState>
      <UserState>
        <Router>
          <div className="App">
            <Modal />
            <NavBar />
            <Container maxWidth="md">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={About} />
              </Switch>
            </Container>
          </div>
        </Router>
      </UserState>
    </ContactState>
  );
};

export default App;
