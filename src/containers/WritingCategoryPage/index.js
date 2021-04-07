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
import { uploadStory } from "../../utils/uploadStory";

const useStyles = makeStyles((theme) => ({
  container: {
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
    padding: "8px 14px",
    marginBottom: 30,
    marginLeft: 12,
    backgroundColor: "#F9A586",
    borderRadius: 20,
    alignSelf: "flex-end",
    "&:hover": {
      backgroundColor: "#F9A586",
    },
  },
  interestButton: {
    height: 135,
    width: 114,
    "@media (max-width:480px)": {
      height: "auto",
      padding: "13px 13px",
      width: "auto",
    },
  },
  buttonText: {
    color: "#000000",
    fontSize: 20,
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
  buttonGroup: {
    paddingTop: "4vh",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  buttonBoldText: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "Capitalize",
  },
}));

function WritingCategoryPage() {
  const classes = useStyles();
  const history = useHistory();
  const [selected, setSelected] = useState();
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

  const handleUpload = ({ isPublic }) => {
    let title = sessionStorage.getItem("title");
    let storyText = sessionStorage.getItem("storyText");
    if (title && storyText && selected) {
      //will implement Dialog Box here
      uploadStory(storyText, title, interests[selected][0], isPublic);
      history.push("/forum");
    } else {
      throw Error("ERROR_NO_STORY_STORED");
    }
  };

  return (
    <Grid container className={classes.container} direction='column'>
      <Grid container item direction='column' className={classes.inputForm}>
        <NavigationBar showMenu />
        <Typography className={classes.title}>Choose your interests</Typography>
        <Typography className={classes.description}>
          Choose a category for your story:
        </Typography>
        <Grid container item xs className={classes.buttonGroup}>
          {interests.map((interest, index) => (
            <Button
              className={classes.interestButton}
              key={index}
              onClick={() => {
                setSelected(index);
              }}
              disableRipple
            >
              <Grid container item direction='column'>
                <span
                  style={{
                    width: 98,
                    height: 98,
                    backgroundColor: selected === index ? "#A8E6CF" : "#FFD7D7",
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
        {selected >= 0 && (
          <Grid container direction='row' justify='flex-end'>
            <Button
              className={classes.button}
              onClick={() => handleUpload({ isPublic: false })}
            >
              <Typography className={classes.buttonBoldText}>
                Pubslih For Me
              </Typography>
            </Button>
            <Button
              className={classes.button}
              style={{
                backgroundColor: "#FEBD7D",
                marginRight: 10,
              }}
              onClick={() => handleUpload({ isPublic: true })}
            >
              <Typography className={classes.buttonBoldText}>
                Publish For All
              </Typography>
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default WritingCategoryPage;
