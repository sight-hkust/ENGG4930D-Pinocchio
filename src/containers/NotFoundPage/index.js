import React from "react";
import { Typography, Grid } from "@material-ui/core";
import backgroundImage from "../../assets/notFound.png";
import { useTranslation } from "react-i18next";

function NotFoundPage() {
  const { t } = useTranslation();
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
        <Typography style={{ fontSize: 60 }}>{t("notFoundPage.hmmText")}</Typography>
        <Typography style={{ fontSize: 30 }}>
          {t("notFoundPage.wrongPlaceText")}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default NotFoundPage;
