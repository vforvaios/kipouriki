import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  size: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  paper: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "300px",
  },
  avatar: {
    margin: "4px 10px",
    backgroundColor: "white",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "4px",
  },
  submit: {
    margin: "4px 10px",
  },
}));

const Login = ({ open, handleClose }) => {
  const classes = useStyles();

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className={classes.paper}>
        <Avatar>Hi</Avatar>
        <Typography component="h1" variant="h5">
          Είσοδος στο σύστημα
        </Typography>
        <form noValidate className={classes.form}>
          <TextField
            onChange={() => {}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
          />
          <TextField
            onChange={() => {}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {}}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Dialog>
  );
};

export default Login;
