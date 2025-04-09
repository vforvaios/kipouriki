import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { setLoginUser } from "../models/actions/loginActions";

const Login = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
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
        // @ts-ignore
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
          <OutlinedInput
            className="login-input"
            onChange={(e) =>
              setLoginFormState({ ...loginFormState, username: e.target.value })
            }
            placeholder="Όνομα χρήστη"
            // @ts-ignore
            variant="outlined"
            required
            fullWidth
            id="username"
            name="username"
            value={loginFormState.username}
            autoFocus
          />
          <OutlinedInput
            onChange={(e) =>
              setLoginFormState({ ...loginFormState, password: e.target.value })
            }
            placeholder="Κωδικός"
            className="login-input"
            // @ts-ignore
            variant="outlined"
            required
            fullWidth
            name="password"
            type={!showPassword ? "password" : "text"}
            value={loginFormState.password}
            id="password"
            autoComplete="current-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Button
            type="submit"
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
