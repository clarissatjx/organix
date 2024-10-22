import React from "react";
import logo_green from "../../images/logo_green.png";
import { Button, Checkbox } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import google from "../../images/google.webp";
import placeholderimg from "../../images/placeholderimg.jpg";

const theme = createTheme({
  palette: {
    ochre: {
      main: "#303030",
      contrastText: "#FAFAFA",
    },
    google: {
      main: "#FFFFFF",
      contrastText: "#000000",
    },
  },
});

function Login() {
  return (
    <ThemeProvider theme={theme}>
      <div className="Login">
        <div className="left">
          <div className="container">
            <div className="logo">
              <img src={logo_green} alt="logo" />
              <div className="logotext">rganix</div>
            </div>
            <div className="title">Log In</div>
            <div className="inputs">
              <input className="username" placeholder="Username" />
              <input className="password" placeholder="Password" />
            </div>
            <div className="rememberme-forgotpassword">
              <Checkbox color="#303030" className="checkbox" />
              <p className="rememberme">Remember me</p>
              <a className="forgotpassword" href="">
                Forgot password?
              </a>
            </div>
            <Button variant="contained" color="ochre">
              Login
            </Button>
            <div className="redirect-signup">
              <p>Don't have an account?</p>
              <a href="signup">Register</a>
            </div>
            <span className="or">
              <p className="ortext">or</p>
            </span>
            <Button variant="contained" color="google" className="google">
              <img src={google} />
              <p>Log in with Google</p>
            </Button>
          </div>
        </div>
        <div className="right">
          <div className="container">
            <div className="titles">
              <p className="header">We're so glad you're back</p>
              <p className="subheader">Let's get productive!</p>
            </div>
            <img src={placeholderimg} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Login;
