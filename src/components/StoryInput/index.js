import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Input, Button } from "@material-ui/core";
import NextButton from "../../components/NextButton";
import { Editor, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 10vw",
    "@media (max-width:480px)": {
      padding: "0 2vw",
    },
  },
  inputBodyTextContainer: {
    width: "80vw",
    height: "60vh",
    overflow: "auto",
    // margin: "0 50px 20px",
    borderRadius: 30,
    backgroundColor: "#FFD7D7",
    paddingTop: 50,
    paddingLeft: 50,
    "@media (max-width:480px)": {
      margin: "0 20px",
      marginBottom: 20,
    },
  },
  inputTitleContainer: {
    // width: "80vw",
    margin: "20px 0",
    borderRadius: 30,
    backgroundColor: "#FFD7D7",
    overflow: "auto",
    "@media (max-width:480px)": {
      margin: "0px 20px",
      marginBottom: 15,
    },
  },
  inputBodyText: {
    fontSize: 23,
    flex: "auto",
    alignItems: "baseline",
    margin: "0px 38px",
    padding: "20px 0px",
    color: "#515151",
    height: 500,
    overflow: "auto",
    "@media (max-width:480px)": {
      fontSize: 20,
    },
  },
  inputTitle: {
    overflow: "auto",
    height: 60,
    fontSize: 25,
    color: "#515151",
    fontWeight: "bold",
    margin: "5px 38px",
    "@media (max-width:480px)": {
      fontSize: 22,
    },
  },
  styleButtonContainer: {
    width: "100vw",
    "@media (max-width:480px)": {
      margin: "30px 6vw 10px 6vw",
    },
  },
  styleButton: {
    backgroundColor: "#F9A586",
    borderRadius: 10,
    textTransform: "unset",
    padding: 0,
    marginRight: 20,
    minWidth: 60,
    "@media (max-width:480px)": {
      height: 20,
      minWidth: 35,
    },
  },
}));

function StoryInput(props) {
  const {
    isDraft,
    isBookmarked,
    color,
    storyText,
    onBodyTextChange,
    onTitleChange,
    onSubmit,
    editorState,
    onChange,
    editorRef,
    ...restProps
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  const focus = () => {
    if (editorRef.current) editorRef.current.focus();
  };

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };
  const onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };
  const onUnderlineClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  return (
    <Grid container className={classes.container}>
      <Grid
        container
        direction='row'
        justify='space-between'
        className={classes.styleButtonContainer}
      >
        <Grid
          container
          direction='row'
          style={{ width: "auto", alignItems: "center" }}
        >
          <Button
            className={classes.styleButton}
            onMouseDown={(e) => {
              e.preventDefault();
              onBoldClick();
            }}
          >
            <b>B</b>
          </Button>
          <Button
            className={classes.styleButton}
            onMouseDown={(e) => {
              e.preventDefault();
              onItalicClick();
            }}
          >
            <i>l</i>
          </Button>
          <Button
            className={classes.styleButton}
            onMouseDown={(e) => {
              e.preventDefault();
              onUnderlineClick();
            }}
          >
            <i>
              <u>U</u>
            </i>
          </Button>
        </Grid>
        <NextButton onClick={() => onSubmit()} style={{ padding: 0 }} />
      </Grid>
      <Grid container className={classes.inputTitleContainer}>
        <Input
          disableUnderline
          multiline
          placeholder= {t("storyInput.enterTitle")}
          className={classes.inputTitle}
          value={storyText}
          onChange={onTitleChange}
          inputProps={{ style: { width: "70vw" } }}
          {...restProps}
        ></Input>
      </Grid>
      <Grid className={classes.inputBodyTextContainer} onClick={() => focus()}>
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={onChange}
          placeholder= {t("storyInput.startWriting")}
          spellCheck={true}
        />
      </Grid>
    </Grid>
  );
}

export default StoryInput;
