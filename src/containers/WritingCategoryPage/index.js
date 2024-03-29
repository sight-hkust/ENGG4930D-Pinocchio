import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid, useMediaQuery } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import NavigationBar from "../../components/NavigationBar";
import depressionIcon from "../../assets/depressionIcon.png";
import motivationIcon from "../../assets/motivationIcon.png";
import examAnxietyIcon from "../../assets/examAnxietyIcon.png";
import socialAnxietyIcon from "../../assets/socialAnxietyIcon.png";
import ptsdIcon from "../../assets/ptsdIcon.png";
import panicDisorderIcon from "../../assets/panicDisorderIcon.png";
import eatingDisorderIcon from "../../assets/eatingDisorderIcon.png";
import allIcon from "../../assets/allIcon.png";
import { uploadStory } from "../../utils/uploadStory";
import DialogBox from "../../components/DialogBox";
import { processStory } from "../../utils/toxicity";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  container: {
    alignContent: "flex-end",
    "@media (max-width:480px)": {
      backgroundSize: "contain",
      backgroundPosition: "bottom",
    },
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 60,
    marginTop: 70,
    width: "70%",
    "@media (max-width:480px)": {
      lineHeight: 1,
      width: "100%",
      fontSize: 27,
      fontWeight: "bold",
      marginTop: 50,
    },
  },
  description: {
    fontSize: 30,
    alignSelf: "center",
    margin: 0,
    paddingBottom: 60,
    "@media (max-width:480px)": {
      color: "#838181",
      fontSize: 20,
      paddingBottom: 0,
      paddingTop: 5,
    },
  },
  button: {
    padding: "8px 14px",
    marginBottom: 30,
    marginLeft: 12,
    backgroundColor: "#F9A586",
    borderRadius: 20,
    alignSelf: "flex-end",
    "&:hover": {
      backgroundColor: "#F9A586",
    },
  },
  interestButton: {
    height: "auto",
    width: 200,
    "&:hover": {
      backgroundColor: "#FFFFFF",
    },
    "@media (max-width:480px)": {
      height: "auto",
      width: "auto",
      marginLeft: 0,
    },
  },
  buttonText: {
    color: "#000000",
    fontSize: 25,
    paddingTop: 10,
    textAlign: "center",
    textTransform: "capitalize",
    margin: 0,
    "@media (max-width:480px)": {
      fontSize: 15,
    },
  },
  inputForm: {
    display: "flex",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  buttonGroup: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  buttonBoldText: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "Capitalize",
  },
}));

function WritingCategoryPage() {
  const classes = useStyles();
  const history = useHistory();
  const [selected, setSelected] = useState();
  const [openDialogPublishForAll, setOpenDialogPublishForAll] = useState(false);
  const [openDialogPublishForMe, setOpenDialogPublishForMe] = useState(false);
  const isMobile = useMediaQuery("(max-width:480px)");
  const userUID = useSelector((state) => state.auth.userUID);
  const { t } = useTranslation();

  const interests = [
    ["Depression", depressionIcon],
    ["Motivation", motivationIcon],
    ["Exam Anxiety", examAnxietyIcon],
    ["Social Anxiety", socialAnxietyIcon],
    ["PTSD", ptsdIcon],
    ["Panic Disorder", panicDisorderIcon],
    ["Eating Disorder", eatingDisorderIcon],
    ["All", allIcon],
  ];

  const comfirmUpload = ({ isPublic }) => {
    if (isPublic) {
      setOpenDialogPublishForAll(true);
    } else {
      setOpenDialogPublishForMe(true);
    }
  };

  const handleUpload = ({ isPublic }) => {
    var myStorage = window.sessionStorage;
    let title = myStorage.getItem("title");
    let storyText = myStorage.getItem("storyText");
    let storyTextHTML = myStorage.getItem("storyTextHTML");
    if (title && storyText && storyTextHTML && selected !== undefined) {
      console.log({ title, storyText, storyTextHTML });
      if (isPublic) {
        processStory(
          userUID,
          title,
          storyText,
          storyTextHTML,
          interests[selected][0]
        );
      } else {
        uploadStory(
          userUID,
          storyTextHTML,
          title,
          interests[selected][0],
          false // Private post
        );
      }
      history.push("/forum");
    } else {
      throw Error("ERROR_NO_STORY_IN_SESSION_STORAGE");
    }
  };

  return (
    <Grid container className={classes.container} direction='column'>
      <Grid container item direction='column' className={classes.inputForm}>
        <NavigationBar showMenu />
        <Typography className={classes.title}>
          {t("writingCategoryPage.writeThoughts")}
        </Typography>
        <Typography className={classes.description}>
          {t("writingCategoryPage.chooseCategory")}
        </Typography>
        <Grid
          container
          item
          xs={isMobile ? "auto" : 7}
          className={classes.buttonGroup}
        >
          {interests.map((interest, index) => (
            <Button
              className={classes.interestButton}
              key={index}
              onClick={() => {
                setSelected(index);
              }}
              disableRipple
            >
              <Grid
                container
                item
                direction='column'
                style={{ alignItems: "center" }}
              >
                <span
                  style={{
                    width: isMobile ? 98 : 130,
                    height: isMobile ? 98 : 130,
                    backgroundColor: selected === index ? "#FEBD7D" : "#FFD7D7",
                    borderRadius: "50%",
                  }}
                >
                  <img alt='' src={interest[1]} style={{ paddingTop: 29 }} />
                </span>
                <Typography className={classes.buttonText}>
                  {interest[0]}
                </Typography>
              </Grid>
            </Button>
          ))}
        </Grid>
        {selected >= 0 && (
          <Grid container direction='row' justify='flex-end'>
            <Button
              className={classes.button}
              onClick={() => comfirmUpload({ isPublic: false })}
            >
              <Typography className={classes.buttonBoldText}>
                {t("writingCategoryPage.publishMe")}
              </Typography>
            </Button>
            <Button
              className={classes.button}
              style={{ backgroundColor: "#FEBD7D" }}
              onClick={() => comfirmUpload({ isPublic: true })}
            >
              <Typography className={classes.buttonBoldText}>
                {t("writingCategoryPage.publishAll")}
              </Typography>
            </Button>
          </Grid>
        )}
      </Grid>
      <DialogBox
        open={openDialogPublishForAll}
        text={t("writingCategoryPage.publishAllQuestion")}
        onClickYes={() => handleUpload({ isPublic: true })}
        onClickNo={() => setOpenDialogPublishForAll(false)}
        onClose={() => setOpenDialogPublishForAll(false)}
      ></DialogBox>
      <DialogBox
        open={openDialogPublishForMe}
        text={t("writingCategoryPage.publishMeQuestion")}
        onClickYes={() => handleUpload({ isPublic: false })}
        onClickNo={() => setOpenDialogPublishForMe(false)}
        onClose={() => setOpenDialogPublishForMe(false)}
      ></DialogBox>
    </Grid>
  );
}

export default WritingCategoryPage;
