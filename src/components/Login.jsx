import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import { useDispatch } from "react-redux";

const Login = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [loginFormState, setLoginFormState] = useState({
    username: "",
    password: "",
  });

  const handleLoginForm = () => {
    const credentials = loginFormState;
    console.log(credentials);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="login-popup-container">
        <Avatar>Hi</Avatar>
        <Typography component="h1" variant="h5">
          Είσοδος στο σύστημα
        </Typography>
        <form noValidate className="login-form">
          <TextField
            onChange={(e) =>
              setLoginFormState({ ...loginFormState, username: e.target.value })
            }
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Όνομα χρήστη"
            name="username"
            value={loginFormState.username}
            autoFocus
          />
          <TextField
            onChange={(e) =>
              setLoginFormState({ ...loginFormState, password: e.target.value })
            }
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Κωδικός"
            type="password"
            value={loginFormState.password}
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleLoginForm()}
          >
            ΕΙΣΟΔΟΣ
          </Button>
        </form>
      </div>
    </Dialog>
  );
};

export default Login;
