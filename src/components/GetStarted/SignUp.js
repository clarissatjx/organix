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

function SignUp() {
  return (
    <ThemeProvider theme={theme}>
      <div className="SignUp">
        <div className="left">
          <div className="container">
            <div className="titles">
              <p className="header">Get organised with Organix</p>
              <p className="subheader">Unlock the most productive you today.</p>
            </div>
            <img src={placeholderimg} />
          </div>
        </div>
        <div className="right">
          <div className="container">
            <div className="logo">
              <img src={logo_green} alt="logo" />
              <div className="logotext">rganix</div>
            </div>
            <div className="title">Sign Up</div>
            <div className="inputs">
              <input className="username" placeholder="Username" />
              <input className="email" placeholder="Email" />
              <input className="password" placeholder="Password" />
              <input
                className="confirm-password"
                placeholder="Confirm Password"
              />
            </div>
            <div className="rememberme-forgotpassword">
              <Checkbox color="#303030" className="checkbox" />
              <p className="rememberme">I agree to the terms & conditions</p>
            </div>
            <Button variant="contained" color="ochre">
              Sign Up
            </Button>
            <div className="redirect-signup">
              <p>Already have an account?</p>
              <a href="/login">Log in</a>
            </div>
            <span className="or">
              <p className="ortext">or</p>
            </span>
            <Button variant="contained" color="google" className="google">
              <img src={google} />
              <p>Sign up with Google</p>
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default SignUp;
