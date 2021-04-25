import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  useMediaQuery,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import menuLogo from "../../assets/menuIcon.png";
import homeMenuIcon from "../../assets/homeMenuIcon.png";
import storyBookMenuIcon from "../../assets/storyBookMenuIcon.png";
import writeNowMenuIcon from "../../assets/writeNowMenuIcon.png";
import lookBackMenuIcon from "../../assets/lookBackMenuIcon.png";
import bookmarkMenuIcon from "../../assets/bookmarkMenuIcon.png";
import logOutMenuIcon from "../../assets/logOutMenuIcon.png";
import arrowLeftImage from "../../assets/arrowLeft.png";
import whaleIcon from "../../assets/whaleIcon.png";
import personalMenuIcon from "../../assets/personalPage.png";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexFlow: "nowrap",
  },
  button: {
    fontSize: 25,
    border: "none",
    background: "none",
    padding: "20px 2vw",
    margin: "0px 2vw",
    textTransform: "capitalize",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    letterSpacing: "0.07em",
    color: "#000000",
  },
  menuButton: {
    alignSelf: "flex-start",
    marginTop: 25,
    marginLeft: 20,
    maxWidth: 40,
    maxHeight: 30,
    minWidth: 40,
    minHeight: 30,
  },
  whaleTextColumn: {
    alignItems: "center",
    padding: "20px 40px",
    maxWidth: "fit-content",
  },
}));

function NavigationBar({ showMenu }) {
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:480px)");
  const [state, setState] = React.useState({
    left: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const logOut = () => {
    dispatch(logout());
    history.push("/");
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <List>
      {[
        [t("navigationBar.home"), homeMenuIcon, () => history.push("/home")],
        [
          t("navigationBar.theStorybook"),
          storyBookMenuIcon,
          () => history.push("/forum"),
        ],
        [
          t("navigationBar.writeNow"),
          writeNowMenuIcon,
          () => history.push("/writing"),
        ],
        [
          t("navigationBar.lookBack"),
          lookBackMenuIcon,
          () => history.push("/lookback"),
        ],
        [
          t("navigationBar.bookmark"),
          bookmarkMenuIcon,
          () => history.push("/bookmark"),
        ],
        [
          t("navigationBar.personal"),
          personalMenuIcon,
          () => history.push("/personal"),
        ],
        [t("navigationBar.logOut"), logOutMenuIcon, () => logOut()],
      ].map((data, index) => (
        <ListItem button key={data[0] + index} onClick={data[2]}>
          <ListItemIcon style={{ minWidth: 36 }} key={`icon${data[0]}`}>
            <img alt='' src={data[1]}></img>
          </ListItemIcon>
          <ListItemText primary={data[0]} />
        </ListItem>
      ))}
    </List>
  );

  if (isMobile) {
    return (
      <Grid
        container
        direction='row'
        style={{
          justifyContent: showMenu ? "space-between" : "flex-end",
        }}
      >
        {showMenu && (
          <Button
            className={classes.menuButton}
            onClick={toggleDrawer("left", true)}
          >
            <img src={menuLogo} alt='menuLogo'></img>
          </Button>
        )}
        <SwipeableDrawer
          anchor='left'
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          <IconButton
            style={{ alignSelf: "flex-start", paddingLeft: 22, paddingTop: 22 }}
            onClick={toggleDrawer("left", false)}
          >
            <img
              alt='arrowLeft'
              src={arrowLeftImage}
              style={{ alignSelf: "flex-start" }}
            ></img>
          </IconButton>
          {list("left")}
        </SwipeableDrawer>
        <Grid
          item
          style={{
            textAlign: "center",
            marginTop: 28,
            marginRight: 20,
            alignSelf: "flex-end",
          }}
        ></Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container direction='row' className={classes.container}>
        <Button
          className={classes.button}
          onClick={() => history.push("/home")}
        >
          {t("navigationBar.home")}
        </Button>
        <Button
          className={classes.button}
          onClick={() => history.push("/forum")}
        >
          {t("navigationBar.theStorybook")}
        </Button>
        <Grid container direction='column' className={classes.whaleTextColumn}>
          <img alt='' src={whaleIcon} />
          <Typography>pinocchio</Typography>
        </Grid>
        <Button
          className={classes.button}
          onClick={() => history.push("/personal")}
        >
          {t("navigationBar.personal")}
        </Button>
        <Button className={classes.button} onClick={() => logOut()}>
          {t("navigationBar.logOut")}
        </Button>
      </Grid>
    );
  }
}

export default NavigationBar;
