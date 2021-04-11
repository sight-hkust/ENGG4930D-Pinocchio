import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  useMediaQuery,
  InputBase,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import NextButton from "../../components/NextButton";
import arrowLeftImage from "../../assets/arrowLeft.png";
import loginLogo from "../../assets/loginLogo.png";

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    lineHeight: 1,
    fontSize: 100,
    textAlign: "center",
    "@media (max-width:480px)": {
      fontSize: 35,
      marginTop: "5vh",
    },
  },
  description: {
    fontSize: 25,
    textAlign: "center",
    margin: 0,
    color: "#838181",
    "@media (max-width:480px)": {
      fontSize: 20,
      paddingTop: "2vh",
    },
  },
  button: {
    width: 95,
    height: 77,
    backgroundColor: "#3C79B0",
    color: "#FFFFFF",
    borderRadius: "15px",
    alignSelf: "flex-end",
    "&:hover": {
      backgroundColor: "#3C79B0",
    },
    "@media (max-width:480px)": {
      width: 45,
      height: 36,
      minWidth: 45,
      padding: "6px 6px",
    },
  },
  inputForm: {
    padding: "49px 69px 0px",
  },
  errorMessage: {
    color: "#FF0000",
    fontSize: 14,
    textAlign: "end",
  },
  inputLabel: {
    color: "#838181",
    textAlign: "left",
    fontSize: 14,
  },
  input: {
    backgroundColor: "#EAEAEA",
    padding: "8px 12px",
    marginBottom: 18,
  },
}));

function LoginPage() {
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:480px)");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.push("/home");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        return;
      } else {
        login();
      }
    });
  };

  const login = () =>
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return firebase
          .auth()
          .signInWithEmailAndPassword(email.trim(), password.trim())
          .then((userCredential) => {
            var user = userCredential.user;
            var myStorage = window.sessionStorage;
            myStorage.setItem("userUID", user.uid);
            setUsername(user.displayName);
            setLoginError(false);
          })
          .catch((error) => setLoginError(error));
      })
      .catch((error) => {
        console.log(error);
      });

  return (
    <Grid
      container
      className={classes.container}
      direction='column'
      alignItems='center'
    >
      <IconButton
        style={{ alignSelf: "flex-start", paddingLeft: 22, paddingTop: 22 }}
        onClick={() => history.goBack()}
      >
        <img alt='arrowLeft' src={arrowLeftImage} />
      </IconButton>
      <Typography className={classes.title}>Welcome back!</Typography>
      <Typography className={classes.description}>
        we’re happy you come back to us 💜
      </Typography>
      <Grid container item className={classes.inputForm} direction='column'>
        <Typography className={classes.inputLabel}>ITSC Email</Typography>
        <InputBase
          className={classes.input}
          autoComplete='email'
          autoFocus
          inputProps={{ autoCapitalize: "none" }}
          onChange={(e) => setEmail(e.target.value)}
        ></InputBase>
        <Typography className={classes.inputLabel}>Your secret word</Typography>
        <InputBase
          className={classes.input}
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge='end'
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        ></InputBase>
        {loginError && (
          <Typography className={classes.errorMessage}>
            Incorrect Email or Password😕
          </Typography>
        )}
        <NextButton onClick={handleClick} />
      </Grid>
      <img
        alt=''
        src={loginLogo}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          height: "35vh",
          zIndex: -1,
        }}
      />
    </Grid>
  );
}

export default LoginPage;
