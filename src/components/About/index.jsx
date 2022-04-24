import React from "react";
import { Grid, Card, CardHeader, CardContent } from "@mui/material";
import picture from "./abouts/pictures/gasStation.jpg";
import ValueCard from "./abouts/ValueCard.jsx";
import { values } from "./abouts/OurValues";
import Fade from "react-reveal/Fade";
import { information } from "./abouts/Informationboxes";
import { profiles } from "./abouts/Profiles";

export default function About() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={6} sx={{ display: "flex" }}>
        <Fade bottom>
          <Card
            sx={{
              height: "100%",
            }}
          >
            <CardHeader sx={{ textAlign: "center" }} title="About us" />
            <CardContent>
              <h2>We are all about cheap gas</h2>
              <h4>
                We at GFuel are all about finding the best prices for our
                customers. We help customers all around the world in finding
                both the best price and the best route to the station. This is a
                tool which can change how we look at the world, and will help to
                improve spendings across all homes in the entire world. We know
                that we have developed a phenomenal application, and we hope you
                will enjoy using it in all foreseeable future.
              </h4>
            </CardContent>
          </Card>
        </Fade>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Fade bottom>
          <Card>
            <img src={picture} alt="" />
          </Card>
        </Fade>
      </Grid>
      <Grid item xs={12} sm={4} md={12}>
        <Fade bottom>
          <Card>
            <CardHeader sx={{ textAlign: "center" }} title="Our Values" />
            <Grid container spacing={3}>
              {values.map((card) => (
                <Grid
                  key={card.title}
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  sx={{ height: "100%" }}
                >
                  <CardContent>
                    <ValueCard
                      title={card.title}
                      text={card.text}
                      pic={card.pic}
                    />
                  </CardContent>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Fade>
      </Grid>
      <Grid item xs={12} sm={4} md={12}>
        <Fade bottom>
          <Card>
            <CardHeader
              sx={{ textAlign: "center" }}
              title="How we are changing the world"
            />
            <Grid container spacing={3}>
              {information.map((info) => (
                <Grid
                  key={info.title}
                  item
                  xs={12}
                  sm={3}
                  md={3}
                  sx={{ height: "10rem" }}
                >
                  <CardContent>
                    <ValueCard title={info.title} text={info.text} />
                  </CardContent>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Fade>
      </Grid>
      <Grid item xs={12} sm={4} md={12}>
        <Fade bottom>
          <Card>
            <CardHeader
              sx={{ textAlign: "center" }}
              title="Meet our leadership"
            ></CardHeader>
            <Grid container spacing={3}>
              {profiles.map((profile) => (
                <Grid
                  key={profile.title}
                  item
                  xs={12}
                  sm={4}
                  md={3}
                  sx={{ height: "100%" }}
                >
                  <CardContent>
                    <ValueCard
                      title={profile.name}
                      text={profile.title}
                      pic={profile.pic}
                    />
                  </CardContent>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Fade>
      </Grid>
    </Grid>
  );
}
