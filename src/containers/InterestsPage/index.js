import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid, useMediaQuery } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import NavigationBar from "../../components/NavigationBar";
import NextButton from "../../components/NextButton";
import depressionIcon from "../../assets/depressionIcon.png";
import motivationIcon from "../../assets/motivationIcon.png";
import examAnxietyIcon from "../../assets/examAnxietyIcon.png";
import socialAnxietyIcon from "../../assets/socialAnxietyIcon.png";
import ptsdIcon from "../../assets/ptsdIcon.png";
import panicDisorderIcon from "../../assets/panicDisorderIcon.png";
import eatingDisorderIcon from "../../assets/eatingDisorderIcon.png";
import allIcon from "../../assets/allIcon.png";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    alignContent: "flex-end",
    "@media (max-width:480px)": {
      backgroundSize: "contain",
      backgroundPosition: "bottom",
    },
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 60,
    marginTop: 70,
    width: "70%",
    "@media (max-width:480px)": {
      lineHeight: 1,
      width: "100%",
      fontSize: 27,
      fontWeight: "bold",
      marginTop: 50,
    },
  },
  description: {
    fontSize: 30,
    alignSelf: "center",
    margin: 0,
    paddingBottom: 60,
    "@media (max-width:480px)": {
      color: "#838181",
      fontSize: 20,
      paddingBottom: 0,
      paddingTop: 5,
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
    height: 135,
    width: 114,
    "@media (max-width:480px)": {
      height: "auto",
      padding: "13px 13px",
      width: "auto",
      marginBottom: 20,
    },
  },
  buttonText: {
    color: "#000000",
    fontSize: 30,
    paddingTop: 10,
    textAlign: "center",
    textTransform: "capitalize",
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
    paddingTop: "4vh",
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
    ["Depression", depressionIcon],
    ["Motivation", motivationIcon],
    ["Exam Anxiety", examAnxietyIcon],
    ["Social Anxiety", socialAnxietyIcon],
    ["PTSD", ptsdIcon],
    ["Panic Disorder", panicDisorderIcon],
    ["Eating Disorder", eatingDisorderIcon],
    ["All", allIcon],
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
        history.push("/guidelines");
      }
    });
  };

  return (
    <Grid container className={classes.container} direction='column'>
      <Grid container item direction='column' className={classes.inputForm}>
        <NavigationBar showMenu />
        <Typography className={classes.title}>Choose your interests</Typography>
        <Typography className={classes.description}>
          As your heart desires
        </Typography>
        <Grid container item xs className={classes.buttonGroup}>
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
              disableRipple
            >
              <Grid container item direction='column'>
                <span
                  style={{
                    width: 98,
                    height: 98,
                    backgroundColor:
                      selected.includes(index) === true ? "#A8E6CF" : "#FFD7D7",
                    borderRadius: "50%",
                  }}
                >
                  <img alt='' src={interest[1]} style={{ paddingTop: 29 }} />
                </span>
                <Typography className={classes.buttonText}>
                  {interest[0]}
                </Typography>
              </Grid>
            </Button>
          ))}
        </Grid>
        {selected.length !== 0 && (
          <NextButton style={{ marginLeft: 285 }} onClick={handleSubmit} />
        )}
      </Grid>
    </Grid>
  );
}

export default InterestsPage;
