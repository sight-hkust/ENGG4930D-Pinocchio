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
} from "@material-ui/core";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import menuLogo from "../../assets/menuIcon.png";
import homeMenuIcon from "../../assets/homeMenuIcon.png";
import storyBookMenuIcon from "../../assets/storyBookMenuIcon.png";
import writeNowMenuIcon from "../../assets/writeNowMenuIcon.png";
import lookBackMenuIcon from "../../assets/lookBackMenuIcon.png";
import bookmarkMenuIcon from "../../assets/bookmarkMenuIcon.png";
import logOutMenuIcon from "../../assets/logOutMenuIcon.png";
import arrowLeftImage from "../../assets/arrowLeft.png";

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "center",
    flexFlow: "nowrap",
  },
  button: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 25,
    letterSpacing: "0.07em",
    border: "none",
    background: "none",
    padding: "0px 67px",
    margin: "34px 0px",
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
}));

function NavigationBar({ showMenu }) {
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:480px)");
  const [state, setState] = React.useState({
    left: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        var myStorage = window.sessionStorage;
        myStorage.removeItem("userUID");
        setIsOpen(true);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
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
        "Home",
        "The Storybook",
        "Write Now",
        "Look Back",
        "Bookmark",
        "Log Out",
      ].map((text, index) =>
        index === 0 ? (
          <ListItem
            button
            key={text + index}
            onClick={() => history.push("/home")}
          >
            <ListItemIcon>
              <img alt='home' src={homeMenuIcon}></img>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ) : index === 1 ? (
          <ListItem
            button
            key={text + index}
            onClick={() => history.push("/forum")}
          >
            <ListItemIcon>
              <img alt='storybook' src={storyBookMenuIcon}></img>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ) : index === 2 ? (
          <ListItem
            button
            key={text + index}
            onClick={() => history.push("/writing")}
          >
            <ListItemIcon>
              <img alt='writeNow' src={writeNowMenuIcon}></img>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ) : index === 3 ? (
          <ListItem
            button
            key={text + index}
            onClick={() => history.push("/lookback")}
          >
            <ListItemIcon>
              <img alt='lookback' src={lookBackMenuIcon}></img>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ) : index === 4 ? (
          <ListItem
            button
            key={text + index}
            onClick={() => history.push("/bookmark")}
          >
            <ListItemIcon>
              <img alt='bookmark' src={bookmarkMenuIcon}></img>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ) : (
          <ListItem button key={text + index} onClick={() => logOut()}>
            <ListItemIcon>
              <img alt='logout' src={logOutMenuIcon}></img>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        )
      )}
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
          HOME
        </Button>
        <Button className={classes.button}>OUR FORUM</Button>
        <Button className={classes.button}>PAST ENTRIES</Button>
        <Button
          className={classes.button}
          onClick={() => history.push("/login")}
        >
          LOGIN
        </Button>
      </Grid>
    );
  }
}

export default NavigationBar;
