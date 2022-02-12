import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import InteractiveName from "../../Components/InteractiveName";
import { centerstyle } from "../../Styles";

export default function Intro() {
  return (
    <>
      <div className="box">
        <InteractiveName />
        <Container style={{ ...centerstyle, height: "100%" }}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography variant="h1">
                <strong>Hi</strong>, I'm
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
