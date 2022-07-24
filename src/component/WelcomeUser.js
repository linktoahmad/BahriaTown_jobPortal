import { Grid, Typography } from "@material-ui/core";
import Stepper from "./Stepper"

const WelcomeUser = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Welcome to Job Portal</Typography>
      </Grid>
      <Stepper/>
    </Grid>
  );
};

export default WelcomeUser;
