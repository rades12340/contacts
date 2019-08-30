import React, { useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Container from "@material-ui/core/Container";
import NavBar from "./components/layout/NavBar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContactState from "./context/contact/ContactState";

const App = () => {
  return (
    <ContactState>
      <Router>
        <div className="App">
          <NavBar />
          <Container maxWidth="md">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" exact component={About} />
            </Switch>
          </Container>
        </div>
      </Router>
    </ContactState>
  );
};

export default App;
