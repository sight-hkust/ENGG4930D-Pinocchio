import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  useMediaQuery,
  Snackbar,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import NavigationBar from "../../components/NavigationBar";
import NextButton from "../../components/NextButton";
import readNowImage from "../../assets/readStoryIcon.png";
import writeNowImage from "../../assets/writeNowIcon.png";
import lookBackImage from "../../assets/lookBackIcon.png";
import bookmarkImage from "../../assets/bookmarkIcon.png";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    lineHeight: 1,
    fontSize: 100,
    textAlign: "center",
    "@media (max-width:480px)": {
      fontSize: 35,
      marginTop: "5vh",
      textAlign: "left",
      paddingLeft: 20,
    },
  },
  button: {
    width: 170,
    height: 170,
    borderRadius: 40,
    backgroundColor: "#FFD7D7",
    display: "table-column",
    "&:hover": {
      backgroundColor: "#FFD7D7",
    },
  },
  buttonLarge: {
    width: 373,
    height: 170,
    borderRadius: 40,
    backgroundColor: "#FFD7D7",
    padding: "0 26px",
    textAlign: "left",
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
    textTransform: "Capitalize",
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

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsOpen(true);
        setTimeout(() => {
          history.push("/");
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpen(false);
  };

  const handleCall = (e) => {
    e.preventDefault();
    window.location.href = "tel:+85282082688";
  };

  return (
    <Grid container direction='column'>
      <NavigationBar showMenu />
      <Typography className={classes.title}>For You</Typography>
      <Grid container item direction='row' xs className={classes.cardContainer}>
        <Button className={classes.button}>
          <img alt='lookback' src={lookBackImage}></img>
          <Typography className={classes.buttonHeadingText}>
            Look back
          </Typography>
        </Button>
        <Button className={classes.button}>
          <img alt='bookmark' src={bookmarkImage}></img>
          <Typography className={classes.buttonHeadingText}>
            Bookmarks
          </Typography>
        </Button>
        <Button className={classes.buttonLarge}>
          <img alt='bookmark' src={readNowImage}></img>
          <Grid
            container
            item
            direction='row'
            className={classes.buttonTextGroup}
          >
            <Typography className={classes.buttonHeadingText}>
              Read stories
            </Typography>
            <Typography className={classes.buttonText}>
              Delve into our stories of the good, the bad and the magical
            </Typography>
            <NextButton onClick={() => history.push("/forum")} />
          </Grid>
        </Button>
        <Button className={classes.buttonLarge}>
          <img alt='bookmark' src={writeNowImage}></img>
          <Grid
            container
            item
            direction='row'
            className={classes.buttonTextGroup}
          >
            <Typography className={classes.buttonHeadingText}>
              Write now
            </Typography>
            <Typography className={classes.buttonText}>
              Write down your daily thoughts, for they are part of your alluring
              tale
            </Typography>
            <NextButton onClick={() => history.push("/writing")} />
          </Grid>
        </Button>
      </Grid>

      <Snackbar
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={
          isMobile
            ? { vertical: "bottom", horizontal: "center" }
            : { vertical: "bottom", horizontal: "left" }
        }
        autoHideDuration={9000}
        message={`We've cooked you dinner!\nRemember to come home🥺`}
        style={{ width: "90vw" }}
        ContentProps={{
          style: {
            backgroundColor: "#3546a2",
            fontSize: isMobile ? "0.875rem" : "1rem",
            whiteSpace: "break-spaces",
          },
        }}
      />
    </Grid>
  );
}

export default HomePage;
