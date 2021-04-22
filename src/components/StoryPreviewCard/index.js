import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import commentIcon from "../../assets/commentIcon.png";
import bookmarkIcon from "../../assets/bookmarkedIcon.png";
import noBookmarkIcon from "../../assets/noBookmarkIcon.png";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "40%",
    margin: "5%",
    borderRadius: 30,
    backgroundColor: "#FFD7D7",
    padding: 22,
    "&:hover": {
      backgroundColor: "#FFD7D7",
    },
    "@media (max-width:480px)": {
    width: "90%",
    margin: "10px 20px 10px",
    }
  },
  categoryText: {
    fontSize: 12,
    backgroundColor: "#F9A586",
    borderRadius: 20,
    padding: "3px 10px",
    textTransform: "capitalize",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 1.3,
    paddingTop: 5,
    textTransform: "none",
    whiteSpace: "pre-line",
  },
  storyText: {
    paddingTop: 13,
    fontSize: 14,
    marginBottom: 15,
    maxWidth: "100%",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: 45,
    textTransform: "none",
  },
  icon: {
    padding: 0,
    marginRight: 12,
  },
}));

function StoryPreviewCard(props) {
  const classes = useStyles();
  const history = useHistory();

  const {
    isBookmarked,
    title,
    storyText,
    date,
    category,
    isPublic,
    storyID,
  } = props;

  return (
    <Button
      className={classes.container}
      onClick={() => history.push(`/story/${storyID}`)}
    >
      <Grid container direction='column' style={{ textAlign: "left" }}>
        <Grid container direction='row' justify='space-between'>
          <Typography>{date}</Typography>
          <Typography className={classes.categoryText}>{category}</Typography>
        </Grid>
        <Grid container direction='column'>
          <Typography className={classes.titleText}>
            {title.split(",").join(",\n")}
          </Typography>
          <Typography className={classes.storyText}>{storyText}</Typography>
          <Grid container direction='row'>
            <img
              alt='bookmark'
              src={isBookmarked ? bookmarkIcon : noBookmarkIcon}
              className={classes.icon}
            />
            {isPublic && (
              <img alt='comment' src={commentIcon} className={classes.icon} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Button>
  );
}

export default StoryPreviewCard;
