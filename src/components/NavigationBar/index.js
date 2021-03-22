import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Grid,
  useMediaQuery,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ForumIcon from "@material-ui/icons/Forum";
import HistoryIcon from "@material-ui/icons/History";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useHistory } from "react-router-dom";
import logo from "../../assets/whaleIcon.png";
import menuLogo from "../../assets/navigationBarMobile.png";

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "center",
    flexFlow: "nowrap",
  },
  logo: {
    height: 80,
    paddingTop: 38,
  },
  button: {
    fontFamily: "Roboto",
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
    fontFamily: "Roboto",
    fontSize: 20,
    textAlign: "center",
    letterSpacing: "0.07em",
  },
  menuButton: {
    backgroundColor: "#3C79B0",
    border: "2px solid #3C79B0",
    boxSizing: "border-box",
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 35,
    marginLeft: 29,
    maxWidth: 35,
    maxHeight: 35,
    minWidth: 35,
    minHeight: 35,
  },
}));

function NavigationBar({ showMenu }) {
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:480px)");
  const [state, setState] = React.useState({
    left: false,
  });

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
      {["HOME", "OUR FORUM", "PAST ENTRIES", "LOGIN"].map((text, index) =>
        index === 0 ? (
          <ListItem button key={text} onClick={() => history.push("/home")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ) : index === 1 ? (
          <ListItem button key={text} onClick={() => history.push("/forum")}>
            <ListItemIcon>
              <ForumIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ) : index === 2 ? (
          <ListItem button key={text} onClick={() => history.push("/")}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ) : (
          <ListItem button key={text} onClick={() => history.push("/login")}>
            <ListItemIcon>
              <VpnKeyIcon />
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
            <img
              src={menuLogo}
              width='22.5px'
              height='20.25px'
              alt='menuLogo'
            ></img>
          </Button>
        )}
        <SwipeableDrawer
          anchor='left'
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
        <Grid
          item
          style={{
            textAlign: "center",
            marginTop: 28,
            marginRight: 29,
            alignSelf: "flex-end",
          }}
        >
          <img style={{ height: 35 }} src={logo} alt=''></img>
          <Typography className={classes.text} style={{ fontSize: 8 }}>
            pinocchio
          </Typography>
        </Grid>
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
        <Grid item style={{ textAlign: "center" }}>
          <img className={classes.logo} src={logo} alt='logo'></img>
          <Typography className={classes.text}>pinocchio</Typography>
        </Grid>
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
