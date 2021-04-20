import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, useMediaQuery, InputBase } from "@material-ui/core";
import NextButton from "../../components/NextButton";
import { sendPasswordResetEmail } from "../../utils/auth";
import loginLogoMobile from "../../assets/loginLogoMobile.png";
import loginLogoDesktop from "../../assets/loginLogoDesktop.png";
import NavigationBar from "../../components/NavigationBar";

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    lineHeight: 1,
    fontSize: 50,
    textAlign: "center",
    paddingTop: 25,
    "@media (max-width:480px)": {
      fontSize: 35,
      paddingTop: 0,
      marginTop: "5vh",
    },
  },
  inputForm: {
    width: "auto",
    padding: "15vh 15vw 0vh",
    "@media (max-width:480px)": {
      padding: "2vh 15vw 0vh",
    },
  },
  errorMessage: {
    color: "#FF0000",
    fontSize: 14,
    textAlign: "end",
  },
  inputLabel: {
    color: "#838181",
    textAlign: "left",
    fontSize: 14,
    marginTop: 18,
  },
  input: {
    backgroundColor: "#EAEAEA",
    padding: "12px 12px",
    marginBottom: 18,
    minWidth: 216,
  },
  description: {
    fontSize: 25,
    textAlign: "center",
    margin: 0,
    paddingTop: "2vh",
    color: "#838181",
    "@media (max-width:480px)": {
      fontSize: 20,
      paddingTop: "2vh",
    },
  },
  loginLogo: {
    position: "absolute",
    bottom: 0,
    right: 0,
    height: "90vh",
    zIndex: -1,
    "@media (max-width:480px)": {
      position: "absolute",
      bottom: 0,
      right: "auto",
      height: "35vh",
      zIndex: -1,
    },
  },
}));

function ForgetPasswordPage() {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:480px)");
  const [email, setEmail] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const emailRegex = /.+@.*ust.hk$/gm;

  const handleClick = () => {
    if (emailRegex.test(email.trim())) {
      setDisplayMessage("Password Reset Email Sent!");
      sendPasswordResetEmail(email.trim());
      setEmail("");
    } else {
      setDisplayMessage("Invalid ITSC Email");
      setEmail("");
    }
  };

  return (
    <Grid container direction='column'>
      <NavigationBar showMenu />
      <Grid
        container
        className={classes.container}
        direction={isMobile ? "column" : "row"}
        alignItems='center'
      >
        <Grid container item className={classes.inputForm} direction='column'>
          <b className={classes.title}>
            <span style={{ boxShadow: "inset 0 -13px 0 0 #FFD7D7" }}>
              Forgot
            </span>
            {" Password?"}
          </b>
          <Typography className={classes.description}>
            No worries, we got your back!
          </Typography>
          <Typography className={classes.inputLabel}>
            Full ITSC Email Address
          </Typography>
          <InputBase
            className={classes.input}
            autoComplete='email'
            autoFocus
            inputProps={{ autoCapitalize: "none" }}
            onChange={(e) => setEmail(e.target.value)}
          ></InputBase>
          {displayMessage && (
            <Typography className={classes.errorMessage}>
              {displayMessage}
            </Typography>
          )}
          <NextButton
            onClick={() => handleClick()}
            style={{ padding: 0, paddingTop: 10 }}
          />
          <img
            alt=''
            src={isMobile ? loginLogoMobile : loginLogoDesktop}
            className={classes.loginLogo}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ForgetPasswordPage;
