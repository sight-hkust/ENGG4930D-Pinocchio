import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  useMediaQuery,
  Snackbar,
  Paper,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import NavigationBar from "../../components/NavigationBar";
import readNowImage from "../../assets/readStoryIcon.png";
import writeNowImage from "../../assets/writeNowIcon.png";
import lookBackImage from "../../assets/lookBackIcon.png";
import bookmarkImage from "../../assets/bookmarkIcon.png";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
    padding: "0 53px",
  },
  title: {
    fontWeight: "bold",
    lineHeight: 1,
    fontSize: 100,
    textAlign: "center",
    "@media (max-width:480px)": {
      fontSize: 35,
      marginTop: "5vh",
      textAlign: "left",
    },
  },
  button: {
    width: 170,
    height: 170,
    borderRadius: 40,
    backgroundColor: "#FFD7D7",
    display: "table-column",
  },
  cardContainer: {
    justifyContent: "space-evenly",
  },
  buttonHeadingText: {
    fontWeight: "bold",
    fontSize: 18,
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
    <Grid container className={classes.container} direction='column'>
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
          <img alt='lookback' src={bookmarkImage}></img>
          <Typography className={classes.buttonHeadingText}>
            Bookmarks
          </Typography>
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
