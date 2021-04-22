import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, IconButton, Button } from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import NavigationBar from "../../components/NavigationBar";
import NextButton from "../../components/NextButton";
import commentIcon from "../../assets/commentIcon.png";
import bookmarkIcon from "../../assets/bookmarkedIcon.png";
import noBookmarkIcon from "../../assets/noBookmarkIcon.png";
import { bookmarkStory } from "../../utils/bookmarkStory";
import { fetchStoryByID } from "../../utils/fetchStory";
import { deleteStory } from "../../utils/deleteStory";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    fontSize: 60,
    textAlign: "center",
    "@media (max-width:480px)": {
      fontSize: 40,
      textAlign: "left",
    },
  },
  paper: {
    height: "60vh",
    padding: "47px 29px",
    backgroundColor: "#FFD7D7",
    borderRadius: 30,
    flexWrap: "nowrap",
    overflow: "auto",
  },
  deleteButton: {
    background: "#F59598",
    borderRadius: 20,
    padding: "5px 20px",
    marginRight: 8,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "auto",
    height: "10vh",
  },
  categoryText: {
    fontSize: 24,
    backgroundColor: "#F9A586",
    borderRadius: 20,
    padding: "6px 40px",
    "@media (max-width:480px)": {
      padding: "3px 10px",
      fontSize: 12,
    },
  },
  storyText: {
    overflow: "auto",
    paddingTop: 30,
    whiteSpace: "break-spaces",
  },
  timeText: {
    fontSize: 24,
    "@media (max-width:480px)": {
      fontSize: 12,
    },
  },
  timeCategoryContainer: {
    padding: 8,
    alignItems: "center",
  },
}));

function StoryPage() {
  const history = useHistory();
  const classes = useStyles();
  const [isPublic, setIsPublic] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [story, setStory] = useState({
    time: null,
    title: null,
    text: null,
    category: null,
  });
  const { id } = useParams();
  const userUID = useSelector((state) => state.auth.userUID);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const handlePreviousPage = () => history.goBack();

  useEffect(() => {
    fetchStoryByID({ storyID: id }).then((doc) => {
      setStory({
        time: doc.data().time.toDate().toLocaleString([], {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        title: doc.data().title,
        text: doc.data().text,
        category: doc.data().category,
      });
      setIsBookmarked(doc.data().bookmarkUserRef.includes(userUID));
    });
  }, []);

  const handleBookmark = () => {
    bookmarkStory(userUID, id);
    setIsBookmarked(!isBookmarked);
  };

  const handleDelete = () => {
    deleteStory(id);
    history.push("/forum");
  };

  return (
    <Grid container direction='column' style={{ alignContent: "center" }}>
      <NavigationBar showMenu />
      <Grid container direction='column' style={{ padding: 30 }}>
        <Typography className={classes.title}>The Storybook</Typography>
        <Grid
          container
          direction='row'
          justify='space-between'
          className={classes.timeCategoryContainer}
        >
          <Typography className={classes.timeText}>{story.time}</Typography>
          <Typography className={classes.categoryText}>
            {story.category}
          </Typography>
        </Grid>
        <Grid container className={classes.paper} direction='column'>
          <Typography className={classes.titleText}>{story.title}</Typography>
          <div
            className={classes.storyText}
            dangerouslySetInnerHTML={{ __html: story.text }}
          />
        </Grid>
        <Grid
          container
          direction='row'
          justify='space-between'
          style={{ paddingTop: 20 }}
        >
          <NextButton
            style={{ transform: "scaleX(-1)" }}
            onClick={() => handlePreviousPage()}
          />
          <Grid style={{ alignSelf: "center" }}>
            {isAdmin && (
              <Button
                className={classes.deleteButton}
                onClick={() => handleDelete()}
              >
                Delete
              </Button>
            )}
            <IconButton
              style={{
                padding: 0,
                marginRight: 12,
                minWidth: 30,
                minHeight: 40,
              }}
              onClick={() => handleBookmark()}
            >
              <img
                alt='bookmark'
                src={isBookmarked ? bookmarkIcon : noBookmarkIcon}
              />
            </IconButton>
            {isPublic && (
              <IconButton
                style={{
                  padding: 0,
                  marginRight: 12,
                  minWidth: 30,
                  minHeight: 40,
                }}
                onClick={() => history.push(`/comment/${id}`)}
              >
                <img alt='comment' src={commentIcon} />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StoryPage;
