import { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import mascot from "./mascot.png";
import rao from "./rao.jfif";
import Carousel from "react-material-ui-carousel";
import { makeStyles } from "@material-ui/core";
import Marquee from "react-double-marquee";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  jobTileOuter: {
    padding: "20px",
    boxSizing: "border-box",
    width: "auto",
    height: "auto",
    backgroundColor: "rgb(8, 132, 118,0.0)",
  },
  Carasol: {
    padding: "30px",
    margin: "20px 20",
    boxSizing: "border-box",
    width: "auto",
    height: "auto",
    backgroundColor: "rgb(8, 132, 118,0.25)",
    paddingBottom: "150px",
  },
  Carasol2: {
    paddingLeft: "30px",
    paddingRight: "30px",
    paddingBottom: "30px",
    paddingTop: "10px",
    margin: "20px 20",
    boxSizing: "border-box",
    width: "auto",
    height: "auto",
    backgroundColor: "rgb(8, 132, 118,0.25)",
    paddingBottom: "150px",
  },
  marquee: {
    width: window.innerWidth < 450 ? window.innerWidth : "1023px",
    height: "20px",
    whiteSpace: "nowrap",
    backgroundColor: "rgb(8, 132, 118,0.4)",
  },
}));

const Example = (props) => {
  const classes = useStyles();
  var items = [1, 2, 3];

  const [jobs, setJobs] = useState();

  useEffect(() => {
    getData();
  }, []);

  const updates ="LATEST JOBS  =>  "
  const getData = () => {
    axios
      .get("http://localhost:4444/api/jobsUpdate")
      .then((response) => {
        setJobs( 
          response.data.filter((obj) => {
            const today = new Date();
            const deadline = new Date(obj.deadline);
            return deadline > today;
          })
        );
      })
      .catch((err) => {
        //  console.log(err.response.data);
        setJobs("no jobs");
      });
  };

  console.log(jobs)
  return (
    <>
      <Grid className={classes.marquee}>
        <Marquee>NEW Jobs update Resident Engineer
Company: Pakistan Real Estate Investment & Management Company (PRIMACO)
Salary: Rs.115000
Address: Pakistan Real Estate Investment & Management Company, 2nd Floor, EOBI House, Mauve Area, G-10/4, Islamabad, Pakistan.
09,Nov,21	1 Apply
	Project Manager
Company: Pakistan Real Estate Investment & Management Company (PRIMACO)
Salary: Rs.150000
Address: Pakistan Real Estate Investment & Management Company, 2nd Floor, EOBI House, Mauve Area, G-10/4, Islamabad, Pakistan.
09,Nov,21	2 Apply
	Planning Engineer  </Marquee>
      </Grid>
      <Carousel className={classes.Carasol2}>
        {items.map((i) => (
          <Item count={i} />
        ))}
      </Carousel>
      <Grid container className={classes.Carasol}>
        <Grid container direction={"row"} className={classes.jobTileOuter}>
          <Grid
            item
            style={{
              width: window.innerWidth < 450 ? "auto" : "500px",
              height: "auto",
              paddingTop: "30px",
            }}
          >
            <Typography
              style={{
                color: "#088475",
                paddingTop: "50px",
              }}
              variant="h4"
            >
              CEO Message
            </Typography>
            <Typography
              style={{
                color: "#404040",
                margin: "0px",
              }}
              variant="h7"
            >
              I believe that moving from multilingual big giants to Our Orginisation
              was one of the best decisions of my professional career. The
              development of human resource is one of the core focal point of
              our management. It is clear that our employees have played a
              crucial role in the success of Our Orginisation and that is only
              because we provide a challenging environment to our employees -
              and focus on their professional and personal growth at all levels
              so that they can excel in their fields in any industry. Our Human
              Resource department is playing a vital role to amalgamate the
              diversity and multi-ethnic work force to synergize a single aim
            </Typography>
            <Typography
              style={{
                color: "#088475",
              }}
              variant="h5"
            >
              Mr. Ahmed Ali Aalyan
            </Typography>
            <Typography
              style={{
                color: "#088475",
              }}
              variant="h5"
            >
              Our Orginisation (Pvt) Ltd
            </Typography>
          </Grid>
          <Grid item>
            <img
              style={{
                borderRadius: 200,
                height: window.innerWidth < 450 ? "200px" : "425px",
                widows: window.innerWidth < 450 ? "200px" : "425px",
              }}
              src={rao}
            ></img>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.Carasol}>
        <Grid container direction={"row"}>
          <Grid
            item
            style={{
              width: window.innerWidth < 450 ? "auto" : "500px",
              height: "300px",
              paddingTop: "30px",
            }}
          >
            <Typography
              style={{
                color: "#088475",
                //paddingTop: "20px",
              }}
              variant="h4"
            >
              Corporate Offices
            </Typography>
            <Typography
              style={{
                color: "#404040",
                paddingTop: "20px",
                cursor: "pointer",
              }}
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/Customer+Support+Center+Bahria+Town+Phase+8+Rawalpindi/@33.4927839,73.0929902,1290m/data=!3m1!1e3!4m5!3m4!1s0x38dff2b6effc184f:0xfa7bb2fef7deb718!8m2!3d33.4927794!4d73.0951839?shorturl=1",
                  "_blank"
                )
              }
              variant="h6"
            >
              ▶ Rawalpindi – Pakistan
            </Typography>
            <Typography
              style={{
                color: "#404040",
                paddingTop: "20px",
                cursor: "pointer",
              }}
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/Bahria+Enclave+Head+Office/@33.6827674,73.2504592,401m/data=!3m1!1e3!4m5!3m4!1s0x38dfe8404fdc54f9:0x2d47abee45df643!8m2!3d33.6826117!4d73.2507681?shorturl=1",
                  "_blank"
                )
              }
              variant="h6"
            >
              ▶ Islamabad – Pakistan
            </Typography>
            <Typography
              style={{
                color: "#404040",
                paddingTop: "20px",
                cursor: "pointer",
              }}
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/Bahria+Town+Karachi+Head+Office/@25.0279505,67.3046376,1402m/data=!3m1!1e3!4m5!3m4!1s0x3eb34a353e8d20d3:0x8eeded043ed22b36!8m2!3d25.0279457!4d67.3068316?shorturl=1",
                  "_blank"
                )
              }
              variant="h6"
            >
              ▶ Karachi – Pakistan
            </Typography>
            <Typography
              style={{
                color: "#404040",
                paddingTop: "40px",
                cursor: "pointer",
              }}
              variant="h5"
              onClick={() => window.open("tel:0800 00100", "_blank")}
            >
              ☎ Toll Free 0800 00100
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              style={{
                color: "#404040",
                paddingTop: "90px",
                cursor: "pointer",
              }}
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/Bahria+Town+Corporate+Office/@31.3156998,74.2065195,1321m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0xc93648f4d074f789!8m2!3d31.3156952!4d74.2087124?shorturl=1",
                  "_blank"
                )
              }
              variant="h6"
            >
              ▶ Lahore – Pakistan
            </Typography>
            <Typography
              style={{
                color: "#404040",
                paddingTop: "20px",
                cursor: "pointer",
              }}
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/Bahria+Town+Nawabshah/@26.2488248,68.2584486,1388m/data=!3m2!1e3!4b1!4m5!3m4!1s0x394a5312412f7c13:0x17e1beb83de2b948!8m2!3d26.24882!4d68.2606426?shorturl=1",
                  "_blank"
                )
              }
              variant="h6"
            >
              ▶ Nawabshah – Pakistan
            </Typography>
            <Typography
              style={{
                color: "#404040",
                paddingTop: "20px",
                cursor: "pointer",
              }}
              onClick={() =>
                window.open("mailto:care@OurOrginisation.com.pk", "_blank")
              }
              variant="h6"
            >
              ▶ Peshawar – Pakistan
            </Typography>
            <Typography
              style={{
                color: "#404040",
                paddingTop: "40px",
                cursor: "pointer",
              }}
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/Bahria+Town+Peshawar+Sales+Office+(Internik)/@34.0163269,71.6994853,356m/data=!3m2!1e3!4b1!4m5!3m4!1s0x38d93bfcb221936f:0x755b1c772bdb436d!8m2!3d34.0163269!4d71.700592",
                  "_blank"
                )
              }
              variant="h5"
            >
              ✉ care@OurOrginisation.com.pk
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const Item = (props) => {
  const classes = useStyles();
  const { count } = props;
  return (
    <Grid container direction={"row"} className={classes.jobTileOuter}>
      <Grid
        item
        style={{
          width: window.innerWidth < 450 ? "auto" : "500px",
          height: "auto",
          paddingTop: window.innerWidth < 450 ? "0px" : "30px",
        }}
      >
        <Typography
          style={{
            color: "#088475",
            paddingTop: window.innerWidth < 450 ? "0px" : "50px",
          }}
          variant={window.innerWidth < 450 ? "h6" : "h4"}
        >
          {count == 1
            ? "WELCOME TO Our Orginisation CAREERS"
            : count == 2
            ? "WHAT WE BELIEVE"
            : "WHAT WE VALUE"}
        </Typography>
        <Typography
          style={{
            color: "#404040",
            margin: "0px",
          }}
          variant={window.innerWidth < 450 ? "h8" : "h6"}
        >
          {count == 1
            ? "Our Orginisation focuses on development of professional and personal skills and encourages teamwork as well as active contribution within a diverse cultural environment. Our Orginisation is committed to recruiting nationals all over the world and with a total number of more then 20,000 employees."
            : count == 2
            ? "We believe that expertise, collaboration and leadership delivers exceptional results and that our decisions made today will define a better future. We are committed to use our knowledge, skills and experience to create positive change. We believe in improving and innovating to grow and evolve our services to benefit our partners."
            : "Collaboration - We connect and listen to our clients to turn opportunities into the best outcomes for all. Driven to Succeed - We are passionate about what we do which is the foundation of your success. Curiosity - There is always a way to improve and innovate to make sure we excel in what we do. Agility - We drive change and use it to create opportunities."}
        </Typography>
      </Grid>
      <Grid item>
        <img
          style={{
            height: window.innerWidth < 450 ? "200px" : "425px",
            widows: window.innerWidth < 450 ? "200px" : "425px",
          }}
          src={mascot}
        ></img>
      </Grid>
    </Grid>
  );
};
export default Example;
