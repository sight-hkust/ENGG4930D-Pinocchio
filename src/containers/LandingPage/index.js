import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import logo from "../../assets/whaleIcon.png";
import backgroundImage from "../../assets/landingPageBackground.png";
import landingPinocchio from "../../assets/landingPinocchio.png";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "75vh",
  },
  title: {
    fontFamily: "Times",
    fontWeight: "bold",
    fontSize: "100px",
    lineHeight: "110px",
    "@media (max-width:780px)": {
      fontSize: "70px",
    },
  },
  description: {
    fontFamily: "Roboto",
    fontSize: "25px",
    lineHeight: "29px",
    textAlign: "center",
    margin: "0px",
    paddingBottom: "21px",
    "@media (max-width:780px)": {
      fontSize: "20px",
    },
  },
  button: {
    width: "225px",
    height: "72px",
    backgroundColor: "#3C79B0",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "20px",
    padding: "18px 25px 18px 25px",
    marginRight: 18,
    marginBottom: 18,
    "&:hover": {
      backgroundColor: "#3C79B0",
    },
  },
  buttonText: {
    color: "#FFFBFB",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "30px",
    textAlign: "center",
    margin: "0px",
  },
  logo: {
    height: "80px",
    paddingTop: "25px",
    paddingBottom: "25px",
  },
  landingPinocchio: {
    display: "flex",
    height: "50vh",
    "@media (max-width:780px)": {
      height: "45vh",
    },
  },
}));

function LandingPage() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img src={logo} alt='Logo' className={classes.logo} />
      <img
        src={landingPinocchio}
        alt='Logo'
        className={classes.landingPinocchio}
      ></img>
      <Typography className={classes.title}>PINOCCHIO</Typography>
      <Typography className={classes.description}>
        : a supportive community built just for our dreamers
      </Typography>
      <Button className={classes.button} variant='contained'>
        <Typography className={classes.buttonText}>SIGN UP</Typography>
      </Button>
    </div>
  );
}

export default LandingPage;
