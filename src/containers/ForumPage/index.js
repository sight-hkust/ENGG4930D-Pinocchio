import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Snackbar } from "@material-ui/core";
import firebase from "firebase/app";
import InfiniteScroll from "react-infinite-scroll-component";
import StoryPreviewCard from "../../components/StoryPreviewCard";
import NavigationBar from "../../components/NavigationBar";
import { fetchNextFiveStories, fetchStory } from "../../utils/fetchStory";

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
}));

function ForumPage() {
  const classes = useStyles();
  const [stories, setStories] = useState([]);
  const [hasMoreStories, setHasMoreStories] = useState(true);

  useEffect(() => {
    fetchStory({ isPublic: true }).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setStories((oldStories) => [...oldStories, [doc.id, doc.data()]]);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkBookmark = (bookmarkUserRef) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        return bookmarkUserRef.includes(user.uid);
      }
    });
  };

  const fetchData = () => {
    fetchNextFiveStories({ isPublic: true }).then((querySnapshot) => {
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          setStories((oldStories) => [...oldStories, [doc.id, doc.data()]]);
        });
      } else {
        setHasMoreStories(false);
      }
    });
  };

  return (
    <Grid container direction='column' style={{ alignContent: "center" }}>
      <NavigationBar showMenu />
      <Typography className={classes.title}>The Storybook</Typography>
      <InfiniteScroll
        dataLength={stories.length}
        next={fetchData}
        hasMore={hasMoreStories}
      >
        {stories.map((story, index) => (
          <StoryPreviewCard
            key={index}
            isBookmarked={checkBookmark(story[1].bookmarkUserRef)}
            isPublic
            title={story[1].title}
            category={story[1].category}
            storyText={story[1].text}
            date={story[1].time.toDate().toDateString()}
            storyID={story[0]}
          />
        ))}
      </InfiniteScroll>
      {/* 
      <Snackbar
        open={isEndOfList || isLatestStory}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={2000}
        message={
          isEndOfList ? "End of the road🥳" : "This is the Latest Story!"
        }
        ContentProps={{ style: { backgroundColor: "#3546a2" } }}
        style={{ marginBottom: "10vh" }}
      /> */}
    </Grid>
  );
}

export default ForumPage;
