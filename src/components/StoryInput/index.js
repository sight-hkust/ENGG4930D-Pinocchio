import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Input } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  inputBodyTextContainer: {
    width: "90vw",
    height: "60vh",
    margin: "0 20px",
    borderRadius: 30,
    backgroundColor: "#FFD7D7",
  },
  inputTitleContainer: {
    width: "90vw",
    margin: 20,
    borderRadius: 30,
    backgroundColor: "#FFD7D7",
  },
  inputBodyText: {
    fontSize: 14,
    flex: "auto",
    alignItems: "baseline",
    overflow: "auto",
    margin: "0px 38px",
    padding: "20px 0px",
    color: "#515151",
  },
  inputTitle: {
    fontSize: 20,
    color: "#515151",
    fontWeight: "bold",
    margin: "5px 38px",
  },
}));

function StoryInput(props) {
  const classes = useStyles();
  const {
    isDraft,
    isBookmarked,
    color,
    storyText,
    onBodyTextChange,
    onTitleChange,
    ...restProps
  } = props;
  return (
    <Grid container className={classes.container}>
      <Grid container className={classes.inputTitleContainer}>
        <Input
          disableUnderline
          multiline
          placeholder='Enter title here'
          className={classes.inputTitle}
          value={storyText}
          onChange={onTitleChange}
          {...restProps}
        ></Input>
      </Grid>
      <Grid container className={classes.inputBodyTextContainer}>
        <Input
          disableUnderline
          multiline
          placeholder='Start writing here...'
          className={classes.inputBodyText}
          value={storyText}
          onChange={onBodyTextChange}
          {...restProps}
        ></Input>
      </Grid>
    </Grid>
  );
}

export default StoryInput;
