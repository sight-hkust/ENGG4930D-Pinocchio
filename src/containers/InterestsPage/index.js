import { Button, Grid, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import allIcon from "../../assets/allIcon.png";
import depressionIcon from "../../assets/depressionIcon.png";
import eatingDisorderIcon from "../../assets/eatingDisorderIcon.png";
import examAnxietyIcon from "../../assets/examAnxietyIcon.png";
import motivationIcon from "../../assets/motivationIcon.png";
import panicDisorderIcon from "../../assets/panicDisorderIcon.png";
import ptsdIcon from "../../assets/ptsdIcon.png";
import socialAnxietyIcon from "../../assets/socialAnxietyIcon.png";
import NavigationBar from "../../components/NavigationBar";
import NextButton from "../../components/NextButton";
import { addInterests } from "../../utils/addInterests";

const useStyles = makeStyles((theme) => ({
  container: {
    alignContent: "flex-end",
    "@media (max-width:480px)": {},
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 60,
    marginTop: 22,
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
    paddingBottom: 0,
    paddingTop: 5,
    color: "#838181",
    "@media (max-width:480px)": {
      fontSize: 20,
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
    paddingRight: 5,
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
  buttonGroupImage: {
    width: "100vw",
  },
  buttonGroup: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  interestImage: {
    paddingTop: 35,
    height: 70,
    "@media (max-width:480px)": {
      paddingTop: 29,
      height: 43,
    },
  },
}));

function InterestsPage() {
  const classes = useStyles();
  const history = useHistory();
  const [selected, setSelected] = useState([]);
  const isMobile = useMediaQuery("(max-width:480px)");
  const userUID = useSelector((state) => state.auth.userUID);
  const { t } = useTranslation();

  const interests = [
    [t("interestsPage.depression"), depressionIcon],
    [t("interestsPage.motivation"), motivationIcon],
    [t("interestsPage.examAnxiety"), examAnxietyIcon],
    [t("interestsPage.socialAnxiety"), socialAnxietyIcon],
    [t("interestsPage.ptsd"), ptsdIcon],
    [t("interestsPage.panicDisorder"), panicDisorderIcon],
    [t("interestsPage.eatingDisorder"), eatingDisorderIcon],
    [t("interestsPage.all"), allIcon],
  ];

  const handleSubmit = () => {
    addInterests(
      userUID,
      selected.map((index) => interests[index][0])
    );
    history.push("/survey");
  };

  return (
    <Grid container className={classes.container} direction='column'>
      <Grid container item direction='column' className={classes.inputForm}>
        <NavigationBar showMenu />
        <b className={classes.title}>
          {t("interestsPage.chooseYourText")}
          <span style={{ boxShadow: "inset 0 -18px 0 0 #FEBD7D" }}>
            {t("interestsPage.interestsText")}
          </span>
        </b>
        <Typography className={classes.description}>
          {t("interestsPage.heartDesireText")}
        </Typography>
        <Grid
          container
          item
          xs={isMobile ? "auto" : 7}
          className={classes.buttonGroup}
        >
          {interests.map((interest, index) => (
            <Button
              disableRipple
              className={classes.interestButton}
              key={index}
              onClick={() => {
                if (selected.includes(index)) {
                  setSelected(selected.filter((item) => item !== index));
                } else {
                  setSelected([...selected, index]);
                }
              }}
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
                    backgroundColor:
                      selected.includes(index) === true ? "#FEBD7D" : "#FFD7D7",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    alt=''
                    src={interest[1]}
                    className={classes.interestImage}
                  />
                </span>
                <Typography className={classes.buttonText}>
                  {interest[0]}
                </Typography>
              </Grid>
            </Button>
          ))}
        </Grid>
        {selected.length !== 0 && (
          <NextButton
            style={{ marginRight: "10vw" }}
            onClick={() => handleSubmit()}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default InterestsPage;
