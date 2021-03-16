import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, IconButton, InputAdornment } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  input: {
    width: 512,
    marginBottom: 28,
    "& fieldset": {
      borderColor: "#000000",
      "& legend": {
        "&[class*='legendNotched']": {
          paddingRight: "3vw",
          marginRight: "3vw",
        },
      },
    },
    "&::placeholder": {
      color: "#000000",
    },
    "@media (max-width:480px)": {
      width: 220,
      height: 36,
      marginBottom: 26,
      justifyContent: "center",
      "& fieldset": {
        borderColor: "#000000",
        "& legend": {
          "&[class*='legendNotched']": {},
        },
      },
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

function Input(props) {
  const classes = useStyles();
  const { isPassword, ...restProps } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      className={classes.input}
      variant='outlined'
      InputLabelProps={{
        className: classes.inputLabel,
        id: "inputLabel",
      }}
      autoCapitalize='none'
      autoComplete
      type={isPassword ? (showPassword ? "text" : "password") : "text"}
      InputProps={{
        endAdornment: isPassword ? (
          <InputAdornment position='end'>
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge='end'
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
      {...restProps}
    ></TextField>
  );
}

export default Input;
