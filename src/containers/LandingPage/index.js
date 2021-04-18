import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  useMediaQuery,
  Button,
  Link,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import landingPinocchio from "../../assets/landingPinocchio.png";
import NavigationBar from "../../components/NavigationBar";
import DialogBox from "../../components/DialogBox";

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    textAlign: "center",
    paddingTop: 25,
    "@media (max-width:480px)": {
      fontSize: 35,
      paddingTop: 0,
      marginTop: "5vh",
    },
  },
  description: {
    fontSize: 30,
    textAlign: "center",
    margin: 0,
    paddingBottom: 21,
    color: "#838181",
    "@media (max-width:480px)": {
      fontSize: 20,
      paddingTop: "2vh",
      paddingBottom: "5vh",
    },
  },
  landingPinocchio: {
    display: "flex",
    height: "55vh",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 45,
    "@media (max-width:480px)": {
      height: "40vh",
      paddingBottom: "5vh",
    },
  },
  linkText: {
    color: "#838181",
    fontSize: 28,
    padding: "5px 0",
    "@media (max-width:480px)": {
      fontSize: 14,
    },
  },
  link: {
    color: "#838181",
    fontSize: 28,
    fontWeight: "bold",
    "@media (max-width:480px)": {
      fontSize: 14,
    },
  },
  button: {
    backgroundColor: "#FEBD7D",
    borderRadius: 60,
    marginBottom: "1vh",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 30,
    textTransform: "capitalize",
    padding: "1vw 6vh",
    "@media (max-width:480px)": {
      fontSize: 20,
      padding: "2vw 3vh",
    },
  },
  appInstallBanner: {
    position: "absolute",
    top: "80%",
    backgroundColor: "#FFCF25",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: "20vh",
    width: "100vw",
    textAlign: "center",
  },
}));

function LandingPage() {
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:480px)");
  const [showDialogBox, setShowDialogBox] = useState(false);

  return (
    <Grid container direction='column'>
      <DialogBox
        open={showDialogBox}
        HTMLString="<b>Your data will be kept safe with us</b><br><br>All posts are <u>anonymous</u> and private posts are only accessible to <u>you</u>.<br><br>If you ever feel like your privacy is breached, you can <u>delete all your posts</u>, and our database will remove them immediately.<br><br>So don't worry and write away!"
        onClose={() => setShowDialogBox(false)}
        onClickYes={() => history.push("/signUp")}
        yesText="Let's Start"
      ></DialogBox>
      <NavigationBar showMenu />
      <Grid
        container
        className={classes.container}
        direction='column'
        alignItems='center'
      >
        <b className={classes.title}>
          {"Welcome to "}
          <span style={{ boxShadow: "inset 0 -10px 0 0 #FEBD7D" }}>
            Pinocchio
          </span>
        </b>
        <Typography className={classes.description}>
          Start your journey with us
        </Typography>
        <img
          src={landingPinocchio}
          alt='Logo'
          className={classes.landingPinocchio}
        ></img>
        <Button
          className={classes.button}
          onClick={() => history.push("/forum")}
        >
          <Typography className={classes.buttonText}>Try Now</Typography>
        </Button>
        <Typography className={classes.linkText}>
          Already have an account?
          <Link className={classes.link} onClick={() => history.push("/login")}>
            {" Sign In"}
          </Link>
        </Typography>
        <Typography className={classes.linkText}>
          New to Pinocchio?
          <Link className={classes.link} onClick={() => setShowDialogBox(true)}>
            {" Sign Up"}
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default LandingPage;
