import React, { useState, useRef, useEffect } from "react";
import firebase from "firebase/app";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import StoryInput from "../../components/StoryInput";
import NavigationBar from "../../components/NavigationBar";
import { useHistory } from "react-router";
import { EditorState, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import sanitizeHtml from "sanitize-html";
import DialogBox from "../../components/DialogBox";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    fontSize: 60,
    lineHeight: "normal",
    textAlign: "center",
    paddingBottom: 30,
    whiteSpace: "break-spaces",
    "@media (max-width:480px)": {
      paddingBottom: 0,
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
    padding: 16,
  },
}));

function WritingPage() {
  const history = useHistory();
  const classes = useStyles();
  const [title, setTitle] = useState();
  const [open, setOpen] = useState(false);
  const [userEmailVerified, setUserEmailVerified] = useState();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const editorRef = useRef(null);
  const isString = /.*[a-zA-Z].*/;
  const { t } = useTranslation();

  const handleSubmit = () => {
    var myStorage = window.sessionStorage;
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const originalText = blocks
      .map((block) => (!block.text.trim() && "\n") || block.text)
      .join("\n");
    const sanitizeTitle = sanitizeHtml(title, {
      allowedTags: ["b", "em", "strong", "u"],
    });
    const sanitizeText = sanitizeHtml(originalText, {
      allowedTags: ["b", "em", "strong", "u"],
    });
    const sanitizedTextHTML = sanitizeHtml(
      stateToHTML(editorState.getCurrentContent()),
      { allowedTags: ["b", "em", "strong", "u"] }
    );
    if (
      // isString.test(originalText) &&
      sanitizeTitle &&
      sanitizeText &&
      sanitizedTextHTML
    ) {
      myStorage.setItem("title", sanitizeTitle);
      myStorage.setItem("storyText", sanitizeText);
      myStorage.setItem("storyTextHTML", sanitizedTextHTML);
      history.push("/writingCategory");
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const check = async () => {
      const user = await firebase.auth().currentUser.emailVerified;
      setUserEmailVerified(user);
    };
    check();
  }, []);

  return (
    <Grid container direction='column' style={{ alignContent: "center" }}>
      <NavigationBar showMenu />
      <Typography className={classes.title}>
        {t("writingPage.writeYourText")}{" "}
        <span style={{ boxShadow: "inset 0 -18px 0 0 #FEBD7D" }}>
          {t("writingPage.thoughtsText")}
        </span>
      </Typography>
      <StoryInput
        editorState={editorState}
        onChange={setEditorState}
        onTitleChange={(e) => setTitle(e.target.value)}
        onSubmit={handleSubmit}
        editorRef={editorRef}
      />
      <DialogBox
        open={open}
        text={t("writingPage.invalidInfo")}
        onClose={handleClose}
        onClickYes={handleClose}
        yesText={t("writingPage.okText")}
      ></DialogBox>
      <DialogBox
        open={!userEmailVerified}
        text={t("writingPage.notVerified")}
        onClose={() => setUserEmailVerified(false)}
        onClickYes={() => setUserEmailVerified(false)}
        yesText={t("writingPage.okText")}
      ></DialogBox>
    </Grid>
  );
}

export default WritingPage;
