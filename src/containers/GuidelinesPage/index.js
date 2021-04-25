import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ruleMemoImage from "../../assets/ruleBackground.png";
import NavigationBar from "../../components/NavigationBar";
import NextButton from "../../components/NextButton";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  container: {
    alignContent: "flex-start",
    "@media (max-width:480px)": {},
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 60,
    width: "70%",
    "@media (max-width:480px)": {
      width: "100%",
      fontSize: 40,
      whiteSpace: "break-spaces",
    },
  },
  paper: {
    marginLeft: 30,
    marginRight: 30,
    backgroundImage: `url(${ruleMemoImage})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    justifyContent: "center",
    height: 420,
    width: 515,
    boxShadow: "none",
    backgroundColor: "transparent",
  },
  allText: {
    height: 345,
    marginTop: 45,
    overflow: "auto",
    padding: "0 12px",
  },
  rulesDescription: {
    fontSize: 14,
    textAlign: "left",
    whiteSpace: "break-spaces",
    margin: "auto",
    paddingInlineStart: "2em",
    fontWeight: "normal",
  },
  rulesTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    paddingTop: 18,
  },
}));

function GuidelinesPage() {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <Grid container className={classes.container}>
      <NavigationBar showMenu />
      <Typography className={classes.title}>{`STORYBOOK\nRULES`}</Typography>
      <Paper className={classes.paper}>
        <Typography className={classes.allText}>
          <Typography className={classes.rulesTitle}>
            {t("guidelinesPage.respect")}
            <ul className={classes.rulesDescription}>
              <li>
              {t("guidelinesPage.avoidHurt")}
              </li>
            </ul>
          </Typography>
          <Typography className={classes.rulesTitle}>
           {t("guidelinesPage.offensivePost")}
            <ul className={classes.rulesDescription}>
              <li>
                {t("guidelinesPage.disrespectful")}
              </li>
              <li>
                {t("guidelinesPage.materialForbidden")}
              </li>
            </ul>
          </Typography>
          <Typography className={classes.rulesTitle}>
           {t("guidelinesPage.noAfraid")}
            <ul className={classes.rulesDescription}>
              <li>
                {t("guidelinesPage.shareThoughts")}
              </li>
              <li>
              {t("guidelinesPage.helpFriend")}
              </li>
            </ul>
          </Typography>
        </Typography>
      </Paper>
      <Grid
        container
        style={{ justifyContent: "flex-end", marginRight: 42, marginTop: 10 }}
      >
        <NextButton onClick={() => history.push("/home")} />
      </Grid>
    </Grid>
  );
}

export default GuidelinesPage;
