import React, { useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import InteractiveJar from "../../Components/InteractiveJar";
import { centerstyle } from "../../Styles";
import { CANDIES_LIMIT, CANDIES_PER_INTERVAL } from "../../Helpers";

export default function Candy() {
  const [start, setStart] = useState(false);
  const [isFilledOnce, setIsFilledOnce] = useState(false);
  const [current_candies, setCurrentCandies] = useState(0);

  return (
    <>
      <div className="box">
        <Container style={{ ...centerstyle, height: "100%" }}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              style={{ textAlign: "center", marginTop: 90 }}
            >
              <Typography variant="h4">
                Help Me Fill This Jar With Candies Please
              </Typography>
              <Button
                onClick={() => {
                  if (!start && current_candies < CANDIES_LIMIT) {
                    setIsFilledOnce(true);
                    setStart(true);
                    setCurrentCandies(
                      (prevState) => CANDIES_PER_INTERVAL + prevState
                    );
                  }
                }}
                color={
                  start || current_candies >= CANDIES_LIMIT
                    ? "primary"
                    : "secondary"
                }
                variant="contained"
                style={{ marginTop: 20 }}
              >
                {start
                  ? "Filling Candies"
                  : current_candies >= CANDIES_LIMIT
                  ? "Please Stop Wasting Candies 😥"
                  : isFilledOnce
                  ? "Fill Even More Candies"
                  : "Fill Candies"}
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <InteractiveJar
                start={start}
                setStart={setStart}
                current_candies={current_candies}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
