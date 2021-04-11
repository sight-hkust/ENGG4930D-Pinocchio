import React from "react";
import { Typography, Grid, Button, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import headsUpIcon from "../../assets/headsUpIcon.png";

const useStyles = makeStyles((theme) => ({
  yesbutton: {
    width: 75,
    height: 50,
    backgroundColor: "#F9A586",
    color: "#000000",
    borderRadius: 30,
    "&:hover": {
      backgroundColor: "#F9A586",
    },
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
    "&:hover": {
      backgroundColor: "#FEBD7D",
    },
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
  const { open, text, onClose, onClickYes, onClickNo, ...rest } = props;
  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{ top: "35vh", width: "75vw", left: "14vw" }}
    >
      <Grid
        container
        direction='column'
        style={{
          outline: "none",
          backgroundColor: "white",
          borderRadius: 20,
          alignItems: "center",
        }}
      >
        <Grid
          container
          direction='row'
          style={{ justifyContent: "flex-start", alignItems: "center" }}
        >
          <img
            alt='headsUpIcon'
            src={headsUpIcon}
            style={{ height: 30, width: 11, paddingLeft: 15 }}
          />
          <Typography className={classes.headsUp}>Heads up!</Typography>
        </Grid>
        <Grid
          container
          direction='row'
          className={classes.box}
          justify='flex-end'
        >
          <Typography className={classes.boxText}>{text}</Typography>

          <Button className={classes.yesbutton}>
            <Typography className={classes.buttontext} onClick={onClickYes}>
              Yes
            </Typography>
          </Button>
          <Button className={classes.nobutton}>
            <Typography className={classes.buttontext} onClick={onClickNo}>
              No
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default DialogBox;
