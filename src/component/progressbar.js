import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";

class ColoredLinearProgress extends Component {
  render() {
    const { classes } = this.props;
    return (
      <LinearProgress
        {...this.props}
        variant="determinate"
        value={this.props.value}
        classes={{
          colorPrimary: classes.colorPrimary,
          barColorPrimary: classes.barColorPrimary,
        }}
      />
    );
  }
}

const styles = (props) => ({
  colorPrimary: {
    backgroundColor: "#B2DFDB",
  },
  barColorPrimary: {
    backgroundColor: "#088475",
  },
});

export default withStyles(styles)(ColoredLinearProgress);
