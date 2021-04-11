import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import commentIcon from "../../assets/commentIcon.png";
import bookmarkIcon from "../../assets/bookmarkedIcon.png";
import noBookmarkIcon from "../../assets/noBookmarkIcon.png";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "90%",
    margin: "10px 20px 10px",
    borderRadius: 30,
    backgroundColor: "#FFD7D7",
    padding: 22,
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
          <Typography
            style={{
              fontSize: 12,
              backgroundColor: "#F9A586",
              borderRadius: 20,
              padding: "3px 10px",
              textTransform: "capitalize",
            }}
          >
            {category}
          </Typography>
        </Grid>
        <Grid container direction='column'>
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: 20,
              lineHeight: 1.3,
              paddingTop: 5,
              textTransform: "none",
              whiteSpace: "pre-line",
            }}
          >
            {title.split(",").join(",\n")}
          </Typography>
          <Typography
            style={{
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
            }}
          >
            {storyText}
          </Typography>
          <Grid container direction='row'>
            <img
              alt='bookmark'
              src={isBookmarked ? bookmarkIcon : noBookmarkIcon}
              style={{ padding: 0, marginRight: 12 }}
            />
            {isPublic && (
              <img
                alt='comment'
                src={commentIcon}
                style={{ padding: 0, marginRight: 12 }}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Button>
  );
}

export default StoryPreviewCard;
