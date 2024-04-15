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
import { signUpAdminUser } from "../../Service/Api/User";

function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      };
      const res = await signUpAdminUser(payload)
      if(res.status == 200){
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e, type) => {
    const value = e.target.value;
    if (type === "first_name") {
      setFirstName(value);
    } else if (type === "last_name") {
      setLastName(value);
    } else if (type === "email") {
      setEmail(value);
    } else if (type === "password") {
      setPassword(value);
    } else if (type === "confirm_pass") {
      setConfirmPassword(value);
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign up
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
              id="first_name"
              label="Frist Name"
              name="first_name"
              autoComplete="first_name"
              autoFocus
              value={firstName}
              onChange={(e) => handleChange(e, "first_name")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="last_name"
              label="Last Name"
              name="last_name"
              autoComplete="last_name"
              autoFocus
              value={lastName}
              onChange={(e) => handleChange(e, "last_name")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              type="email"
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirm_pass"
              label="Confirm Password"
              name="confirm_pass"
              autoComplete="confirm_pass"
              autoFocus
              value={confirmPassword}
              onChange={(e) => handleChange(e, "confirm_pass")}
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
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Do have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
