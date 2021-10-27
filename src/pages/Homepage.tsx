import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import ViewWrapper from "../components/wrappers/ViewWrapper";

const useStyles = makeStyles({
  image: {
    borderRadius: "3rem",
    marginTop: "4rem",
  },
  itemComtainer: {
    display: "flex",
    justifyContent: "center",
  },
  goToSection: {
    display: "flex",
    margin: "auto",
  },
  itemText: {
    padding: "1rem 0",
  },
});
const homepageData = [
  {
    title: "Strategies",
    image: "/images/strategy.jpg",
    text: "HElfdkaj fdajl kfdjlfj adlfjdl fjdsalfj alfjdslkfjalsdjfladsj ladjflakjf dslkf jad;lkfjdsalfj a;",
    redirectPage: "/strategies",
  },
  {
    title: "Virtual Portfolio",
    image: "/images/stockPortfolio.jpg",
    text: "HElfdkaj fdajl kfdjlfj adlfjdl fjdsalfj alfjdslkfjalsdjfladsj ladjflakjf dslkf jad;lkfjdsalfj a;",
    redirectPage: "/virtual-portfolio",
  },
  {
    title: "Screener",
    image: "/images/findStock.jpg",
    text: "HElfdkaj fdajl kfdjlfj adlfjdl fjdsalfj alfjdslkfjalsdjfladsj ladjflakjf dslkf jad;lkfjdsalfj a;",
    redirectPage: "/screener",
  },
  {
    title: "News",
    image: "/images/stockNews.jpg",
    text: "HElfdkaj fdajl kfdjlfj adlfjdl fjdsalfj alfjdslkfjalsdjfladsj ladjflakjf dslkf jad;lkfjdsalfj a;",
    redirectPage: "/news",
  },
];
export default function HomePage() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <ViewWrapper>
      {homepageData.map((homepageItem) => (
        <Grid container spacing={10} className={classes.itemComtainer}>
          <Grid item xs={5}>
            {
              <img
                src={homepageItem.image}
                height="250"
                alt="Strategies"
                className={classes.image}
              />
            }
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h3" align="center">
              {homepageItem.title}
            </Typography>
            <Typography className={classes.itemText}>
              {homepageItem.text}
            </Typography>
            <Button
              className={classes.goToSection}
              variant="contained"
              color="secondary"
              onClick={() => history.push(homepageItem.redirectPage || "")}
            >
              Go To {homepageItem.title}
            </Button>
          </Grid>
        </Grid>
      ))}
    </ViewWrapper>
  );
}
