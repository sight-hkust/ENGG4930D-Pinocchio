import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import backgroundImage from "../../assets/interestsPageBackground.png";
import arrowRight from "../../assets/arrowRight.png";
import fairyLogo from "../../assets/fairy.png";
import NavigationBar from "../../components/NavigationBar";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    alignContent: "flex-end",
    contain: "content",
  },
  title: {
    fontFamily: "Times",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 60,
    marginTop: 70,
    width: "70%",
    "@media (max-width:480px)": {
      fontSize: 30,
      marginTop: 30,
    },
  },
  description: {
    fontFamily: "Roboto",
    fontSize: 30,
    alignSelf: "center",
    margin: 0,
    paddingBottom: 60,
    "@media (max-width:480px)": {
      fontSize: 15,
      marginTop: 24,
    },
  },
  button: {
    width: "95px",
    height: "77px",
    backgroundColor: "#3C79B0",
    color: "#FFFFFF",
    borderRadius: "15px",
    alignSelf: "flex-end",
    "&:hover": {
      backgroundColor: "#3C79B0",
    },
  },
  interestButton: {
    height: 72,
    backgroundColor: "#D38851",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: 20,
    padding: "18px 25px",
    marginBottom: 38,
    textTransform: "lowercase",
    "&:hover": {
      backgroundColor: "#D38851",
    },
  },
  buttonText: {
    color: "#FFFBFB",
    fontFamily: "Roboto",
    fontSize: 30,
    textAlign: "center",
    margin: 0,
    "@media (max-width:480px)": {
      fontSize: 15,
    },
  },
  inputForm: {
    display: "flex",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
}));

function InterestsPage() {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const interests = [
    "depression",
    "exam anxiety",
    "eating disorder",
    "PTSD",
    "motivation",
    "social anxiety",
    "panic disorder",
  ];

  return (
    <Grid container className={classes.container} direction='column'>
      <img
        src={fairyLogo}
        alt='fairyLogo'
        style={{
          position: "absolute",
          height: "350px",
          right: "5%",
          bottom: 0,
          marginLeft: "auto",
        }}
      />
      <Grid container item direction='column' className={classes.inputForm}>
        <NavigationBar />
        <Typography className={classes.title}>
          WHEN YOU WISH UPON A STAR...
        </Typography>
        <Typography className={classes.description}>
          choose the topics that your heart desires{" "}
        </Typography>
        <Grid container item direction='row' justify='space-around' xs={6}>
          {interests.map((interest, index) => (
            <Button
              className={classes.interestButton}
              key={index}
              onClick={() => {
                if (selected.includes(index)) {
                  setSelected(selected.filter((item) => item !== index));
                } else {
                  setSelected([...selected, index]);
                }
              }}
              style={{
                backgroundColor:
                  selected && selected.includes(index) ? "#8ED039" : "#D38851",
              }}
            >
              <Typography
                className={classes.buttonText}
              >{`+ ${interest}`}</Typography>
            </Button>
          ))}
        </Grid>
        {selected && (
          <Button className={classes.button} variant='contained'>
            <img src={arrowRight} width='80%' alt='nextPage'></img>
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default InterestsPage;
