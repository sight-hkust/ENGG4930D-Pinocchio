import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import arrowRight from "../../assets/arrowRight.png";

const useStyles = makeStyles((theme) => ({
  button: {
    width: 95,
    height: 77,
    backgroundColor: "#3C79B0",
    color: "#FFFFFF",
    borderRadius: 15,
    alignSelf: "flex-end",
    "&:hover": {
      backgroundColor: "#3C79B0",
    },
    "@media (max-width:480px)": {
      width: 54,
      height: 44,
      minWidth: 54,
      padding: "6px 6px",
    },
  },
}));

function NextButton(props) {
  const classes = useStyles();
  const { onClick, ...rest } = props;
  return (
    <Button
      className={classes.button}
      variant='contained'
      onClick={onClick}
      {...rest}
    >
      <img alt='arrowRight' src={arrowRight} width='80%'></img>
    </Button>
  );
}

export default NextButton;
