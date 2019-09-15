import React, { useEffect, useContext } from "react";
import "./App.css";

import Container from "@material-ui/core/Container";
import NavBar from "./components/layout/NavBar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import authContext from "./context/auth/authContext";
import ContactState from "./context/contact/ContactState";
import UserState from "./context/user/UserState";
import Modal from "./util/Modal";
import setAuthToken from "./util/SetAuthToken";
import jwtDecode from "jwt-decode";
import Signup from "./components/pages/Signup";
import HomePage from "./components/pages/homePage";

const App = () => {
  const authcontext = useContext(authContext);

  const { setCurrentUser, logoutUser, isAuthenticated } = authcontext;

  useEffect(() => {
    const fetchData = () => {
      setAuthToken(localStorage.jwtToken);
      // Decode token and get user info and exp
      const decoded = jwtDecode(localStorage.jwtToken);
      //Set user and isAuthnticated
      setCurrentUser(decoded);

      // Check for expired token
      const currentTime = Date.now() / 1000;

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
                {isAuthenticated ? (
                  <Route path="/" exact component={Home} />
                ) : (
                  <Route path="/" exact component={HomePage} />
                )}
                <Route path="/about" exact component={About} />
                <Route path="/signup" exact component={Signup} />
              </Switch>
            </Container>
          </div>
        </Router>
      </UserState>
    </ContactState>
  );
};

export default App;
