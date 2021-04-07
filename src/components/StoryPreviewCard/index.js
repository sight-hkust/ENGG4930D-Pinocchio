import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, IconButton } from "@material-ui/core";
import commentIcon from "../../assets/commentIcon.png";
import bookmarkIcon from "../../assets/bookmarkedIcon.png";
import noBookmarkIcon from "../../assets/noBookmarkIcon.png";
import { bookmarkStory } from "../../utils/bookmarkStory";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "90%",
    margin: "30px 20px 30px",
    borderRadius: 30,
  },
}));

function StoryPreviewCard(props) {
  const classes = useStyles();
  const {
    isBookmarked,
    title,
    storyText,
    date,
    category,
    isPublic,
    storyID,
  } = props;

  const handleBookmark = () => {
    bookmarkStory(storyID);
  };

  return (
    <Grid
      container
      className={classes.container}
      style={{
        backgroundColor: "#FFD7D7",
        padding: 22,
      }}
      direction='column'
    >
      <Grid container direction='row' justify='space-between'>
        <Typography>{date}</Typography>
        <Typography
          style={{
            fontSize: 12,
            backgroundColor: "#F9A586",
            borderRadius: 20,
            padding: "3px 10px",
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
          }}
        >
          {title}
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
          }}
        >
          {storyText}
        </Typography>
        <Grid container direction='row'>
          <IconButton style={{ padding: 0, marginRight: 12 }}>
            <img
              alt='bookmark'
              src={isBookmarked ? bookmarkIcon : noBookmarkIcon}
              onClick={() => handleBookmark()}
            />
          </IconButton>
          {isPublic && (
            <IconButton style={{ padding: 0, marginRight: 12 }}>
              <img alt='comment' src={commentIcon} />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StoryPreviewCard;
