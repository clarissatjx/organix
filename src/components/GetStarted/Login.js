import { React, useState, useEffect } from "react";
import logo_green from "../../images/logo_green.png";
import { Button, Checkbox } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import google from "../../images/google.webp";
import placeholderimg from "../../images/placeholderimg.jpg";
import { useUser } from "../../context/user";
import { Navigate, useNavigate } from "react-router-dom"; // Import Redirect
import {
  get,
  getDocumentRef,
  logInWithEmail,
  googleSignUp,
} from "../../firebase";

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
  const { username, setUsername, isLoggedIn, setIsLoggedIn } = useUser();
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Redirect to home if username is set (user is logged in)
  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn); // Log the value of isLoggedIn
    if (isLoggedIn) {
      navigate("/"); // Redirect to home if logged in
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async () => {
    try {
      if (!username) {
        alert("Please enter a username.");
        return;
      }

      const userDocRef = getDocumentRef(username, "users");
      const userDocSnapshot = await get(userDocRef);

      if (!userDocSnapshot.exists()) {
        alert("Username does not exist");
        return;
      }

      const { email } = userDocSnapshot.data();

      await logInWithEmail(email, password);

      alert("User logged in successfully!");
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignUp();
      const googleUserEmail = result.user.email;

      const derivedUsername = googleUserEmail.split("@")[0];

      setUsername(derivedUsername);

      const userDocRef = getDocumentRef(derivedUsername, "users");
      const userDocSnapshot = await get(userDocRef);

      if (userDocSnapshot.exists()) {
        setUsername(derivedUsername);
        const userData = userDocSnapshot.data();
        console.log("User data:", userData);
        alert("Logged in with Google successfully!");
        setIsLoggedIn(true);
      } else {
        alert("User data not found! Please create an account.");
      }
    } catch (error) {
      console.error("Error logging in with Google:", error);
      alert(error.message);
    }
  };

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
              <input
                className="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="rememberme-forgotpassword">
              <Checkbox
                color="#303030"
                className="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <p className="rememberme">Remember me</p>
              <a className="forgotpassword" href="">
                Forgot password?
              </a>
            </div>
            <Button variant="contained" color="ochre" onClick={handleLogin}>
              Login
            </Button>
            <div className="redirect-signup">
              <p>Don't have an account?</p>
              <a href="signup">Register</a>
            </div>
            <span className="or">
              <p className="ortext">or</p>
            </span>
            <Button
              variant="contained"
              color="google"
              className="google"
              onClick={handleGoogleLogin}
            >
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
