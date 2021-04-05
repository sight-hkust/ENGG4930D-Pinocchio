import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Button } from "@material-ui/core";
import StoryInput from "../../components/StoryInput";
import NavigationBar from "../../components/NavigationBar";
import { uploadStory } from "../../utils/uploadStory";

const useStyles = makeStyles((theme) => ({
  container: {
    alignContent: "flex-start",
    "@media (max-width:480px)": {
      justifyContent: "space-around",
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: 60,
    lineHeight: "normal",
    textAlign: "center",
    "@media (max-width:480px)": {
      paddingLeft: 35,
      paddingTop: 10,
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
  const classes = useStyles();
  const [storyText, setStoryText] = useState();
  const handleUpload = ({ isPublic }) => {
    console.log(isPublic);
    uploadStory(storyText, isPublic);
  };

  return (
    <Grid container direction='column' className={classes.container}>
      <NavigationBar showMenu />
      <Typography className={classes.title}>{`WRITE\nYOUR STORY`}</Typography>
      <StoryInput
        isDraft
        color='green'
        onChange={(e) => setStoryText(e.target.value)}
      />
      <Grid container direction='row' className={classes.buttonContainer}>
        <Button
          className={classes.button}
          onClick={() => handleUpload({ isPublic: true })}
        >
          <Typography className={classes.buttonNormalText}>+ for</Typography>
          <Typography className={classes.buttonBoldText}>everyone</Typography>
        </Button>
        <Button
          className={classes.button}
          onClick={() => handleUpload({ isPublic: false })}
        >
          <Typography className={classes.buttonNormalText}>
            + just for
          </Typography>
          <Typography className={classes.buttonBoldText}>me</Typography>
        </Button>
      </Grid>
    </Grid>
  );
}

export default WritingPage;
