import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider, Button, Input } from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import NavigationBar from "../../components/NavigationBar";
import NextButton from "../../components/NextButton";
import commentIcon from "../../assets/commentIcon.png";
import { fetchStoryByID } from "../../utils/fetchStory";
import { uploadComment } from "../../utils/uploadComment";
import { useTranslation } from "react-i18next";

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
    height: "70vh",
    padding: 29,
    backgroundColor: "#FFD7D7",
    borderRadius: 30,
    flexWrap: "nowrap",
    justifyContent: "space-between",
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

function CommentPage() {
  const history = useHistory();
  const classes = useStyles();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState();
  const { id } = useParams();
  const handlePreviousPage = () => history.push("/forum");
  const userUID = useSelector((state) => state.auth.userUID);
  const { t } = useTranslation();

  useEffect(() => {
    fetchComment();
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

  return (
    <Grid container direction='column' style={{ alignContent: "center" }}>
      <NavigationBar showMenu />
      <Grid container direction='column' style={{ padding: 30 }}>
        <Typography className={classes.title}>The Storybook</Typography>
        <Grid container className={classes.paper} direction='column'>
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
                placeholder= {t("commentPage.writeComment")}
                disableUnderline
                multiline
                onChange={(e) => setNewComment(e.target.value)}
                value={newComment}
              />
            </Grid>
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
                Send
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction='row' justify='space-between'>
          <NextButton
            style={{ transform: "scaleX(-1)" }}
            onClick={() => handlePreviousPage(id)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CommentPage;
