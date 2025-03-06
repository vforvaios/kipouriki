import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

import { setLoginUser } from "../models/actions/loginActions";

const Login = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loginFormState, setLoginFormState] = useState({
    username: "",
    password: "",
  });

  const handleLoginForm = async () => {
    try {
      setLoading(true);
      const credentials = loginFormState;
      const promiseResult = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ ...credentials }),
        }
      );
      const result = await promiseResult.json();

      if (result.error) {
        enqueueSnackbar(result.error, { variant: "error" });
      } else {
        dispatch(setLoginUser(result));
        enqueueSnackbar("Γεια σου Θοδωρή!", { variant: "success" });
        handleClose();
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
      console.log(error);
    } finally {
      setLoading(false);
    }
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
            type="button"
            disabled={loading}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleLoginForm()}
          >
            {!loading ? "ΕΙΣΟΔΟΣ" : <strong>Φορτώνει...</strong>}
          </Button>
        </form>
      </div>
    </Dialog>
  );
};

export default Login;
