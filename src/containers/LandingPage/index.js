import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  useMediaQuery,
  Button,
  Link,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import landingPinocchio from "../../assets/landingPinocchio.png";
import NavigationBar from "../../components/NavigationBar";
import DialogBox from "../../components/DialogBox";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
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
    height: "45vh",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 45,
    "@media (max-width:480px)": {
      height: "40vh",
      paddingBottom: "5vh",
    },
  },
  linkText: {
    color: "#838181",
    fontSize: 28,
    padding: "5px 0",
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
}));

function LandingPage() {
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:480px)");
  const [showPrivacyTextDialog, setShowPrivacyTextDialog] = useState(false);
  const [showPWAInstallDialog, setShowPWAInstallDialog] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setShowPWAInstallDialog(true);
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);
    });
  }, []);

  const install = async () => {
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowPWAInstallDialog(false);
  };

  return (
    <Grid container direction='column'>
      <DialogBox
        open={showPrivacyTextDialog}
        HTMLString={t("landingPage.privacyText")}
        onClose={() => setShowPrivacyTextDialog(false)}
        onClickYes={() => history.push("/signUp")}
        yesText={t("landingPage.privacyDialogBoxConfirm")}
      ></DialogBox>
      <DialogBox
        open={showPWAInstallDialog}
        text={t("landingPage.pwaInstallText")}
        onClose={() => setShowPWAInstallDialog(false)}
        onClickYes={() => install()}
        onClickNo={() => {
          setShowPWAInstallDialog(false);
          history.push("/forum");
        }}
        yesText={t("landingPage.pwaInstallText")}
        noText={t("landingPage.pwaInstallDialogBoxDecline")}
      ></DialogBox>
      {isMobile && <NavigationBar showMenu />}

      <Grid
        container
        className={classes.container}
        direction='column'
        alignItems='center'
      >
        <b className={classes.title}>
          {t("landingPage.welcomeText")}
          <span style={{ boxShadow: "inset 0 -10px 0 0 #FEBD7D" }}>
            Pinocchio
          </span>
        </b>
        <Typography className={classes.description}>
          {t("landingPage.description")}
        </Typography>
        <img
          src={landingPinocchio}
          alt='Logo'
          className={classes.landingPinocchio}
        ></img>
        <Button
          className={classes.button}
          onClick={() => history.push("/forum")}
        >
          <Typography className={classes.buttonText}>
            {t("landingPage.tryNow")}
          </Typography>
        </Button>
        <Typography className={classes.linkText}>
          Already have an account?
          <Link className={classes.link} onClick={() => history.push("/login")}>
            {" Sign In"}
          </Link>
        </Typography>
        <Typography className={classes.linkText}>
          New to Pinocchio?
          <Link
            className={classes.link}
            onClick={() => setShowPrivacyTextDialog(true)}
          >
            {" Sign Up"}
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default LandingPage;
