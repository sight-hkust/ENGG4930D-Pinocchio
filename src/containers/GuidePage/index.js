import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, useMediaQuery } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import NavigationBar from "../../components/NavigationBar";
import guidePage1 from "../../assets/guidePage1.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "center",
  },
}));

function GuidePage() {
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:480px)");
  const [showDialogBox, setShowDialogBox] = useState(false);

  return (
    <Grid container style={{ display: "flex" }}>
      <Carousel showThumbs={false} showStatus={false}>
        <div>
          <img alt='' src={guidePage1} width='100%' height='100%' />
        </div>
        <div>
          <img alt='' src={guidePage1} width='100%' height='100%' />
        </div>
        <div>
          <img alt='' src={guidePage1} width='100%' height='100%' />
        </div>
      </Carousel>
    </Grid>
  );
}

export default GuidePage;
