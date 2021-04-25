import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  useMediaQuery,
  InputBase,
  IconButton,
  InputAdornment,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useSelector } from "react-redux";
import NavigationBar from "../../components/NavigationBar";
import DialogBox from "../../components/DialogBox";
import personalPageIcon from "../../assets/personalPageIcon.png";
import personalPageWebIcon from "../../assets/personalPageWeb.png";
import { updatePassword } from "../../utils/auth";
import { countStory } from "../../utils/fetchUserData";
import { deleteAllStory } from "../../utils/deleteStory";

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "center",
  },
  input: {
    backgroundColor: "#EAEAEA",
    padding: "8px 12px",
  },
  inputLabel: {
    color: "#838181",
    textAlign: "left",
    fontSize: 14,
    marginTop: 18,
  },
  inputForm: {
    width: "35vw",
    padding: "10vh 5vw 0vh",
    "@media (max-width:480px)": {
      width: "auto",
      padding: "2vh 12vw 0vh",
    },
  },
  confirmButton: {
    textTransform: "unset",
    backgroundColor: "#F9A586",
    borderRadius: 20,
    minWidth: 120,
    minHeight: 24,
    padding: "5px 13px",
    "&:hover": {
      backgroundColor: "#F9A586",
    },
  },
  storiesCount: {
    width: "auto",
    alignItems: "center",
    padding: "30px 0",
  },
  divider: {
    backgroundColor: "black",
    height: 1,
    margin: "10px 0",
  },
  deleteButton: {
    backgroundColor: "#F59598",
    borderRadius: 40,
    textTransform: "unset",
    fontWeight: "bold",
    padding: "14px 35px",
    width: "fit-content",
    alignSelf: "center",
  },
  storyNumberText: {
    fontSize: 25,
  },
  storyText: {
    fontSize: 12,
  },
  errorMessage: {
    color: "#FF0000",
    fontSize: 14,
    textAlign: "end",
  },
  logo: {
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

function PersonalPage() {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:480px)");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [error, setError] = useState(false);
  const [privateStory, setPrivateStory] = useState(0);
  const [publicStory, setPublicStory] = useState(0);

  const passwordRegex = /^.{8,}$/gm;

  var userUID = useSelector((state) => state.auth.userUID);

  useEffect(() => {
    countStory({ userUID: userUID }).then((data) => {
      if (data) {
        setPrivateStory(data.privateStory);
        setPublicStory(data.publicStory);
      }
    });
  }, []);

  const checkNewPassword = () => {
    if (passwordRegex.test(password) && password === confirmPassword) {
      setError(false);
      updatePassword(password);
      setPasswordChanged(true);
    } else {
      setError(true);
    }
  };

  return (
    <Grid container direction='column'>
      <NavigationBar showMenu />
      <Grid
        container
        className={classes.container}
        direction={isMobile ? "column" : "row"}
      >
        {isMobile && <img alt='' src={personalPageIcon}></img>}
        <Grid
          container
          direction='column'
          justify='flex-start'
          className={classes.inputForm}
        >
          <Typography className={classes.inputLabel}>
            New Secret Word
          </Typography>
          <InputBase
            className={classes.input}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='new-password'
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
          <Typography className={classes.inputLabel}>
            Reconfirm Password
          </Typography>
          <InputBase
            className={classes.input}
            type={showConfirmPassword ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete='new-password'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge='end'
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          ></InputBase>
          {error && (
            <Typography className={classes.errorMessage}>
              New password is too short or doesn't match with reconfirm password
            </Typography>
          )}
          {passwordChanged && (
            <Typography className={classes.errorMessage}>
              Password changed
            </Typography>
          )}
          <Grid
            container
            direction='row'
            style={{ paddingTop: 23, justifyContent: "space-between" }}
          >
            <select
              style={{
                backgroundColor: "#F9A586",
                border: "none",
                borderRadius: 20,
                padding: "5px 20px",
              }}
            >
              <option value='English'>English</option>
              <option value='Chinese'>繁體中文</option>
            </select>
            <Button
              className={classes.confirmButton}
              onClick={() => checkNewPassword()}
            >
              <Typography style={{ fontSize: 12 }}>Confirm Change</Typography>
            </Button>
          </Grid>
          <Grid container direction='row' justify='space-evenly'>
            {[
              [privateStory, "Private"],
              [publicStory, "Public"],
            ].map((data, index) => (
              <Grid
                container
                item
                direction='column'
                key={data[1] + index}
                className={classes.storiesCount}
              >
                <Typography className={classes.storyNumberText}>
                  {data[0]}
                </Typography>
                <Divider flexItem className={classes.divider} />
                <Typography className={classes.storyText}>
                  {data[1]} Stories
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Button
            className={classes.deleteButton}
            onClick={() => setShowDeleteConfirmDialog(true)}
          >
            Delete all
          </Button>
          <DialogBox
            open={showDeleteConfirmDialog}
            text='Do you really want to delete all your posts?'
            onClickYes={() => {
              deleteAllStory(userUID);
              setPrivateStory(0);
              setPublicStory(0);
              setShowDeleteConfirmDialog(false);
            }}
            onClickNo={() => setShowDeleteConfirmDialog(false)}
          ></DialogBox>
        </Grid>
        {!isMobile && (
          <img alt='' src={personalPageWebIcon} className={classes.logo} />
        )}
      </Grid>
    </Grid>
  );
}

export default PersonalPage;
