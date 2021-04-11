import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, useMediaQuery } from "@material-ui/core";
import arrowRightImage from "../../assets/arrowRight.png";
import arrowRightWebImage from "../../assets/arrowRightWeb.png";

const useStyles = makeStyles((theme) => ({
  button: {
    alignSelf: "flex-end",
    padding: "13px 10px",
  },
}));

function NextButton(props) {
  const isMobile = useMediaQuery("(max-width:480px)");
  const classes = useStyles();
  const { onClick, ...rest } = props;
  return (
    <IconButton
      aria-label='submit'
      className={classes.button}
      onClick={() => onClick()}
      {...rest}
    >
      <img
        alt='arrowRight'
        src={isMobile ? arrowRightImage : arrowRightWebImage}
      />
    </IconButton>
  );
}

export default NextButton;
