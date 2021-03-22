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
import backgroundImage from "../../assets/homePageBackground.png";
import mobileBackgroundImage from "../../assets/homeMobileBg.png";
import readNowImage from "../../assets/readNow.png";
import writeNowImage from "../../assets/writeNow.png";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "bottom",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    "@media (max-width:480px)": {
      backgroundColor: "#FFF4E3",
      backgroundSize: "contain",
      backgroundImage: `url(${mobileBackgroundImage})`,
    },
  },
  title: {
    fontFamily: "Times",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 70,
    width: "70%",
    alignSelf: "center",
    "@media (max-width:480px)": {
      lineHeight: 1,
      width: "100%",
      fontSize: 40,
      whiteSpace: "break-spaces",
    },
  },
  description: {
    fontSize: 30,
    alignSelf: "center",
    "@media (max-width:480px)": {
      fontSize: 15,
      width: 221,
      marginTop: 8,
      whiteSpace: "break-spaces",
      textAlign: "center",
    },
  },
  paper: {
    width: "45vw",
    height: "45vw",
    borderRadius: 25,
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    marginTop: 12,
    marginBottom: 16,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
  button: {
    width: 164,
    height: 56,
    fontWeight: "bold",
    backgroundColor: "#3C79B0",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 20,
    "&:hover": {
      backgroundColor: "#3C79B0",
    },
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
        }, 5000);
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
      <NavigationBar />
      <Typography className={classes.title}>{`HOME:\nSTORY OF US`}</Typography>
      <Typography className={classes.description}>
        {`if your heart is in your dream,\nno request is too extreme`}
      </Typography>
      <Grid
        container
        direction='row'
        style={{ alignContent: "center", alignItems: "center" }}
      >
        {["READ", "WRITE"].map((element) => (
          <Grid
            container
            direction='column'
            key={element}
            xs
            style={{ alignItems: "center" }}
          >
            <Paper
              className={classes.paper}
              style={{
                backgroundColor: element === "WRITE" ? "#FFEDAD" : "#DAF8FF",
                backgroundImage:
                  element === "WRITE"
                    ? `url(${writeNowImage})`
                    : `url(${readNowImage})`,
              }}
            >
              {/* <img
                alt=''
                width='180px'
                src={element === "WRITE" ? writeNowImage : readNowImage}
              ></img> */}
            </Paper>
            <Button
              className={classes.button}
              style={{
                backgroundColor: element === "WRITE" ? "#DE2A4E" : "#3C79B0",
              }}
              onClick={() => {
                element === "WRITE"
                  ? history.push("/writing")
                  : history.push("/forum");
              }}
            >
              <Typography style={{ color: "#FFFBFB" }}>
                {`${element} NOW`}
              </Typography>
            </Button>
          </Grid>
        ))}
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
