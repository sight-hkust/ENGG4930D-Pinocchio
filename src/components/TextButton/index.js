import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    height: 72,
    width: 226,
    backgroundColor: "#3C79B0",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: 20,
    padding: "18px 25px",
    marginBottom: 38,
    "&:hover": {
      backgroundColor: "#3C79B0",
    },
    "@media (max-width:480px)": {
      marginBottom: 14,
    },
  },
  buttonText: {
    color: "#FFFBFB",
    fontSize: "30px",
    textAlign: "center",
    margin: "0px",
    letterSpacing: "0.17em",
  },
}));

function TextButton({ text, onClick, backgroundColor }) {
  const classes = useStyles();
  

  return (
    <Button
      className={classes.button}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <Typography className={classes.buttonText} onClick={onClick}>
        {text}
      </Typography>
    </Button>
  );
}

export default TextButton;
