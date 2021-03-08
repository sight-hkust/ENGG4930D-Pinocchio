import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  input: {
    width: 512,
    marginBottom: 28,
    "& fieldset": {
      borderColor: "#000000",
      "& legend": {
        "&[class*='legendNotched']": {
          paddingRight: "1vw",
          marginRight: "1vw",
        },
      },
    },
    "&::placeholder": {
      color: "#000000",
    },
    "@media (max-width:480px)": {
      width: 220,
      height: 36,
      marginBottom: 14,
      justifyContent: "center",
    },
  },
  inputLabel: {
    color: "#000000",
    letterSpacing: "0.14em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    right: 22,
    bottom: 0,
    "@media (max-width:480px)": {
      fontSize: 12,
    },
  },
}));

function Input({ ...props }) {
  const classes = useStyles();
  return (
    <TextField
      className={classes.input}
      variant='outlined'
      InputLabelProps={{
        className: classes.inputLabel,
      }}
      {...props}
    ></TextField>
  );
}

export default Input;
