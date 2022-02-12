import React, { useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import InteractiveJar from "../../Components/InteractiveJar";
import { centerstyle } from "../../Styles";

export default function Candy() {
  const [start, setStart] = useState(false);
  const [isFilledOnce, setIsFilledOnce] = useState(false);

  return (
    <>
      <div className="box">
        <Container style={{ ...centerstyle, height: "100%" }}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">
                Fill me some candies in this jar please.
              </Typography>
              <Button
                onClick={() => {
                  setIsFilledOnce(true);
                  setStart(true);
                }}
                color="secondary"
                variant="contained"
                style={{ marginTop: 20 }}
              >
                {start
                  ? "Filling Candies"
                  : isFilledOnce
                  ? "Fill Even More Candies"
                  : "Fill Candies"}
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <InteractiveJar start={start} setStart={setStart} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
