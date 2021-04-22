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
            onClick={() => history.push("/lookBack")}
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
          Home
        </Button>
        <Button
          className={classes.button}
          onClick={() => history.push("/forum")}
        >
          The Storybook
        </Button>
        <Grid container direction='column' className={classes.whaleTextColumn}>
          <img alt='' src={whaleIcon} />
          <Typography>pinocchio</Typography>
        </Grid>
        <Button
          className={classes.button}
          onClick={() => history.push("/writing")}
        >
          Write Now
        </Button>
        <Button className={classes.button} onClick={() => logout()}>
          Log Out
        </Button>
      </Grid>
    );
  }
}

export default NavigationBar;
