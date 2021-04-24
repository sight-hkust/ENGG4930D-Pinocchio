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
import loginLogoMobile from "../../assets/loginLogoMobile.png";
import loginLogoDesktop from "../../assets/loginLogoDesktop.png";
import NavigationBar from "../../components/NavigationBar";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    lineHeight: 1,
    fontSize: 50,
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
    paddingTop: "2vh",
    "@media (max-width:480px)": {
      fontSize: 20,
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
    width: "auto",
    padding: "15vh 15vw 0vh",
    "@media (max-width:480px)": {
      padding: "2vh 15vw 0vh",
    },
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
    padding: "12px 12px",
    marginBottom: 18,
    "@media (max-width:480px)": {
      padding: "8px 12px",
    },
    minWidth: 216,
  },
  loginLogo: {
    position: "absolute",
    bottom: 0,
    right: "5vw",
    height: "90vh",
    zIndex: -1,
    "@media (max-width:480px)": {
      position: "absolute",
      bottom: 0,
      right: "auto",
      height: "35vh",
      zIndex: -1,
    },
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
  const { t } = useTranslation();

  var isLoggedIn = useSelector((state) => state.auth.userUID);

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
    <Grid container direction='column'>
      <NavigationBar showMenu />
      <Grid
        container
        className={classes.container}
        direction={isMobile ? "column" : "row"}
        alignItems='center'
      >
        <Grid container item className={classes.inputForm} direction='column'>
          <b className={classes.title}>
            <span
              style={{
                boxShadow: "inset 0 -13px 0 0 #FFD7D7",
              }}
            >
              {t("loginPage.welcomeText")}
            </span>{" "}
            {t("loginPage.backText")}
          </b>
          <Typography className={classes.description}>
            {t("loginPage.happyBackText")}
          </Typography>
          <Typography className={classes.inputLabel}>
            {t("loginPage.itscEmail")}
          </Typography>
          <InputBase
            className={classes.input}
            autoComplete='email'
            autoFocus
            inputProps={{ autoCapitalize: "none" }}
            onChange={(e) => setEmail(e.target.value)}
          ></InputBase>
          <Typography className={classes.inputLabel}>
          {t("loginPage.secretWord")}
          </Typography>
          <InputBase
            className={classes.input}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='current-password'
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
              {t("loginPage.incorrectText")}
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
              {t("loginPage.forgotSecret")}
            </Link>
            <NextButton onClick={() => handleClick()} style={{ padding: 0 }} />
          </Grid>
          <img
            alt=''
            src={isMobile ? loginLogoMobile : loginLogoDesktop}
            className={classes.loginLogo}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
