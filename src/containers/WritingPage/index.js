import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Button } from "@material-ui/core";
import StoryInput from "../../components/StoryInput";
import NavigationBar from "../../components/NavigationBar";
import NextButton from "../../components/NextButton";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    fontSize: 60,
    lineHeight: "normal",
    textAlign: "center",
    "@media (max-width:480px)": {
      paddingLeft: 35,
      paddingTop: 30,
      fontSize: 40,
      whiteSpace: "break-spaces",
      textAlign: "left",
    },
  },
  button: {
    backgroundColor: "#FFF0DB",
    borderRadius: 10,
    textTransform: "none",
    fontSize: 12,
    marginLeft: 9,
  },
  buttonBoldText: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
  },
  buttonNormalText: {
    fontSize: 12,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    padding: 16,
  },
}));

function WritingPage() {
  const history = useHistory();
  const classes = useStyles();
  const [storyText, setStoryText] = useState();
  const [title, setTitle] = useState();

  const handleSubmit = () => {
    var myStorage = window.sessionStorage;
    myStorage.setItem("title", title);
    myStorage.setItem("storyText", storyText);
    history.push("/writingCategory");
  };

  return (
    <Grid container direction='column' style={{ alignContent: "center" }}>
      <NavigationBar showMenu />
      <Typography className={classes.title}>
        Write your{" "}
        <span style={{ boxShadow: "inset 0 -18px 0 0 #FEBD7D" }}>thoughts</span>
      </Typography>

      <NextButton
        style={{ position: "relative", marginTop: 24, paddingRight: 30}}
        onClick={() => handleSubmit()}
      />
      <StoryInput
        onBodyTextChange={(e) => setStoryText(e.target.value)}
        onTitleChange={(e) => setTitle(e.target.value)}
      />

    </Grid>
  );
}

export default WritingPage;
