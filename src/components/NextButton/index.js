import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import arrowRightImage from "../../assets/arrowRight.png";

const useStyles = makeStyles((theme) => ({
  button: {
    alignSelf: "flex-end",
    backgroundColor: "white",
    padding: "13px 10px",
  },
}));

function NextButton(props) {
  const classes = useStyles();
  const { onClick, ...rest } = props;
  return (
    <IconButton
      aria-label='submit'
      className={classes.button}
      onClick={() => onClick()}
      {...rest}
    >
      <img alt='arrowRight' src={arrowRightImage} />
    </IconButton>
  );
}

export default NextButton;
