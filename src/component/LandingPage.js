import { Grid, Typography, Paper } from "@material-ui/core";
import fb from "./fb.png";
import twitter from "./twitter.png";
import yt from "./yt.png";
import insta from "./insta.png";
import Example from "./carasol";
import { useEffect, useState } from "react";

const WelcomeSite = (props) => {
  const [hight, setHight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Example />
      <Grid
        style={{
          backgroundColor: "rgb(8, 132, 118,0.7)",
          position: "fixed",
          bottom: 0,
          //  right:0,
          height: "50px",
          width: width,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <img
          style={{ padding: "10px", cursor: "pointer" }}
          onClick={() =>
            window.open("https://www.facebook.com/", "_blank")
          }
          src={fb}
        ></img>
        <img
          style={{ padding: "10px", cursor: "pointer" }}
          onClick={() =>
            window.open(
              "https://www.youtube.com",
              "_blank"
            )
          }
          src={yt}
        ></img>
        <img
          style={{ padding: "10px", cursor: "pointer" }}
          onClick={() =>
            window.open(
              "https://twitter.com/",
              "_blank"
            )
          }
          src={twitter}
        ></img>
        <img
          style={{ padding: "10px", cursor: "pointer" }}
          onClick={() =>
            window.open(
              "https://www.instagram.com/",
              "_blank"
            )
          }
          src={insta}
        ></img>
        <Typography
          style={{
            display: "flex",
            marginLeft: "auto",
            float: "right",
            color: "white",
            fontSize: "12px",
            padding: "15px",
          }}
        >
          2021 ©️ all right reserved
        </Typography>
      </Grid>
    </>
  );
};
export default WelcomeSite;
