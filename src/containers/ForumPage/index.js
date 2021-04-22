import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import StoryPreviewCard from "../../components/StoryPreviewCard";
import NavigationBar from "../../components/NavigationBar";
import { fetchNextFiveStories, fetchStory } from "../../utils/fetchStory";
import { checkStoryBookmarked } from "../../utils/bookmarkStory";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    fontSize: 50,
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
  const [isBookmarked, setIsBookmarked] = useState([]);
  const userUID = useSelector((state) => state.auth.userUID);

  useEffect(() => {
    setStories([]);
    fetchStory({ isPublic: true, numberOfStory: 5 }).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setStories((oldStories) => [...oldStories, [doc.id, doc.data()]]);
        checkStoryBookmarked(userUID, doc.id).then((result) =>
          setIsBookmarked((oldResults) => [...oldResults, result])
        );
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    fetchNextFiveStories({ isPublic: true }).then((querySnapshot) => {
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          setStories((oldStories) => [...oldStories, [doc.id, doc.data()]]);
          checkStoryBookmarked(userUID, doc.id).then((result) =>
            setIsBookmarked((oldResults) => [...oldResults, result])
          );
        });
      } else {
        setHasMoreStories(false);
      }
    });
  };

  return (
    <Grid container direction='column' style={{ alignContent: "center" }}>
      <NavigationBar showMenu />
      <Typography className={classes.title}>
        The{" "}
        <span style={{ boxShadow: "inset 0 -18px 0 0 #FEBD7D" }}>
          Storybook
        </span>
      </Typography>
      <InfiniteScroll
        dataLength={stories.length}
        next={fetchData}
        hasMore={hasMoreStories}
        style={{ textAlign: "center" }}
        scrollableTarget='scrollGrid'
      >
        {stories.map((story, index) => (
          <StoryPreviewCard
            key={index}
            isBookmarked={isBookmarked[index]}
            title={story[1].title}
            category={story[1].category}
            storyText={story[1].text}
            date={story[1].time.toDate().toLocaleString([], {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
            storyID={story[0]}
          />
        ))}
      </InfiniteScroll>
    </Grid>
  );
}

export default ForumPage;
