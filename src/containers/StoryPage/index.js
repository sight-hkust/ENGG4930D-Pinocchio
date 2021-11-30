import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Divider,
  IconButton,
  Button,
  Input,
  useMediaQuery,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import firebase from "firebase/app";
import { useTranslation } from "react-i18next";
import NavigationBar from "../../components/NavigationBar";
import NextButton from "../../components/NextButton";
import commentIcon from "../../assets/commentIcon.png";
import bookmarkIcon from "../../assets/bookmarkedIcon.png";
import noBookmarkIcon from "../../assets/noBookmarkIcon.png";
import { bookmarkStory } from "../../utils/bookmarkStory";
import { fetchStoryByID } from "../../utils/fetchStory";
import { deleteStory } from "../../utils/deleteStory";
import { uploadComment } from "../../utils/uploadComment";
import { encodeUserUID } from "../../utils/auth";

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
    "@media (min-width:480px)": {
      width: "45vw",
    },
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
    WebkitLineClamp: 2,
    textOverflow: "ellipsis",
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
  commentPaper: {
    height: "70vh",
    padding: 29,
    backgroundColor: "#FFD7D7",
    borderRadius: 30,
    flexWrap: "nowrap",
    justifyContent: "space-between",
    "@media (min-width:480px)": {
      width: "45vw",
    },
  },
  divider: {
    backgroundColor: "black",
  },
  commentInput: {
    overflow: "auto",
    height: 200,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "baseline",
    padding: 20,
  },
}));

function StoryPage() {
  const history = useHistory();
  const classes = useStyles();
  const [isPublic, setIsPublic] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState();
  const [userEmailVerified, setUserEmailVerified] = useState();
  const [story, setStory] = useState({
    time: null,
    title: null,
    text: null,
    category: null,
  });
  const { id } = useParams();
  const userUID = useSelector((state) => state.auth.userUID);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:480px)");

  const handlePreviousPage = () => history.goBack();

  useEffect(() => {
    const check = async () => {
      const user = await firebase.auth().currentUser.emailVerified;
      setUserEmailVerified(user);
    };
    check();
    fetchComment();
  }, []);

  useEffect(() => {
    fetchStoryByID({ storyID: id }).then((doc) => {
      setStory({
        time: doc.data().createdTime.toDate().toLocaleString([], {
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
      setIsBookmarked(
        doc.data().bookmarkUsersID.includes(encodeUserUID(userUID))
      );
    });
  }, []);

  const fetchComment = () => {
    fetchStoryByID({ storyID: id }).then((doc) => {
      if (doc.data().isPublic) {
        setComments(doc.data().comments);
      } else {
        throw Error("ERROR_NO_PERMISSION");
      }
    });
  };

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
        <Typography className={classes.title}>
          {t("storyPage.theStoryBook")}
        </Typography>
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
        <Grid container direction='row' justify='space-between'>
          <Grid container className={classes.paper} direction='column'>
            <Typography className={classes.titleText}>{story.title}</Typography>
            <div
              className={classes.storyText}
              dangerouslySetInnerHTML={{ __html: story.text }}
            />
          </Grid>
          {!isMobile && (
            <Grid container className={classes.commentPaper} direction='column'>
              <Grid container direction='row'>
                <img alt='comment' src={commentIcon} />
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    whiteSpace: "pre-line",
                    marginLeft: 10,
                  }}
                >
                  {t("commentPage.comments")}
                </Typography>
              </Grid>
              <div style={{ overflow: "auto", marginBottom: 15 }}>
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <>
                      <Typography
                        key={`typo${comment}`}
                        style={{ padding: "14px 0" }}
                      >
                        "{comment}"
                      </Typography>
                      {index < comments.length - 1 && (
                        <Divider
                          key={`divider${index}`}
                          classes={{ root: classes.divider }}
                        />
                      )}
                    </>
                  ))
                ) : (
                  <>
                    <Typography
                      style={{ padding: "14px 0", whiteSpace: "pre-line" }}
                    >
                      {t("commentPage.noComments")}
                    </Typography>
                    <Divider
                      classes={{ root: classes.divider }}
                      style={{ marginBottom: "10vh" }}
                    />
                  </>
                )}
              </div>
              <Grid container direction='column'>
                <Grid container className={classes.commentInput}>
                  <Input
                    style={{ width: "80vw" }}
                    placeholder={
                      userUID
                        ? userEmailVerified
                          ? t("commentPage.writeComment")
                          : t("commentPage.notEmailVerified")
                        : t("commentPage.notLoggedIn")
                    }
                    disableUnderline
                    multiline
                    onChange={(e) => setNewComment(e.target.value)}
                    value={newComment}
                  />
                </Grid>
                {userUID && userEmailVerified && (
                  <Grid
                    container
                    direction='row'
                    style={{ justifyContent: "flex-end" }}
                  >
                    <Button
                      style={{
                        backgroundColor: "#F9A586",
                        borderRadius: 20,
                        textTransform: "none",
                        maxHeight: 24,
                        marginTop: 8,
                      }}
                      onClick={() => {
                        uploadComment(userUID, id, newComment);
                        setTimeout(() => {
                          fetchComment();
                          setNewComment("");
                        }, 500);
                      }}
                    >
                      {t("commentPage.send")}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          )}
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
                {t("storyPage.deleteText")}
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
              {userUID && (
                <img
                  alt='bookmark'
                  src={isBookmarked ? bookmarkIcon : noBookmarkIcon}
                />
              )}
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
