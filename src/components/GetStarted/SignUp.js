import {React, useState, useEffect} from "react";
import logo_green from "../../images/logo_green.png";
import { Button, Checkbox } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import google from "../../images/google.webp";
import placeholderimg from "../../images/placeholderimg.jpg";
import {
  signUpWithEmail,
  googleSignUp,
  createCollection,
  getDocumentRef,
  set,
  get,
  add,
} from "../../firebase";
import { useUser } from "../../context/user";
import moment from "moment";
import { Navigate, useNavigate } from "react-router-dom"; // Import Redirect

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
  const { username, setUsername, isLoggedIn, setIsLoggedIn } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn); // Log the value of isLoggedIn
    if (isLoggedIn) {
      navigate("/"); // Redirect to home if logged in
    }
  }, [isLoggedIn, navigate]);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await signUpWithEmail(email, password);

      setUsername(username);

      // Reference to the user document with username as the document ID
      const userDocRef = getDocumentRef(username, "users");
      const userDocSnapshot = await get(userDocRef);
      
      if (userDocSnapshot.exists()) {
        alert("Username already taken, please choose another one");
        return;
      }

      // Add the user's email and username to the Firestore users collection
      await set(userDocRef, {
        email: email,
        username: username,
      });

      // Create the subcollections for tasks and labels
      const labelsCollectionRef = createCollection(userDocRef, "labels");
      const tasksCollectionRef = createCollection(userDocRef, "tasks");

      // Add a dummy label in the labels subcollection (e.g., "misc")
      await add(labelsCollectionRef, {
        name: "misc",
      });

      // Get today's date and time using moment.js
      const today = moment().format("DD/MM/YYYY");
      const currentTime = moment().format("HH:mm A");
      const todayDay = moment().format("d");

      // Add a dummy task in the tasks subcollection
      await add(tasksCollectionRef, {
        checked: false,
        date: today,
        day: todayDay,
        label: "misc",
        text: "Go for a run",
        time: currentTime,
      });

      alert("User signed up successfully! Please log in again.");
    } catch (error) {
      console.error("Error signing up:", error);
      alert(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await googleSignUp();

      const googleUserEmail = result.user.email;

      let derivedUsername = googleUserEmail.split("@")[0];

      setUsername(derivedUsername);

      const userDocRef = getDocumentRef(username, "users");

      await set(userDocRef, {
        email: googleUserEmail,
        username: username,
      });

      const labelsCollectionRef = createCollection(userDocRef, "labels");
      const tasksCollectionRef = createCollection(userDocRef, "tasks");

      await add(labelsCollectionRef, {
        name: "misc",
      });

      const today = moment().format("DD/MM/YYYY"); // Date in the format DD/MM/YYYY
      const currentTime = moment().format("HH:mm"); // Current time
      const todayDay = moment().format("D"); // Numerical day of the month (e.g., "5")

      await add(tasksCollectionRef, {
        checked: false,
        date: today,
        day: todayDay,
        label: "misc",
        text: "Go for a run",
        time: currentTime,
      });

      alert("User signed up with Google successfully! Please log in.");
    } catch (error) {
      console.error("Error signing up with Google:", error);
      alert(error.message);
    }
  };

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
              <input
                className="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="confirm-password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="rememberme-forgotpassword">
              <Checkbox color="#303030" className="checkbox" />
              <p className="rememberme">I agree to the terms & conditions</p>
            </div>
            <Button variant="contained" color="ochre" onClick={handleSignUp}>
              Sign Up
            </Button>
            <div className="redirect-signup">
              <p>Already have an account?</p>
              <a href="/login">Log in</a>
            </div>
            <span className="or">
              <p className="ortext">or</p>
            </span>
            <Button
              variant="contained"
              color="google"
              className="google"
              onClick={handleGoogleSignUp}
            >
              <img src={google} alt="google" />
              <p>Sign up with Google</p>
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default SignUp;
