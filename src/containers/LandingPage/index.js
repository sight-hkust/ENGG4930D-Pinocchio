import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, useMediaQuery } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import backgroundImage from "../../assets/landingPageBackground.png";
import mobileBackgroundImage from "../../assets/landingMobileBg.png";
import landingPinocchio from "../../assets/landingPinocchio.png";
import NavigationBar from "../../components/NavigationBar";
import TextButton from "../../components/TextButton";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
    background: "center",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    alignContent: "flex-start",
    alignItems: "center",
    contain: "content",
    "@media (max-width:480px)": {
      backgroundImage: `url(${mobileBackgroundImage})`,
      alignItems: "center",
    },
  },
  title: {
    fontFamily: "Times",
    fontWeight: "bold",
    lineHeight: 1,
    fontSize: 100,
    "@media (max-width:480px)": {
      fontSize: 50,
      marginTop: 63,
    },
  },
  description: {
    fontFamily: "Roboto",
    fontSize: 25,
    textAlign: "center",
    margin: 0,
    paddingBottom: 21,
    "@media (max-width:480px)": {
      fontSize: 12,
      paddingBottom: 0,
    },
  },
  landingPinocchio: {
    display: "flex",
    height: "55vh",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width:480px)": {
      height: "80vw",
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
          <NavigationBar />
          <Typography className={classes.title}>PINOCCHIO</Typography>
          <Typography className={classes.description}>
            : a supportive community built just for our dreamers
          </Typography>
          <img
            src={landingPinocchio}
            alt='Logo'
            className={classes.landingPinocchio}
          ></img>
          <TextButton text='SIGN UP' onClick={() => history.push("/signup")} />
          <TextButton text='LOGIN' onClick={() => history.push("/login")} />
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
