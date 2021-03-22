import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import mobileBackgroundImage from "../../assets/guidelinesPageMobileBg.png";
import ruleMemoImage from "../../assets/ruleBackground.png";
import NavigationBar from "../../components/NavigationBar";
import NextButton from "../../components/NextButton";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
    backgroundImage: `url(${mobileBackgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    alignContent: "flex-start",
    "@media (max-width:480px)": {
      backgroundImage: `url(${mobileBackgroundImage})`,
    },
  },
  title: {
    fontFamily: "Times",
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

  return (
    <Grid container className={classes.container}>
      <NavigationBar showMenu />
      <Typography className={classes.title}>{`STORYBOOK\nRULES`}</Typography>
      <Paper className={classes.paper}>
        <Typography className={classes.allText}>
          <Typography className={classes.rulesTitle}>
            1. remain respectful at all times:
            <ul className={classes.rulesDescription}>
              <li>
                All posts and comments should be kept courteous to avoid hurting
                other community members.
              </li>
            </ul>
          </Typography>
          <Typography className={classes.rulesTitle}>
            2. do not post offensive posts and links:
            <ul className={classes.rulesDescription}>
              <li>
                Any posts disrespectful to those of other genders, races,
                classes, or sexual orientations are not allowed.
              </li>
              <li>
                Any material that constitutes defamation, abuse, threats, or
                harassment is strictly forbidden.
              </li>
            </ul>
          </Typography>
          <Typography className={classes.rulesTitle}>
            3. don't be afraid to share and lend a helping hand!:
            <ul className={classes.rulesDescription}>
              <li>
                Try to share your thoughts and experiences regarding mental
                health. We're sure many others can relate, even if you don't
                think so!
              </li>
              <li>
                If you can, help out a fellow friend and offer some encouraging
                words to those facing tough times.
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
