import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Input } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    width: 376,
    height: 465,
    marginTop: 10,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
  input: {
    height: 400,
    width: 338,
    alignItems: "baseline",
    overflow: "auto",
    margin: "15px 38px",
    padding: "32px 0px",
  },
}));

function StoryInput(props) {
  const classes = useStyles();
  const { isDraft, isBookmarked, color, storyText, ...restProps } = props;
  return (
    <Grid
      container
      className={classes.container}
      style={{
        backgroundColor: "#FFD7D7",
      }}
    >
      <Input
        disableUnderline
        multiline
        readOnly={!isDraft}
        placeholder={isDraft ? "write down what you feel..." : ""}
        className={classes.input}
        value={storyText}
        {...restProps}
      ></Input>
    </Grid>
  );
}

export default StoryInput;
