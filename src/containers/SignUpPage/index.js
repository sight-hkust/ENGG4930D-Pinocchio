import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  useMediaQuery,
  IconButton,
  InputBase,
  InputAdornment,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import NextButton from "../../components/NextButton";
import arrowLeftImage from "../../assets/arrowLeft.png";
import signupLogo from "../../assets/signupLogo.png";

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

function SignUpPage() {
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:480px)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const emailRegex = /.+@.*ust.hk$/gm;
  const passwordRegex = /^.{8,}$/gm;

  const handleClick = () => {
    if (!emailRegex.test(email)) {
      setEmail("");
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (!passwordRegex.test(password)) {
      setPassword("");
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  useEffect(() => {
    if (email && password && !emailError && !passwordError) {
      const signUp = () =>
        firebase
          .auth()
          .createUserWithEmailAndPassword(email.trim(), password.trim())
          .then((userCredential) => {
            setAccountCreated(true);
            var user = userCredential.user;
            firebase.firestore().collection("users").doc(user.uid).set(
              {
                email: user.email,
                emailVerified: user.emailVerified,
                isAdmin: false,
              },
              { merge: true }
            );
            user
              .sendEmailVerification()
              .then(() => history.push("/interests"))
              .catch((error) => {
                console.log("ERROR_EMAIL_VERIFY", error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      signUp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailError, passwordError]);

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
      <Typography className={classes.title}>Let’s get started!</Typography>
      <Typography className={classes.description}>
        come and join us💜
      </Typography>
      <Grid container item direction='column' className={classes.inputForm}>
        <Typography className={classes.inputLabel}>ITSC Email</Typography>
        <InputBase
          className={classes.input}
          autoComplete='email'
          autoFocus
          inputProps={{ autoCapitalize: "none" }}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></InputBase>
        <Typography className={classes.inputLabel}>Your secret word</Typography>
        <InputBase
          className={classes.input}
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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

        {passwordError && (
          <Typography className={classes.errorMessage}>
            Secret word is too short😳 Use {">"}= 8 characters
          </Typography>
        )}
        {emailError && (
          <Typography className={classes.errorMessage}>
            Please use ITSC account{" eg. xxxxxxxx@connect.ust.hk"}
          </Typography>
        )}
        <NextButton onClick={() => handleClick()} />
      </Grid>
      {/* <img
        alt=''
        src={signupLogo}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          height: "35vh",
          zIndex: -1,
        }}
      /> */}
    </Grid>
  );
}

export default SignUpPage;
