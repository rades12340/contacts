import React, { useContext } from "react";

import Grid from "@material-ui/core/Grid";

import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import AuthContext from "../../context/auth/authContext";
import HomePage from "./homePage";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  return (
    <Grid container spacing={3} style={{ paddingTop: 20 }}>
      <Grid item xs={12} sm={6} md={8}>
        {isAuthenticated && <ContactForm />}
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Contacts />
      </Grid>
    </Grid>
  );
};

export default Home;
