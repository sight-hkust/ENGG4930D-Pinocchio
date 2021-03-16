import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, useMediaQuery, Snackbar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import backgroundImage from "../../assets/signupPageBackground.png";
import mobileBackgroundImage from "../../assets/signupMobileBg.png";
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
      backgroundSize: "contain",
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
  inputForm: {
    display: "flex",
    marginTop: "10vh",
    marginLeft: "5vw",
    alignItems: "flex-start",
    "@media (max-width:480px)": {
      marginTop: 0,
      alignItems: "flex-start",
      marginLeft: 22,
      marginRight: 108,
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
      marginLeft: 15,
      fontSize: 12,
    },
  },
  confirmContainer: {
    marginLeft: "10vw",
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

function SignUpPage() {
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:480px)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const emailRegex = /.+@.*ust.hk$/gm;
  const passwordRegex = /^.{8,}$/gm;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAccountCreated(false);
  };

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
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            setAccountCreated(true);
            var user = userCredential.user;
            firebase.firestore().collection("users").doc(user.uid).set(
              {
                email: user.email,
                emailVerified: user.emailVerified,
                isAdmin: true,
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
            console.log("ERROR_ACCOUNT_CREATE", error);
          });
      signUp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailError, passwordError]);

  return (
    <Grid container className={classes.container}>
      <NavigationBar />
      <Grid container item direction='column' className={classes.inputForm}>
        <Typography className={classes.title}>{`DEAR\nDREAMER,`}</Typography>
        <Typography className={classes.description}>
          come and join us💜
        </Typography>
        <Input
          size={isMobile ? "small" : "medium"}
          label='FULL ITSC EMAIL ADDRESS'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          style={{
            marginBottom: emailError ? 0 : 26,
          }}
        ></Input>
        {emailError && (
          <Typography className={classes.errorMessage}>
            Please use a ITSC Email Address😉
          </Typography>
        )}
        <Input
          size={isMobile ? "small" : "medium"}
          label='SECRET WORD'
          isPassword={true}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          style={{
            marginBottom: passwordError ? 0 : 26,
          }}
        ></Input>
        {passwordError && (
          <Typography className={classes.errorMessage}>
            Secret word is too short😳 Use {">"}= 8 characters
          </Typography>
        )}
        <Grid container className={classes.confirmContainer}>
          {isMobile ? (
            <>
              <NextButton onClick={handleClick} />
              <Typography className={classes.startMyJourneyText}>
                start my journey
              </Typography>
            </>
          ) : (
            <>
              <Typography className={classes.startMyJourneyText}>
                start my journey
              </Typography>
              <NextButton onClick={handleClick} />
            </>
          )}
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={accountCreated}
        onClose={handleClose}
        autoHideDuration={9000}
        message='Verify your ITSC email address now to talk in the forum!'
        ContentProps={{ style: { backgroundColor: "#3546a2" } }}
      />
    </Grid>
  );
}

export default SignUpPage;
