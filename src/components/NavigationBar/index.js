import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid, useMediaQuery } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import logo from "../../assets/whaleIcon.png";
import menuLogo from "../../assets/navigationBarMobile.png";

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "center",
    flexFlow: "nowrap",
  },
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
    fontSize: 20,
    textAlign: "center",
    letterSpacing: "0.07em",
  },
  menuButton: {
    backgroundColor: "#3C79B0",
    border: "2px solid #3C79B0",
    boxSizing: "border-box",
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 35,
    marginLeft: 29,
    maxWidth: 35,
    maxHeight: 35,
    minWidth: 35,
    minHeight: 35,
  },
}));

function NavigationBar() {
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:480px)");

  if (isMobile) {
    return (
      <Grid
        container
        direction='row'
        style={{
          justifyContent: "space-between",
        }}
      >
        <Button className={classes.menuButton}>
          <img src={menuLogo} width='22.5px' height='20.25px'></img>
        </Button>
        <Grid
          item
          style={{
            textAlign: "center",
            marginTop: 35,
            marginRight: 29,
            alignSelf: "flex-end",
          }}
        >
          <img style={{ height: 35 }} src={logo} alt=''></img>
          <Typography className={classes.text} style={{ fontSize: 8 }}>
            pinocchio
          </Typography>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container direction='row' className={classes.container}>
        <Button className={classes.button} onClick={() => history.push("/")}>
          HOME
        </Button>
        <Button className={classes.button}>OUR FORUM</Button>
        <Grid item style={{ textAlign: "center" }}>
          <img className={classes.logo} src={logo} alt=''></img>
          <Typography className={classes.text}>pinocchio</Typography>
        </Grid>
        <Button className={classes.button}>PAST ENTRIES</Button>
        <Button
          className={classes.button}
          onClick={() => history.push("/login")}
        >
          LOGIN
        </Button>
      </Grid>
    );
  }
}

export default NavigationBar;
