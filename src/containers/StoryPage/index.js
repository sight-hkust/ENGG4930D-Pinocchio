import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, IconButton } from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import NavigationBar from "../../components/NavigationBar";
import NextButton from "../../components/NextButton";
import commentIcon from "../../assets/commentIcon.png";
import bookmarkIcon from "../../assets/bookmarkedIcon.png";
import noBookmarkIcon from "../../assets/noBookmarkIcon.png";
import { bookmarkStory, checkStoryBookmarked } from "../../utils/bookmarkStory";
import { fetchStoryByID } from "../../utils/fetchStory";

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
    });
    checkStoryBookmarked(id).then((result) => setIsBookmarked(result));
  }, []);

  const handleBookmark = () => {
    bookmarkStory(id);
    setIsBookmarked(!isBookmarked);
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
          style={{ padding: "8px 8px 15px" }}
        >
          <Typography>{story.time}</Typography>
          <Typography
            style={{
              fontSize: 12,
              backgroundColor: "#F9A586",
              borderRadius: 20,
              padding: "3px 10px",
            }}
          >
            {story.category}
          </Typography>
        </Grid>
        <Grid container className={classes.paper} direction='column'>
          <Typography
            style={{ fontWeight: "bold", fontSize: 20, whiteSpace: "pre-line" }}
          >
            {story.title}
          </Typography>
          <Typography style={{ overflow: "auto", paddingTop: 30 }}>
            {story.text}
          </Typography>
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
