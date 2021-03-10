import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  useMediaQuery,
  Card,
  Button,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
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
    contain: "content",
    "@media (max-width:480px)": {
      backgroundImage: `url(${mobileBackgroundImage})`,
    },
    alignItems: "center",
  },
  title: {
    fontFamily: "Times",
    fontWeight: "bold",
    lineHeight: 1,
    fontSize: 100,
    "@media (max-width:600px)": {
      fontSize: 50,
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
    },
  },
  landingPinocchio: {
    display: "flex",
    height: "50vh",
    "@media (max-width:480px)": {
      height: "70vw",
      marginTop: "10vh",
    },
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
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
  const [open, setOpen] = useState(false);
  let deferredPrompt;

  const handleClick = () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    setOpen(true);
  });

  window.addEventListener("appinstalled", () => {
    setOpen(false);
    deferredPrompt = null;
    console.log("PWA was installed");
  });

  return (
    <Grid container className={classes.container}>
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
        <TextButton text='SIGN UP' onClick={() => history.push("/signup")} />
        {isMobile && open && (
          <Card className={classes.appInstallBanner}>
            <CardContent style={{ paddingBottom: 4 }}>
              <Typography style={{ fontSize: 18 }}>
                Online Mental Health Forum For USTers!
              </Typography>
            </CardContent>
            <CardActions>
              <Grid container direction='column' alignContent='center'>
                <Button
                  style={{
                    backgroundColor: "white",
                    borderRadius: 20,
                    width: 100,
                  }}
                  onClick={handleClick}
                >
                  Install
                </Button>
                <Button
                  style={{
                    marginTop: 8,
                    color: "rgba(0, 0, 0, 0.5)",
                    borderRadius: 20,
                    width: 100,
                  }}
                  onClick={handleClose}
                >
                  Not now
                </Button>
              </Grid>
            </CardActions>
          </Card>
        )}
      </Grid>
    </Grid>
  );
}

export default LandingPage;
