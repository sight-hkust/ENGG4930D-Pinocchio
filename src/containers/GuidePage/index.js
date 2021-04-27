import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography, useMediaQuery } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import guidePage1 from "../../assets/guidePage1.png";
import guidePage2 from "../../assets/guidePage2.png";
import guidePage3 from "../../assets/guidePage3.png";
import guidePage4 from "../../assets/guidePage4.png";
import guidePage5 from "../../assets/guidePage5.png";
import guidePage1Web from "../../assets/guidePage1Web.png";
import guidePage2Web from "../../assets/guidePage2Web.png";
import guidePage3Web from "../../assets/guidePage3Web.png";
import guidePage4Web from "../../assets/guidePage4Web.png";
import guidePage5Web from "../../assets/guidePage5Web.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useTranslation } from "react-i18next";
import DialogBox from "../../components/DialogBox";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "capitalize",
    backgroundColor: "#FFD7D7",
    borderRadius: 10,
    "&:hover": {
      backgroundColor: "#FFD7D7",
    },
    "@media (max-width:480px)": {
      marginBottom: 20,
    },
  },
  text: {
    fontSize: 30,
    "@media (max-width:480px)": {
      fontSize: 20,
    },
  },
}));

function GuidePage() {
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:480px)");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showStorybookRulesDialog, setStorybookRulesDialog] = useState(false);
  const { t } = useTranslation();
  return (
    <Grid container>
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        selectedItem={currentSlide}
        onChange={(index) => setCurrentSlide(index)}
      >
        {isMobile
          ? [guidePage1, guidePage2, guidePage3, guidePage4, guidePage5, "guidePage6",].map(
              (src, index) => {
                return index===5 ? (
                  <DialogBox
                    open={showStorybookRulesDialog}
                    HTMLString={t("guidePage.guidelines")}
                    onClose={() => setStorybookRulesDialog(false)}
                    onClickYes={() => history.push("/home")}
                    yesText={t("guidePage.agree")}
                  ></DialogBox>
                ) : (
                  <div>
                  <img alt='' src={src} />
                </div>
                );
              })
          : [
              guidePage1Web,
              guidePage2Web,
              guidePage3Web,
              guidePage4Web,
              guidePage5Web,
              "guidePage6Web",
            ].map((src, index) => {
              return index===5 ? (
                (setStorybookRulesDialog(true)) //needs to be fixed
              ) : (
                <div>
                <img alt='' src={src} style={{width: "80%"}}/>
              </div>
              );
            })}
            <DialogBox
                  open={showStorybookRulesDialog}
                  HTMLString={t("guidePage.guidelines")}
                  onClose={() => setStorybookRulesDialog(false)}
                  onClickYes={() => history.push("/home")}
                  yesText={t("guidePage.agree")}
                ></DialogBox>
      </Carousel>
      <Grid container direction='row' justify='space-around'>
        {isMobile ? (
          currentSlide === 4 && (
            <Button
              className={classes.button}
              style={{ alignSelf: "center" }}
              onClick={() =>
                currentSlide === 4
                  ? history.push("/forum")
                  : setCurrentSlide(currentSlide === 4 ? 4 : currentSlide + 1)
              }
            >
              <Typography className={classes.text}>{t("guidePage.goToForum")}</Typography>
            </Button>
            
          )
        ) : (
          <>
            <Button
              className={classes.button}
              onClick={() =>
                setCurrentSlide(currentSlide === 0 ? 0 : currentSlide - 1)
              }
            >
              <Typography className={classes.text}>{t("guidePage.previous")}</Typography>
            </Button>
            <Button
              className={classes.button}
              onClick={() =>
                currentSlide === 4
                  ? history.push("/forum")
                  : setCurrentSlide(currentSlide === 4 ? 4 : currentSlide + 1)
              }
            >
              <Typography className={classes.text}>
                {currentSlide === 4 ? (t("guidePage.goToForum")) : (t("guidePage.next"))}
              </Typography>
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default GuidePage;
