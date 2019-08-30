import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Contacts from "../contacts/Contacts";

const Home = () => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = axios.get("/api/users");
  //     console.log(res);
  //   };
  //   fetchData();
  // }, []);
  return (
    <div>
      <h1>Home</h1>
      <Contacts />
    </div>
  );
};

export default Home;
