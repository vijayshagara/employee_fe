import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { loginAdminUser } from "../../Service/Api/User";
import { setToken } from "../../Service/Storage/storage";
import { useContext, useEffect } from "react";
import StateContext from "../contexts/StateContext";
import DispatchContext from "../contexts/DispatchContext";
import Loader from "../Loader/Loader";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const appDispatch = useContext(DispatchContext);
  const [isLoader, setIsLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoader(true);
    try {
      const res = await loginAdminUser({ email, password });
      if (res.status === 200) {
        setToken(res.data.token);
        appDispatch({ type: "login", value: res.data.token });
        navigate("/home");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoader(false);
    }
  };

  const handleChange = (e, type) => {
    const value = e.target.value;
    if (type === "email") {
      setEmail(value);
    } else if (type === "password") {
      setPassword(value);
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {isLoader ? (
          <Loader /> 
        ) : (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => handleChange(e, "email")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => handleChange(e, "password")}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
