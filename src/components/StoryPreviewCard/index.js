import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import bookmarkIcon from "../../assets/bookmarkedIcon.png";
import noBookmarkIcon from "../../assets/noBookmarkIcon.png";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "40%",
    margin: "2vw",
    borderRadius: 30,
    backgroundColor: "#FFD7D7",
    padding: 22,
    minHeight: 300,
    "&:hover": {
      backgroundColor: "#FFD7D7",
    },
    "@media (max-width:480px)": {
      width: "90%",
      margin: "10px 20px 10px",
      minHeight: "10vh",
    },
  },
  dateText: {
    fontSize: 18,
    "@media (max-width:480px)": {
      fontSize: 14,
    },
  },
  categoryText: {
    fontSize: 18,
    backgroundColor: "#F9A586",
    borderRadius: 20,
    padding: "3px 10px",
    textTransform: "capitalize",
    "@media (max-width:480px)": {
      fontSize: 12,
    },
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 25,
    lineHeight: 1.3,
    paddingTop: 5,
    textTransform: "none",
    whiteSpace: "pre-line",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    textOverflow: "ellipsis",
    overflow: "hidden",
    "@media (max-width:480px)": {
      fontSize: 20,
    },
  },
  storyText: {
    paddingTop: 13,
    fontSize: 20,
    marginBottom: 15,
    maxWidth: "100%",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    textTransform: "none",
    "@media (max-width:480px)": {
      fontSize: 14,
    },
  },
  icon: {
    padding: 0,
    marginRight: 12,
  },
}));

function StoryPreviewCard(props) {
  const classes = useStyles();
  const history = useHistory();

  const { isBookmarked, title, storyText, date, category, storyID } = props;

  return (
    <Button
      className={classes.container}
      onClick={() => history.push(`/story/${storyID}`)}
    >
      <Grid container direction='column' style={{ textAlign: "left" }}>
        <Grid container direction='row' justify='space-between'>
          <Typography className={classes.dateText}>{date}</Typography>
          <Typography className={classes.categoryText}>{category}</Typography>
        </Grid>
        <Grid container direction='column'>
          <Typography className={classes.titleText}>
            {title.split(",").join(",\n")}
          </Typography>
          <div
            className={classes.storyText}
            dangerouslySetInnerHTML={{ __html: storyText }}
          ></div>
          <Grid container direction='row'>
            <img
              alt='bookmark'
              src={isBookmarked ? bookmarkIcon : noBookmarkIcon}
              className={classes.icon}
            />
          </Grid>
        </Grid>
      </Grid>
    </Button>
  );
}

export default StoryPreviewCard;
