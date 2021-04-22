import React from "react";
import {
  Typography,
  Grid,
  Button,
  Modal,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import headsUpIcon from "../../assets/headsUpIcon.png";

const useStyles = makeStyles((theme) => ({
  yesbutton: {
    height: 30,
    backgroundColor: "#F9A586",
    color: "#000000",
    borderRadius: 30,
    marginRight: 15,
    "&:hover": {
      backgroundColor: "#F9A586",
    },
    "@media (max-width:480px)": {
      height: 30,
      minWidth: 90,
      fontWeight: "bold",
      marginRight: 0,
      marginLeft: 30,
    },
  },
  nobutton: {
    height: 30,
    backgroundColor: "#FEBD7D",
    color: "#000000",
    borderRadius: 30,
    "&:hover": {
      backgroundColor: "#FEBD7D",
    },
    "@media (max-width:480px)": {
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
    padding: 10,
    backgroundColor: "#FFD7D7",
    borderRadius: 20,
  },
  boxText: {
    fontSize: 15,
    padding: "0 12px 10px 20px",
    "@media (max-width:480px)": {
      fontSize: 14,
      padding: 20,
    },
  },
  headsUp: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
    padding: "1vw 2vh",
    "@media (max-width:480px)": {
      padding: "2vw 2vh",
    },
  },
}));

function DialogBox(props) {
  const classes = useStyles();
  const {
    open,
    text,
    onClose,
    onClickYes,
    onClickNo,
    HTMLString,
    yesText,
  } = props;
  const isMobile = useMediaQuery("(max-width:480px)");
  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: isMobile ? "0 10vw" : "0 38vw",
      }}
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
          {text && <Typography className={classes.boxText}>{text}</Typography>}
          {HTMLString && (
            <div
              style={{ fontFamily: "Open Sans", padding: "20px 15px" }}
              dangerouslySetInnerHTML={{ __html: HTMLString }}
            />
          )}
          <Button className={classes.yesbutton} onClick={onClickYes}>
            <Typography className={classes.buttontext}>
              {yesText ? yesText : "Yes"}
            </Typography>
          </Button>
          {onClickNo && (
            <Button className={classes.nobutton} onClick={onClickNo}>
              <Typography className={classes.buttontext}>No</Typography>
            </Button>
          )}
        </Grid>
      </Grid>
    </Modal>
  );
}

export default DialogBox;
