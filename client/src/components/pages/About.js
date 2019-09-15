import React from "react";
import Typography from "@material-ui/core/Typography";

const Login = () => {
  return (
    <div>
      <Typography variant="h2">About This App</Typography>
      <Typography variant="subtitle1" m={5}>
        This is a full stack React app for keeping contacts
      </Typography>
      <Typography variant="subtitle1">
        <strong>Version: </strong> 1.0.0
      </Typography>
    </div>
  );
};

export default Login;
