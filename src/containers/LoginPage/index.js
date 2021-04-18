import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  useMediaQuery,
  InputBase,
  IconButton,
  InputAdornment,
  Link,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import NextButton from "../../components/NextButton";
import arrowLeftImage from "../../assets/arrowLeft.png";
import loginLogo from "../../assets/loginLogo.png";

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    lineHeight: 1,
    fontSize: 100,
    textAlign: "center",
    "@media (max-width:480px)": {
      fontSize: 35,
      marginTop: "5vh",
    },
  },
  description: {
    fontSize: 25,
    textAlign: "center",
    margin: 0,
    color: "#838181",
    "@media (max-width:480px)": {
      fontSize: 20,
      paddingTop: "2vh",
    },
  },
  button: {
    width: 95,
    height: 77,
    backgroundColor: "#3C79B0",
    color: "#FFFFFF",
    borderRadius: "15px",
    alignSelf: "flex-end",
    "&:hover": {
      backgroundColor: "#3C79B0",
    },
    "@media (max-width:480px)": {
      width: 45,
      height: 36,
      minWidth: 45,
      padding: "6px 6px",
    },
  },
  inputForm: {
    padding: "2vh 15vw 0vh",
  },
  errorMessage: {
    color: "#FF0000",
    fontSize: 14,
    textAlign: "end",
  },
  inputLabel: {
    color: "#838181",
    textAlign: "left",
    fontSize: 14,
    marginTop: 18,
  },
  input: {
    backgroundColor: "#EAEAEA",
    padding: "8px 12px",
  },
  forgetPasswordText: {
    color: "#838181",
    fontSize: 14,
  },
  passwordResetAndSubmitGrid: {
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
}));

function LoginPage() {
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:480px)");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  var isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      setLoginError(false);
      history.push("/home");
    }
  }, [isLoggedIn, dispatch]);

  const handleClick = async () => {
    if (isLoggedIn) {
      setLoginError(false);
      history.push("/home");
    } else {
      dispatch(login({ email: email.trim(), password: password.trim() }));
    }
  };

  return (
    <Grid
      container
      className={classes.container}
      direction='column'
      alignItems='center'
    >
      <IconButton
        style={{ alignSelf: "flex-start", paddingLeft: 22, paddingTop: 22 }}
        onClick={() => history.goBack()}
      >
        <img alt='arrowLeft' src={arrowLeftImage} />
      </IconButton>
      <b className={classes.title}>
        <span style={{ boxShadow: "inset 0 -13px 0 0 #FFD7D7" }}>Welcome</span>
        {" back!"}
      </b>
      <Typography className={classes.description}>
        we’re happy you come back to us 💜
      </Typography>
      <Grid container item className={classes.inputForm} direction='column'>
        <Typography className={classes.inputLabel}>
          Full ITSC Email Address
        </Typography>
        <InputBase
          className={classes.input}
          autoComplete='email'
          autoFocus
          inputProps={{ autoCapitalize: "none" }}
          onChange={(e) => setEmail(e.target.value)}
        ></InputBase>
        <Typography className={classes.inputLabel}>Your secret word</Typography>
        <InputBase
          className={classes.input}
          type={showPassword ? "text" : "password"}
          autoComplete='current-password'
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge='end'
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        ></InputBase>
        {loginError && (
          <Typography className={classes.errorMessage}>
            Incorrect Email or Password😕
          </Typography>
        )}
        <Grid
          container
          direction='row'
          className={classes.passwordResetAndSubmitGrid}
        >
          <Link
            className={classes.forgetPasswordText}
            onClick={() => history.push("/forgetPassword")}
          >
            Forgot your secret word?
          </Link>
          <NextButton onClick={() => handleClick()} style={{ padding: 0 }} />
        </Grid>
      </Grid>
      <img
        alt=''
        src={loginLogo}
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: "30vh",
          zIndex: -1,
        }}
      />
    </Grid>
  );
}

export default LoginPage;
