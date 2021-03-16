import React from "react";
import { Typography, Grid } from "@material-ui/core";
import backgroundImage from "../../assets/notFound.png";

function NotFoundPage() {
  return (
    <Grid
      container
      direction='row'
      style={{
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img alt='404notFound' src={backgroundImage} width='200px'></img>
      <Grid
        container
        direction='column'
        style={{
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography style={{ fontSize: 60 }}>🧐Hmmmmm...</Typography>
        <Typography style={{ fontSize: 30 }}>
          I think you are in the wrong place
        </Typography>
      </Grid>
    </Grid>
  );
}

export default NotFoundPage;
