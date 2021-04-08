import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, useMediaQuery } from "@material-ui/core";
import arrowRightImage from "../../assets/arrowRight.png";
import arrowRightWebImage from "../../assets/arrowRightWeb.png";

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
  const isMobile = useMediaQuery("(max-width:480px)");
  const { onClick, ...rest } = props;
  return (
    <IconButton
      aria-label='submit'
      style={{ alignSelf: "flex-end" }}
      onClick={() => onClick()}
    >
      <img
        alt='arrowRight'
        src={isMobile ? arrowRightImage : arrowRightWebImage}
      />
    </IconButton>
  );
}

export default NextButton;
