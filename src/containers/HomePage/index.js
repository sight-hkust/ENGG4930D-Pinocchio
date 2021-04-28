import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, useMediaQuery, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import NavigationBar from "../../components/NavigationBar";
import readNowImage from "../../assets/readStoryIcon.png";
import writeNowImage from "../../assets/writeNowIcon.png";
import lookBackImage from "../../assets/lookBackIcon.png";
import bookmarkImage from "../../assets/bookmarkIcon.png";
import callWellnessCenterIcon from "../../assets/exclamationMarkIcon.png";
import DialogBox from "../../components/DialogBox";
import { useTranslation } from "react-i18next";
import { isCompletedSignUp } from "../../utils/fetchUserData";

const useStyles = makeStyles((theme) => ({
  title: {
    width: "fit-content",
    fontWeight: "bold",
    lineHeight: 1,
    fontSize: 50,
    textAlign: "center",
    alignSelf: "center",
    paddingTop: 30,
    "@media (max-width:480px)": {
      marginLeft: 35,
      paddingTop: 30,
      fontSize: 40,
      whiteSpace: "break-spaces",
      textAlign: "left",
      alignSelf: "flex-start",
    },
  },
  button: {
    width: "15vw",
    height: "25vh",
    borderRadius: 40,
    backgroundColor: "#FFD7D7",
    display: "table-column",
    margin: "10px 25px",
    "&:hover": {
      backgroundColor: "#FFD7D7",
    },
    "@media (max-width:480px)": {
      width: "41vw",
      margin: 0,
    },
  },
  buttonLargeWeb: {
    width: "35vw",
    height: "25vh",
    borderRadius: 40,
    backgroundColor: "#FFD7D7",
    margin: "10px 25px",
    textAlign: "left",
    "&:hover": {
      backgroundColor: "#FFD7D7",
    },
  },
  buttonLarge: {
    borderRadius: 40,
    backgroundColor: "#FFD7D7",
    padding: "30px 26px",
    textAlign: "left",
    margin: "10px 25px",
    "&:hover": {
      backgroundColor: "#FFD7D7",
    },
  },
  cardContainer: {
    paddingTop: 20,
    justifyContent: "space-evenly",
  },
  buttonHeadingText: {
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "Capitalize",
  },
  buttonText: {
    fontSize: 14,
    textTransform: "none",
  },
  buttonTextGroup: {
    paddingLeft: 16,
  },
}));

