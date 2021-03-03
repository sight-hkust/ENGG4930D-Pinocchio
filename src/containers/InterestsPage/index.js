import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import backgroundImage from "../../assets/interestsPageBackground.png";
import arrowRight from "../../assets/arrowRight.png";
import fairyLogo from "../../assets/fairy.png";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    alignItems: "flex-end",
  },
  title: {
    fontFamily: "Times",
    fontWeight: "bold",
    fontSize: "60px",
    "@media (max-width:780px)": {
      fontSize: "30px",
    },
  },
  description: {
    fontFamily: "Roboto",
    fontSize: "30px",
    alignSelf: "center",
    margin: "0px",
    paddingBottom: "21px",
    "@media (max-width:780px)": {
      fontSize: "20px",
    },
  },
  button: {
    width: "95px",
    height: "77px",
    backgroundColor: "#3C79B0",
    color: "#FFFFFF",
    borderRadius: "15px",
    alignSelf: "flex-end",
    "&:hover": {
      backgroundColor: "#3C79B0",
    },
  },
  inputForm: {
    display: "flex",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "flex-start",
  },
}));

function InterestsPage() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid container item direction='column' className={classes.inputForm}>
        <Typography className={classes.title}>
          WHEN YOU WISH UPON A STAR...
        </Typography>
        <Typography className={classes.description}>
          choose the topics that your heart desires{" "}
        </Typography>
        <Button className={classes.button} variant='contained'>
          <img src={arrowRight} width='80%' alt='nextPage'></img>
        </Button>
      </Grid>
      <img
        src={fairyLogo}
        alt='fairyLogo'
        width='35%'
        style={{
          alignSelf: "flex-end",
          marginLeft: "auto",
          paddingRight: "15px",
        }}
      ></img>
    </Grid>
  );
}

export default InterestsPage;
