import {
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import signUpLogo from "../../assets/signUpLogo.png";
import signUpLogoDesktop from "../../assets/signUpLogoDesktop.png";
import DialogBox from "../../components/DialogBox";
import NavigationBar from "../../components/NavigationBar";
import NextButton from "../../components/NextButton";
import { signup } from "../../store/authSlice";
import { checkIfUserExists } from "../../utils/auth";

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    lineHeight: 1,
    fontSize: 50,
    textAlign: "center",
    paddingTop: 25,
    "@media (max-width:480px)": {
      fontSize: 35,
      paddingTop: 0,
      marginTop: "5vh",
    },
  },
  description: {
    fontSize: 25,
    textAlign: "center",
    margin: 0,
    paddingTop: "2vh",
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
    padding: "12px 12px",
    marginBottom: 18,
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

function SignUpPage() {
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:480px)");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.userUID);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const emailRegex = /.+@.*ust.hk$/gm;
  const passwordRegex = /^.{8,}$/gm;
  const { t } = useTranslation();

  const handleClick = () => {
    if (!emailRegex.test(email)) {
      setEmail("");
      setEmailError(t("signUpPage.useItsc"));
    } else {
      setEmailError("");
    }
    if (!passwordRegex.test(password)) {
      setPassword("");
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  useEffect(() => {
    if (email && password && !(emailError.length > 0) && !passwordError) {
      checkIfUserExists(email).then((res) => {
        if (res) {
          setEmailError(t("signUpPage.existingAccount"));
        } else {
          dispatch(signup({ email: email.trim(), password: password.trim() }));
        }
      });
    }
  }, [emailError]);

  useEffect(() => {
    if (isLoggedIn) {
      setOpenDialog(true);
    }
  }, [isLoggedIn]);

  return (
    <Grid container direction='column'>
      <NavigationBar showMenu={!isMobile} />
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
              {t("signUpPage.letsGetText")}
            </span>{" "}
            {t("signUpPage.startedText")}
          </b>
          <Typography className={classes.description}>
            {t("signUpPage.noRequestExtreme")}
          </Typography>
          <Typography className={classes.inputLabel}>
            {t("signUpPage.fullItsc")}
          </Typography>
          <InputBase
            className={classes.input}
            autoComplete='email'
            autoFocus
            inputProps={{ autoCapitalize: "none" }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></InputBase>
          <Typography className={classes.inputLabel}>
            {t("signUpPage.secretWord")}
          </Typography>
          <InputBase
            className={classes.input}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='new-password'
            value={password}
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
          {passwordError && (
            <Typography className={classes.errorMessage}>
              {t("signUpPage.secretWordShort")}
            </Typography>
          )}
          {emailError && (
            <Typography className={classes.errorMessage}>
              {emailError}
            </Typography>
          )}
          <NextButton onClick={() => handleClick()} style={{ padding: 0 }} />
        </Grid>
        <img
          alt=''
          src={isMobile ? signUpLogo : signUpLogoDesktop}
          className={classes.loginLogo}
        />
        <DialogBox
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          yesText='OK'
          text='We sent you a verification email to confirm you are a UST student! Verify the account to write on Pinocchio!'
          onClickYes={() => history.push("/interests")}
        ></DialogBox>
      </Grid>
    </Grid>
  );
}

export default SignUpPage;