function HomePage() {
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:480px)");
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const userUID = useSelector((state) => state.auth.userUID);

  useEffect(() => {
    isCompletedSignUp(userUID).then((isCompleted) => {
      if (!isCompleted) {
        history.push("/interests");
      }
    });
  }, []);

  const handleClose = (event, reason) => {
    setIsOpen(false);
  };

  const handleCall = (e) => {
    firebase.analytics().logEvent("callWellnessCenter");
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <Grid container direction='column'>
      <NavigationBar showMenu />
      <Typography
        className={classes.title}
        style={{ boxShadow: "inset 0 -18px 0 0 #B3B4DA" }}
      >
        {t("homePage.forYou")}
      </Typography>
      {isMobile ? (
        <Grid
          container
          item
          direction='column'
          className={classes.cardContainer}
        >
          <Grid
            container
            direction='row'
            style={{ padding: "0 25px", justifyContent: "space-between" }}
          >
            <Button
              className={classes.button}
              onClick={() => history.push("/lookBack")}
            >
              <img alt='lookback' src={lookBackImage}></img>
              <Typography className={classes.buttonHeadingText}>
                {t("homePage.lookBackText")}
              </Typography>
            </Button>
            <Button
              className={classes.button}
              onClick={() => history.push("/bookmark")}
            >
              <img alt='bookmark' src={bookmarkImage}></img>
              <Typography className={classes.buttonHeadingText}>
                {t("homePage.bookMark")}
              </Typography>
            </Button>
          </Grid>
          <Button
            className={classes.buttonLarge}
            onClick={() => history.push("/forum")}
          >
            <img alt='bookmark' src={readNowImage}></img>
            <Grid
              container
              item
              direction='row'
              className={classes.buttonTextGroup}
            >
              <Typography className={classes.buttonHeadingText}>
                {t("homePage.readStories")}
              </Typography>
              <Typography className={classes.buttonText}>
                {t("homePage.delveStories")}
              </Typography>
            </Grid>
          </Button>
          <Button
            className={classes.buttonLarge}
            onClick={() => history.push("/writing")}
          >
            <img alt='bookmark' src={writeNowImage}></img>
            <Grid
              container
              item
              direction='row'
              className={classes.buttonTextGroup}
            >
              <Typography className={classes.buttonHeadingText}>
                {t("homePage.writeNow")}
              </Typography>
              <Typography className={classes.buttonText}>
                {t("homePage.dailyThoughts")}
              </Typography>
            </Grid>
          </Button>
          <Grid
            container
            item
            direction='row'
            justify='flex-end'
            style={{ alignItems: "center" }}
          >
            <Button
              onClick={(e) => handleCall(e)}
              style={{ marginRight: 20, textTransform: "capitalize" }}
            >
              <Typography style={{ fontSize: 28, paddingRight: 10 }}>
                {t("homePage.askForHelp")}
              </Typography>
              <img alt='callWellnessCenter' src={callWellnessCenterIcon}></img>
            </Button>
          </Grid>
          <DialogBox
            open={isOpen}
            HTMLString={t("homePage.hotLineText")}
            onClickYes={() => (window.location.href = "tel:+85282082688")}
            onClickNo={handleClose}
          ></DialogBox>
        </Grid>
      ) : (
        <Grid
          container
          item
          direction='column'
          className={classes.cardContainer}
        >
          <Grid
            container
            item
            direction='row'
            style={{ justifyContent: "center" }}
          >
            <Button
              className={classes.buttonLargeWeb}
              onClick={() => history.push("/writing")}
            >
              <img
                alt='bookmark'
                src={writeNowImage}
                style={{ paddingLeft: 15 }}
              ></img>
              <Grid
                container
                item
                direction='column'
                className={classes.buttonTextGroup}
              >
                <Typography
                  className={classes.buttonHeadingText}
                  style={{ paddingLeft: 20 }}
                >
                  {t("homePage.writeNow")}
                </Typography>
                <Typography
                  className={classes.buttonText}
                  style={{ paddingLeft: 20, paddingRight: 20 }}
                >
                  {t("homePage.lifeTale")}
                </Typography>
              </Grid>
            </Button>
            <Button
              className={classes.button}
              onClick={() => history.push("/lookback")}
            >
              <img alt='lookback' src={lookBackImage}></img>
              <Typography className={classes.buttonHeadingText}>
                {t("homePage.lookBackText")}
              </Typography>
            </Button>
          </Grid>
          <Grid container direction='row' style={{ justifyContent: "center" }}>
            <Button
              className={classes.buttonLargeWeb}
              onClick={() => history.push("/forum")}
            >
              <img
                alt='bookmark'
                src={readNowImage}
                style={{ paddingLeft: 15 }}
              ></img>
              <Grid
                container
                item
                direction='column'
                className={classes.buttonTextGroup}
              >
                <Typography
                  className={classes.buttonHeadingText}
                  style={{ paddingLeft: 20 }}
                >
                  {t("homePage.readStories")}
                </Typography>
                <Typography
                  className={classes.buttonText}
                  style={{ paddingLeft: 20, paddingRight: 20 }}
                >
                  {t("homePage.delveInspire")}
                </Typography>
              </Grid>
            </Button>
            <Button
              className={classes.button}
              onClick={() => history.push("/bookmark")}
            >
              <img alt='bookmark' src={bookmarkImage}></img>
              <Typography className={classes.buttonHeadingText}>
                {t("homePage.bookMark")}
              </Typography>
            </Button>
          </Grid>
          <Grid
            container
            item
            direction='row'
            justify='flex-end'
            style={{ alignItems: "center", paddingTop: 40 }}
          >
            <Button onClick={(e) => handleCall(e)} style={{ marginRight: 20 }}>
              <Typography style={{ fontSize: 28, paddingRight: 20 }}>
                {t("homePage.askForHelp")}
              </Typography>
              <img alt='callWellnessCenter' src={callWellnessCenterIcon}></img>
            </Button>
          </Grid>

          <DialogBox
            open={isOpen}
            HTMLString={t("homePage.hotLineText")}
            onClose={handleClose}
            onClickYes={() => (window.location.href = "tel:+85282082688")}
            onClickNo={handleClose}
          ></DialogBox>
        </Grid>
      )}
    </Grid>
  );
}

export default HomePage;
