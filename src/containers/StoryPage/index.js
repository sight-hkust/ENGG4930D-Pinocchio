import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Button } from "@material-ui/core";
import NavigationBar from "../../components/NavigationBar";
import NextButton from "../../components/NextButton";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    fontSize: 60,
    textAlign: "center",
    "@media (max-width:480px)": {
      fontSize: 40,
      textAlign: "left",
    },
  },
  paper: {
    height: "60vh",
    padding: "47px 29px",
    backgroundColor: "#FFD7D7",
    borderRadius: 30,
  },
}));

function StoryPage() {
  const history = useHistory();
  const classes = useStyles();

  const handlePreviousPage = () => history.push("/forum");

  return (
    <Grid container direction='column' style={{ alignContent: "center" }}>
      <NavigationBar showMenu />
      <Grid container direction='column' style={{ padding: 30 }}>
        <Typography className={classes.title}>The Storybook</Typography>
        <Grid
          container
          direction='row'
          justify='space-between'
          style={{ padding: "8px 8px 15px" }}
        >
          <Typography>07/03/2021</Typography>
          <Typography
            style={{
              fontSize: 12,
              backgroundColor: "#F9A586",
              borderRadius: 20,
              padding: "3px 10px",
            }}
          >
            Motivation
          </Typography>
        </Grid>
        <Grid container className={classes.paper}></Grid>
        <NextButton
          style={{ transform: "scaleX(-1)" }}
          onClick={() => handlePreviousPage()}
        />
      </Grid>
    </Grid>
  );
}

export default StoryPage;
