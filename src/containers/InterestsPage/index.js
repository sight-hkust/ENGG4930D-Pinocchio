import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid, useMediaQuery } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
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
    alignContent: "flex-end",
    "@media (max-width:480px)": {},
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 60,
    marginTop: 22,
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
    paddingBottom: 0,
    paddingTop: 5,
    color: "#838181",
    "@media (max-width:480px)": {
      fontSize: 20,
    },
  },
  interestButton: {
    height: "auto",
    width: "auto",
    "&:hover": {
      backgroundColor: "#FFFFFF",
    },
    "@media (max-width:480px)": {
      height: "auto",
      padding: "13px 13px",
      width: "auto",
      marginLeft: 0,
      marginBottom: 20,
    },
  },
  buttonText: {
    color: "#000000",
    fontSize: 25,
    paddingTop: 10,
    textAlign: "center",
    textTransform: "capitalize",
    margin: 0,
    paddingRight: 5,
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
  interestImage: {
    paddingTop: 35,
    height: 70,
    "@media (max-width:480px)": {
      paddingTop: 29,
      height: 43,
    },
  },
}));

function InterestsPage() {
  const classes = useStyles();
  const history = useHistory();
  const [selected, setSelected] = useState([]);
  const isMobile = useMediaQuery("(max-width:480px)");
  const userID = useSelector((state) => state.auth.userUID);

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
    firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .set(
        {
          interests: [...selected.map((index) => interests[index][0])],
        },
        { merge: true }
      );
    history.push("/home");
  };

  return (
    <Grid container className={classes.container} direction='column'>
      <Grid container item direction='column' className={classes.inputForm}>
        <NavigationBar showMenu />
        <b className={classes.title}>
          {"Choose your "}
          <span style={{ boxShadow: "inset 0 -18px 0 0 #FEBD7D" }}>
            interests
          </span>
        </b>
        <Typography className={classes.description}>
          As your heart desires
        </Typography>
        <Grid
          container
          item
          xs={isMobile ? "auto" : 7}
          className={classes.buttonGroup}
        >
          {interests.map((interest, index) => (
            <Button
              disableRipple
              className={classes.interestButton}
              key={index}
              onClick={() => {
                if (selected.includes(index)) {
                  setSelected(selected.filter((item) => item !== index));
                } else {
                  setSelected([...selected, index]);
                }
              }}
            >
              <Grid
                container
                item
                direction='column'
                style={{ alignItems: "center", padding: 10 }}
              >
                <span
                  style={{
                    width: isMobile ? 98 : 130,
                    height: isMobile ? 98 : 130,
                    backgroundColor:
                      selected.includes(index) === true ? "#FEBD7D" : "#FFD7D7",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    alt=''
                    src={interest[1]}
                    className={classes.interestImage}
                  />
                </span>
                <Typography className={classes.buttonText}>
                  {interest[0]}
                </Typography>
              </Grid>
            </Button>
          ))}
        </Grid>
        {selected.length !== 0 && (
          <NextButton
            style={{ marginLeft: 285, marginBottom: 20 }}
            onClick={() => handleSubmit()}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default InterestsPage;
