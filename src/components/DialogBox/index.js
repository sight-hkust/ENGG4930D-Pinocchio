import React from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import headsUpIcon from "../../assets/headsUpIcon.png";

const useStyles = makeStyles((theme) => ({
  yesbutton: {
    width: 75,
    height: 50,
    backgroundColor: "#F9A586",
    color: "#000000",
    borderRadius: 30,
    "@media (max-width:480px)": {
      width: 30,
      height: 30,
      minWidth: 80,
      fontWeight: "bold",
      marginLeft: 30,
    },
  },
  nobutton: {
    width: 75,
    height: 50,
    backgroundColor: "#FEBD7D",
    color: "#000000",
    borderRadius: 30,
    "@media (max-width:480px)": {
      width: 30,
      height: 30,
      minWidth: 80,
      padding: 0,
      fontWeight: "bold",
      marginLeft: 15,
      marginRight: 15,
    },
  },
  buttontext: {
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  box: {
    backgroundColor: "#FFD7D7",
    borderRadius: 20,
    marginBottom: "1vh",
    height: 130,
    width: 300,
  },
  boxText: {
    fontSize: 10,
    "@media (max-width:480px)": {
      fontSize: 14,
      paddingLeft: 20,
      paddingRight: 12,
      paddingTop: 30,
    },
  },
  headsUp: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
    padding: "2vw 2vh",
  },
}));

function DialogBox(props) {
  const classes = useStyles();
  const { onClick, ...rest } = props;
  return (
    <Grid container direction='row'>
      <img
        alt='headsUpIcon'
        src={headsUpIcon}
        style={{ height: 30, width: 11, paddingLeft: 15 }}
      />
      <Typography className={classes.headsUp}>Heads up!</Typography>
      <Grid
        container
        direction='row'
        className={classes.box}
        justify='flex-end'
      >
        <Typography className={classes.boxText}>
          Do you wish to proceed with publishing your story for everyone?
        </Typography>

        <Button className={classes.yesbutton}>
          <Typography className={classes.buttontext}>Yes</Typography>
        </Button>
        <Button className={classes.nobutton}>
          <Typography className={classes.buttontext}>No</Typography>
        </Button>
      </Grid>
    </Grid>
  );
}

export default DialogBox;
