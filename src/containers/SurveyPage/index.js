import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Typography, Grid, Slider, Button } from "@material-ui/core";
import { useHistory } from "react-router";
import NavigationBar from "../../components/NavigationBar";
import { useTranslation } from "react-i18next";
import { uploadSurvey } from "../../utils/uploadSurvey";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0 10vw",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 60,
    marginTop: 22,
    width: "70%",
    textAlign: "center",
    alignSelf: "center",
    "@media (max-width:480px)": {
      alignSelf: "flex-start",
      textAlign: "left",
      fontSize: 27,
      fontWeight: "bold",
      marginTop: 50,
    },
  },
  description: {
    fontSize: 24,
    margin: "20px 0",
    textAlign: "center",
    "@media (max-width:480px)": {
      textAlign: "left",
      fontSize: 14,
    },
  },
  card: {
    width: "70vw",
    backgroundColor: "#FFD7D7",
    borderRadius: 15,
    margin: "2vh 0",
    padding: "3vw",
    "@media (max-width:480px)": {
      padding: "8vw",
    },
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    "@media (max-width:480px)": {
      fontSize: 12,
    },
  },
  button: {
    backgroundColor: "#F9A586",
    minWidth: 50,
    borderRadius: 20,
    width: "fit-content",
    alignSelf: "flex-end",
    padding: "10px 25px",
    margin: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
    "@media (max-width:480px)": {
      fontSize: 13,
    },
  },
}));

const CustomSlider = withStyles({
  root: {
    color: "#F59598",
    height: 8,
  },
  rail: {
    height: 8,
  },
  track: {
    height: 8,
  },
  thumb: {
    marginTop: -8,
    marginLeft: -12,
    height: 24,
    width: 24,
  },
})(Slider);

function SurveyPage() {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const [questionOne, setQuestionOne] = useState(1);
  const [questionTwo, setQuestionTwo] = useState(1);
  const [questionThree, setQuestionThree] = useState(1);

  var userUID = useSelector((state) => state.auth.userUID);

  const handleQuestionOne = (newValue) => {
    setQuestionOne(newValue);
  };
  const handleQuestionTwo = (newValue) => {
    setQuestionTwo(newValue);
  };
  const handleQuestionThree = (newValue) => {
    setQuestionThree(newValue);
  };

  const marks = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
  ];

  const handleSubmit = () => {
    uploadSurvey(questionOne, questionTwo, questionThree, userUID);
    history.push("/home");
  };

  return (
    <Grid container direction='column' style={{ alignContent: "center" }}>
      <NavigationBar showMenu />
      <Grid container direction='column' className={classes.container}>
        <Typography className={classes.title}>Survey For You</Typography>
        <Typography className={classes.description}>
          Don’t worry! All answers are kept <b>anonymous</b> and will be used to
          improve your experience of our platform!
        </Typography>
        <Grid container direction='column' className={classes.card}>
          <Typography className={classes.question}>
            1. How likely are you to share your mental health issues with your
            friends and family?
          </Typography>
          <CustomSlider
            defaultValue={1}
            step={1}
            marks={marks}
            min={1}
            max={5}
            value={questionOne}
            onChange={(e, value) => handleQuestionOne(value)}
          />
        </Grid>
        <Grid container direction='column' className={classes.card}>
          <Typography className={classes.question}>
            2. If you are having a mental health difficulty, how well do you
            think your peers will accept you?
          </Typography>
          <CustomSlider
            defaultValue={1}
            step={1}
            marks={marks}
            min={1}
            max={5}
            value={questionTwo}
            onChange={(e, value) => handleQuestionTwo(value)}
          />
        </Grid>
        <Grid container direction='column' className={classes.card}>
          <Typography className={classes.question}>
            3. Would you seek professional support (e.g. student counsellors)
            when you encounter mental health issues?
          </Typography>
          <CustomSlider
            defaultValue={1}
            step={1}
            marks={marks}
            min={1}
            max={5}
            value={questionThree}
            onChange={(e, value) => handleQuestionThree(value)}
          />
        </Grid>
        <Button className={classes.button} onClick={() => handleSubmit()}>
          <Typography className={classes.buttonText}>Done!</Typography>
        </Button>
      </Grid>
    </Grid>
  );
}

export default SurveyPage;
