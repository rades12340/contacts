import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";


const Home = () => {
  return (
    <Grid container spacing={3} style={{ paddingTop: 20 }}>
      <Grid item xs={12} sm={6} md={8}>
        <ContactForm />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Contacts />
      </Grid>
    </Grid>
  );
};

export default Home;
