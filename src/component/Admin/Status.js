import { useEffect, useState, useContext } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import apiList from "../../lib/apiList";
import axios from "axios";
import { SetPopupContext } from "../../App";

const Status = (props) => {
  var d = new Date();
  var x = d.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let y = days[x];

  while (days[0] != y) {
    days.push(days[0]);

    days.splice(0, 1);
  }
  days.push(days[0]);
  days.splice(0, 1);

  const [status, setStatus] = useState("");
  const data = {
    labels: days,
    datasets: [
      {
        label: "New Users",
        data: status.userStatus,
        borderColor: "#f54266",
        backgroundColor: "#f54266",
        borderWidth: 5,
      },
      {
        label: "jobs Created",
        data: status.jobStatus,
        borderColor: "#4287f5",
        backgroundColor: "#4287f5",
        borderWidth: 5,
      },
    ],
  };
  const setPopup = useContext(SetPopupContext);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let address = apiList.getStatus;
    axios
      .get(address)
      .then((response) => {
        setStatus(response.data);
      })
      .catch((err) => {
        // console.log(err);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item xs>
        <Typography variant="h2">Status</Typography>
      </Grid>
      <Paper
        item
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "20px",
          width: "auto",
          height: "auot",
          backgroundColor: "white",
        }}
      >
        <Paper
          style={{
            width: "auto",
            height: "auto",
            backgroundColor: "rgb(8, 132, 118,0.1)",
            borderRadius: "5px",
          }}
        >
          <Line style={{ width: "800px" }} data={data}></Line>
        </Paper>
        <Grid item style={{ paddingLeft: "30px" }}>
          <Grid style={{ padding: "10px" }}>
            <Paper
              style={{
                width: "auto",
                height: "auto",
                padding: "10px",
                backgroundColor: "rgb(8, 132, 118,0.1)",
              }}
            >
              <Typography variant="h6">Visits</Typography>
              <Typography variant="h5">1000</Typography>
            </Paper>
          </Grid>
          <Grid style={{ padding: "10px" }}>
            <Paper
              style={{
                width: "auto",
                height: "auto",
                padding: "10px",
                backgroundColor: "rgb(8, 132, 118,0.1)",
              }}
            >
              <Typography variant="h6">total Users</Typography>
              <Typography variant="h5">{status.UserCount}</Typography>
            </Paper>
          </Grid>
          <Grid style={{ padding: "10px" }}>
            <Paper
              style={{
                width: "auto",
                height: "auto",
                padding: "10px",
                backgroundColor: "rgb(8, 132, 118,0.1)",
              }}
            >
              <Typography variant="h6">Total Jobs</Typography>
              <Typography variant="h5">{status.jobCount}</Typography>
            </Paper>
          </Grid>
          <Grid style={{ padding: "10px" }}>
            <Paper
              style={{
                width: "auto",
                height: "auto",
                padding: "10px",
                backgroundColor: "rgb(8, 132, 118,0.1)",
              }}
            >
              <Typography variant="h6">Total Applications</Typography>
              <Typography variant="h5">{status.ApplicationCount}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Status;
