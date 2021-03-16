import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, useMediaQuery, Snackbar } from "@material-ui/core";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import backgroundImage from "../../assets/loginPageBackground.png";
import mobileBackgroundImage from "../../assets/loginMobileBg.png";
import NavigationBar from "../../components/NavigationBar";
import Input from "../../components/Input";
import NextButton from "../../components/NextButton";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    alignContent: "flex-start",
    contain: "content",
    "@media (max-width:480px)": {
      backgroundImage: `url(${mobileBackgroundImage})`,
      backgroundPosition: "bottom",
    },
  },
  title: {
    fontFamily: "Times",
    fontWeight: "bold",
    fontSize: 60,
    lineHeight: "normal",
    textAlign: "center",
    "@media (max-width:480px)": {
      fontSize: 50,
      wordWrap: "break-word",
      textAlign: "left",
    },
  },
  description: {
    fontFamily: "Roboto",
    fontSize: 30,
    textAlign: "center",
    margin: 0,
    paddingBottom: 21,
    marginRight: 35,
    "@media (max-width:480px)": {
      fontSize: 15,
      textAlign: "left",
      paddingBottom: 8,
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
    display: "flex",
    alignContent: "flex-end",
    marginTop: 50,
    marginRight: 108,
    alignItems: "flex-end",
    "@media (max-width:480px)": {
      marginTop: 0,
      alignItems: "flex-start",
      marginLeft: 22,
    },
  },
  startMyJourneyText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#3C79B0",
    letterSpacing: "0.14em",
    paddingRight: 28,
    alignSelf: "center",
    "@media (max-width:480px)": {
      marginLeft: 26,
      fontSize: 12,
    },
  },
  confirmContainer: {
    justifyContent: "flex-end",
    "@media (max-width:480px)": {
      justifyContent: "flex-start",
      display: "flex",
    },
  },
  errorMessage: {
    color: "#FF0000",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 6,
    marginBottom: 6,
  },
}));

function LoginPage() {
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:480px)");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.push("/home");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setLoggedIn(false);
  };

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
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            var user = userCredential.user;
            setUsername(user.displayName);
            setLoggedIn(true);
            setLoginError(false);
          })
          .catch((error) => setLoginError(error));
      })
      .catch((error) => {
        console.log(error);
      });

  return (
    <Grid container className={classes.container}>
      <NavigationBar />
      <Grid container item direction='column' className={classes.inputForm}>
        <Typography className={classes.title}>
          WELCOME {isMobile && <br />}
          BACK,
        </Typography>
        <Typography className={classes.description}>
          we’re happy you came back to us💜
        </Typography>
        <Input
          size={isMobile ? "small" : "medium"}
          label='FULL ITSC EMAIL ADDRESS'
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          size={isMobile ? "small" : "medium"}
          label='SECRET WORD'
          isPassword={true}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            marginBottom: loginError ? 0 : 26,
          }}
        ></Input>
        {loginError && (
          <Typography className={classes.errorMessage}>
            Your email address or secret word is wrong😕
          </Typography>
        )}
        <Grid container className={classes.confirmContainer}>
          <NextButton onClick={handleClick} />
          <Typography className={classes.startMyJourneyText}>
            start my journey
          </Typography>
        </Grid>
      </Grid>
      <Snackbar
        open={loggedIn}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        autoHideDuration={9000}
        message={`Welcome, ${username}!`}
        ContentProps={{ style: { backgroundColor: "#3546a2" } }}
      />
    </Grid>
  );
}

export default LoginPage;
