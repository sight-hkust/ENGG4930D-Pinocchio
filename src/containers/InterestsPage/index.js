import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid, useMediaQuery } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import backgroundImage from "../../assets/interestsPageBackground.png";
import NavigationBar from "../../components/NavigationBar";
import mobileBackgroundImage from "../../assets/interestsMobileBg.png";
import interestsBubbleImage from "../../assets/interestsBubble.png";
import NextButton from "../../components/NextButton";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    alignContent: "flex-end",
    contain: "content",
    "@media (max-width:480px)": {
      backgroundImage: `url(${mobileBackgroundImage})`,
      backgroundSize: "contain",
      backgroundPosition: "bottom",
    },
  },
  title: {
    fontFamily: "Times",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 60,
    marginTop: 70,
    width: "70%",
    "@media (max-width:480px)": {
      lineHeight: 1,
      width: "100%",
      fontSize: 40,
      marginTop: 26,
    },
  },
  description: {
    fontFamily: "Roboto",
    fontSize: 30,
    alignSelf: "center",
    margin: 0,
    paddingBottom: 60,
    "@media (max-width:480px)": {
      fontSize: 15,
      paddingBottom: 0,
    },
  },
  button: {
    width: 95,
    height: 77,
    backgroundColor: "#3C79B0",
    color: "#FFFFFF",
    borderRadius: 15,
    alignSelf: "flex-end",
    "&:hover": {
      backgroundColor: "#3C79B0",
    },
  },
  interestButton: {
    height: 72,
    backgroundColor: "#D38851",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: 20,
    borderBottomRightRadius: 9,
    padding: "18px 25px",
    marginBottom: 38,
    textTransform: "lowercase",
    "&:hover": {
      backgroundColor: "#D38851",
    },
    "@media (max-width:480px)": {
      height: "auto",
      padding: "13px 13px",
      width: "auto",
      marginBottom: 20,
    },
  },
  buttonText: {
    color: "#FFFBFB",
    fontFamily: "Roboto",
    fontSize: 30,
    textAlign: "center",
    margin: 0,
    "@media (max-width:480px)": {
      fontSize: 15,
    },
  },
  inputForm: {
    display: "flex",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  buttonGroupImage: {
    width: "100vw",
  },
  buttonGroup: {
    position: "absolute",
    top: "40vh",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
}));

function InterestsPage() {
  const classes = useStyles();
  const history = useHistory();
  const [selected, setSelected] = useState([]);
  const isMobile = useMediaQuery("(max-width:480px)");

  const interests = [
    "PTSD",
    "depression",
    "motivation",
    "eating disorder",
    "exam anxiety",
    "social anxiety",
    "panic disorder",
    "all",
  ];

  const handleSubmit = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .set(
            {
              interests: [...selected.map((index) => interests[index])],
            },
            { merge: true }
          );
        history.push("/home");
      }
    });
  };

  return (
    <Grid container className={classes.container} direction='column'>
      <Grid container item direction='column' className={classes.inputForm}>
        <NavigationBar />
        <Typography className={classes.title}>
          WHEN YOU WISH UPON A STAR...
        </Typography>
        <Typography className={classes.description}>
          choose the topics that your heart desires{" "}
        </Typography>
        <img
          alt=''
          className={classes.buttonGroupImage}
          src={interestsBubbleImage}
        ></img>
        <Grid
          container
          item
          xs={isMobile ? 10 : 6}
          className={classes.buttonGroup}
        >
          {interests.map((interest, index) => (
            <Button
              className={classes.interestButton}
              key={index}
              onClick={() => {
                if (selected.includes(index)) {
                  setSelected(selected.filter((item) => item !== index));
                } else {
                  setSelected([...selected, index]);
                }
              }}
              style={{
                backgroundColor:
                  selected && selected.includes(index) ? "#8ED039" : "#D38851",
              }}
            >
              <Typography
                className={classes.buttonText}
              >{`+ ${interest}`}</Typography>
            </Button>
          ))}
          {selected.length !== 0 && (
            <NextButton style={{ marginLeft: 285 }} onClick={handleSubmit} />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default InterestsPage;
