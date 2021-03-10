import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Grid,
  useMediaQuery,
  Snackbar,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
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
    textAlign: "center",
    "@media (max-width:480px)": {
      fontSize: "30px",
      wordWrap: "break-word",
      textAlign: "left",
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
      textAlign: "left",
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
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:480px)");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAccountCreated(false);
  };

  const handleClick = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setAccountCreated(true);
        var user = userCredential.user;
        user.updateProfile({
          displayName: username,
        });
        user.sendEmailVerification().catch((error) => {
          console.log("ERROR_EMAIL_VERIFY", error);
        });
      })
      .catch((error) => {
        console.log("ERROR_ACCOUNT_CREATE", error);
      });
  };

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
        <Input
          size={isMobile ? "small" : "medium"}
          label='USERNAME'
          onChange={(e) => setUsername(e.target.value)}
        ></Input>
        <Input
          size={isMobile ? "small" : "medium"}
          label='ITSC ACCOUNT'
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          size={isMobile ? "small" : "medium"}
          label='SECRET WORD'
          isPassword={true}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Grid container className={classes.confirmContainer}>
          <Typography className={classes.startMyJourneyText}>
            start my journey
          </Typography>
          <Button
            className={classes.button}
            variant='contained'
            onClick={handleClick}
          >
            <img alt='arrowRight' src={arrowRight} width='80%'></img>
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={accountCreated}
        onClose={handleClose}
        autoHideDuration={9000}
        message='Verify your ITSC email address now!'
      />
    </Grid>
  );
}

export default SignUpPage;
