import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  useMediaQuery,
  Button,
  Link,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import landingPinocchio from "../../assets/landingPinocchio.png";
import NavigationBar from "../../components/NavigationBar";
import TextButton from "../../components/TextButton";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
    alignContent: "flex-start",
    alignItems: "center",
    "@media (max-width:480px)": {
      alignItems: "center",
    },
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
    paddingBottom: 21,
    color: "#838181",
    "@media (max-width:480px)": {
      fontSize: 20,
      paddingTop: "2vh",
      paddingBottom: "5vh",
    },
  },
  landingPinocchio: {
    display: "flex",
    height: "55vh",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width:480px)": {
      height: "40vh",
      paddingBottom: "5vh",
    },
  },
  signInText: {
    color: "#838181",
    fontSize: 14,
  },
  link: {
    color: "#838181",
    fontWeight: "bold",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#FEBD7D",
    borderRadius: 50,
    marginBottom: "1vh",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    textTransform: "capitalize",
    padding: "2vw 3vh",
  },
  appInstallBanner: {
    position: "absolute",
    top: "80%",
    backgroundColor: "#FFCF25",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: "20vh",
    width: "100vw",
    textAlign: "center",
  },
}));

function LandingPage() {
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:480px)");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.push("/home");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container className={classes.container}>
      {isMobile ? (
        <Grid container direction='column' alignItems='center'>
          <NavigationBar showMenu />
          <Typography className={classes.title}>
            Welcome to Pinocchio
          </Typography>
          <Typography className={classes.description}>
            Start your journey with us
          </Typography>
          <img
            src={landingPinocchio}
            alt='Logo'
            className={classes.landingPinocchio}
          ></img>
          <Button
            className={classes.button}
            onClick={() => history.push("/signup")}
          >
            <Typography className={classes.buttonText}>Sign Up</Typography>
          </Button>
          <Typography className={classes.signInText}>
            Already have an account?
            <Link
              className={classes.link}
              onClick={() => history.push("/login")}
            >
              {" Sign In"}
            </Link>
          </Typography>
        </Grid>
      ) : (
        <>
          <NavigationBar />
          <Grid container direction='column' alignItems='center'>
            <img
              src={landingPinocchio}
              alt='Logo'
              className={classes.landingPinocchio}
            ></img>
            <Typography className={classes.title}>PINOCCHIO</Typography>
            <Typography className={classes.description}>
              : a supportive community built just for our dreamers
            </Typography>
            <TextButton
              text='SIGN UP'
              onClick={() => history.push("/signup")}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default LandingPage;
