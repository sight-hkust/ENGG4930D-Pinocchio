import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import logo from "../../assets/whaleIcon.png";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 80,
    paddingTop: 38,
  },
  button: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 25,
    letterSpacing: "0.07em",
    border: "none",
    background: "none",
    padding: "0px 67px",
    margin: "34px 0px",
  },
  text: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 20,
    textAlign: "center",
    letterSpacing: "0.07em",
  },
}));

function NavigationBar() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid container direction='row' justify='center'>
      <Button className={classes.button} onClick={() => history.push("/")}>
        HOME
      </Button>
      <Button className={classes.button}>OUR FORUM</Button>
      <Grid item style={{ textAlign: "center" }}>
        <img className={classes.logo} src={logo} alt=''></img>
        <Typography className={classes.text}>pinocchio</Typography>
      </Grid>
      <Button className={classes.button}>PAST ENTRIES</Button>
      <Button className={classes.button} onClick={() => history.push("/login")}>
        LOGIN
      </Button>
    </Grid>
  );
}

export default NavigationBar;
