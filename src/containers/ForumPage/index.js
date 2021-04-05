import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Snackbar } from "@material-ui/core";
import StoryInput from "../../components/StoryInput";
import NavigationBar from "../../components/NavigationBar";
import ForumBottomBar from "../../components/ForumBottomBar";
import { fetchStory } from "../../utils/fetchStory";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
    alignContent: "flex-start",
    "@media (max-width:480px)": {
      justifyContent: "space-around",
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: 60,
    lineHeight: "normal",
    textAlign: "center",
    "@media (max-width:480px)": {
      paddingLeft: 35,
      paddingTop: 10,
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
  buttonBoldText: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
  },
  buttonNormalText: {
    fontSize: 12,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    marginTop: 16,
    paddingRight: 16,
  },
}));

function ForumPage() {
  const classes = useStyles();
  const [text, setText] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEndOfList, setIsEndOfList] = useState(false);
  const [isLatestStory, setIsLatestStory] = useState(false);

  useEffect(() => {
    fetchStory({ isPublic: true, index: currentIndex })
      .then((text) => setText(text))
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (newIndex) => {
    if (newIndex >= 0) {
      fetchStory({ isPublic: true, index: newIndex })
        .then((text) => {
          setCurrentIndex(newIndex);
          setText(text);
        })
        .catch(() => setIsEndOfList(true));
    } else {
      setIsLatestStory(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    isEndOfList && setIsEndOfList(false);
    isLatestStory && setIsLatestStory(false);
  };

  return (
    <Grid container direction='column' className={classes.container}>
      <NavigationBar showMenu />
      <Typography className={classes.title}>OUR STORY</Typography>
      <StoryInput isDraft={false} color='yellow' storyText={text} />
      <ForumBottomBar
        nextPageClick={() => handleClick(currentIndex + 1)}
        previousPageClick={() => handleClick(currentIndex - 1)}
      />
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
      />
    </Grid>
  );
}

export default ForumPage;
