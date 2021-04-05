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
    alignContent: "flex-start",
    alignItems: "center",
    "@media (max-width:480px)": {
      alignItems: "center",
    },
  },

  title: {
    fontWeight: "bold",
    lineHeight: 1,
    fontSize: 50,
    textAlign: "center",
    paddingBottom: 9,
    paddingTop: 25,
    "@media (max-width:480px)": {
      fontSize: 35,
      paddingTop: 0,
      marginTop: "5vh",
    },
  },
  description: {
    fontSize: 30,
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
    paddingBottom: 45,
    "@media (max-width:480px)": {
      height: "40vh",
      paddingBottom: "5vh",
    },
  },
  signInText: {
    color: "#838181",
    fontSize: 28,
    "@media (max-width:480px)": {
      fontSize: 14,
    },
  },
  link: {
    color: "#838181",
    fontSize: 28,
    fontWeight: "bold",
    "@media (max-width:480px)": {
      fontSize: 14,
    },
  },
  button: {
    backgroundColor: "#FEBD7D",
    borderRadius: 60,
    marginBottom: "1vh",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 30,
    textTransform: "capitalize",
    padding: "1vw 6vh",
    "@media (max-width:480px)": {
      fontSize: 20,
      padding: "2vw 3vh",
    },
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
          <Grid container direction='column' alignItems='center'>
            <Typography className={classes.title}> Welcome to Pinocchio</Typography>
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
        </>
      )}
    </Grid>
  );
}

export default LandingPage;
