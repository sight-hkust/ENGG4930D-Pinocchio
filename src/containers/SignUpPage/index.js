import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid, useMediaQuery } from "@material-ui/core";
import backgroundImage from "../../assets/signupPageBackground.png";
import mobileBackgroundImage from "../../assets/signupMobileBg.png";
import arrowRight from "../../assets/arrowRight.png";
import NavigationBar from "../../components/NavigationBar";
import Input from "../../components/Input";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    alignContent: "flex-start",
    contain: "content",
    "@media (max-width:480px)": {
      backgroundImage: `url(${mobileBackgroundImage})`,
    },
  },
  title: {
    fontFamily: "Times",
    fontWeight: "bold",
    fontSize: 60,
    lineHeight: "normal",
    "@media (max-width:480px)": {
      fontSize: "30px",
      wordWrap: "break-word",
    },
  },
  description: {
    fontFamily: "Roboto",
    fontSize: "30px",
    textAlign: "center",
    margin: "0px",
    paddingBottom: "21px",
    marginRight: 35,
    "@media (max-width:480px)": {
      fontSize: "13px",
    },
  },
  button: {
    width: 95,
    height: 77,
    backgroundColor: "#3C79B0",
    color: "#FFFFFF",
    borderRadius: "15px",
    alignSelf: "flex-end",
    "&:hover": {
      backgroundColor: "#3C79B0",
    },
    "@media (max-width:480px)": {
      width: 45,
      height: 36,
      marginTop: 8,
      minWidth: 45,
      padding: "6px 6px",
    },
  },
  inputForm: {
    display: "flex",
    alignContent: "flex-end",
    marginTop: 50,
    marginRight: 108,
    alignItems: "flex-end",
    "@media (max-width:480px)": {
      marginTop: 12,
      alignItems: "flex-start",
      marginLeft: 22,
    },
  },
  startMyJourneyText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#3C79B0",
    letterSpacing: "0.14em",
    paddingRight: 28,
    alignSelf: "center",
    "@media (max-width:480px)": {
      fontSize: 12,
      paddingTop: 10,
    },
  },
  confirmContainer: {
    justifyContent: "flex-end",
    "@media (max-width:480px)": {
      display: "table-column",
    },
  },
}));

function SignUpPage() {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:480px)");

  return (
    <Grid container className={classes.container}>
      <NavigationBar />
      <Grid container item direction='column' className={classes.inputForm}>
        <Typography className={classes.title}>
          DEAR {isMobile && <br />}
          DREAMER,
        </Typography>
        <Typography className={classes.description}>
          come on in and join our community
        </Typography>
        <Input size={isMobile ? "small" : "medium"} label='USERNAME'></Input>
        <Input
          size={isMobile ? "small" : "medium"}
          label='ITSC ACCOUNT'
        ></Input>
        <Input size={isMobile ? "small" : "medium"} label='SECRET WORD'></Input>
        <Grid container className={classes.confirmContainer}>
          <Typography className={classes.startMyJourneyText}>
            start my journey
          </Typography>
          <Button className={classes.button} variant='contained'>
            <img alt='arrowRight' src={arrowRight} width='80%'></img>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SignUpPage;
