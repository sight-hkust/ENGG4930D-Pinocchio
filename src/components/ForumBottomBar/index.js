import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import arrowRightImage from "../../assets/arrowRight.png";
import arrowLeftImage from "../../assets/arrowLeft.png";

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "space-between",
    padding: "12px 16px",
  },
  arrowButton: {
    minWidth: 54,
    minHeight: 41,
    borderRadius: 15,
    padding: 0,
  },
  commentButton: {
    textTransform: "none",
    backgroundColor: "#D38851",
    borderRadius: 15,
    color: "white",
  },
}));

function ForumBottomBar(props) {
  const classes = useStyles();
  const { nextPageClick, previousPageClick } = props;
  return (
    <Grid container direction='row' className={classes.container}>
      <Button
        variant='contained'
        className={classes.arrowButton}
        style={{ backgroundColor: "#D38851" }}
        onClick={previousPageClick}
      >
        <img alt='left' src={arrowLeftImage}></img>
      </Button>
      <Button variant='contained' className={classes.commentButton}>
        comments
      </Button>
      <Button
        variant='contained'
        className={classes.arrowButton}
        style={{ backgroundColor: "#AC6F42" }}
        onClick={nextPageClick}
      >
        <img alt='right' src={arrowRightImage}></img>
      </Button>
    </Grid>
  );
}

export default ForumBottomBar;
