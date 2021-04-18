import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  useMediaQuery,
  InputBase,
  IconButton,
} from "@material-ui/core";
import NextButton from "../../components/NextButton";
import arrowLeftImage from "../../assets/arrowLeft.png";
import { sendPasswordResetEmail } from "../../utils/auth";

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    lineHeight: 1,
    fontSize: 100,
    textAlign: "center",
    "@media (max-width:480px)": {
      fontSize: 35,
      marginTop: "5vh",
    },
  },
  inputForm: {
    padding: "2vh 15vw 0vh",
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
    padding: "8px 12px",
  },
}));

function ForgetPasswordPage() {
  const classes = useStyles();
  const history = useHistory();
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
    <Grid
      container
      className={classes.container}
      direction='column'
      alignItems='center'
    >
      <IconButton
        style={{ alignSelf: "flex-start", paddingLeft: 22, paddingTop: 22 }}
        onClick={() => history.goBack()}
      >
        <img alt='arrowLeft' src={arrowLeftImage} />
      </IconButton>
      <Typography className={classes.title}>
        Oops! Forget your password?
      </Typography>
      <Grid container item className={classes.inputForm} direction='column'>
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
      </Grid>
    </Grid>
  );
}

export default ForgetPasswordPage;
