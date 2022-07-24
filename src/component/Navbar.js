import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Modal,
  Paper,
  Grid,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import logo from "./SmallLogo.png";
import isAuth, { userType } from "../lib/isAuth";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontWeight: "bold",
    color: "#088475",
    flexGrow: 1,
  },
  auths: {
    fontWeight: "bold",
    fontSize: "15px",
    color: "#088475",
  },
  keys: {
    color: "#088475",
  },
}));
const Blogo = () => {
  let history = useHistory();
  return (
    <img
      style={{ width: "40px", height: "40px", paddingRight: "10px",cursor:"pointer" }}
      src={logo}
      alt="Logo"
      onClick={()=>history.push("/")}
    />
  );
};

const HelpTile = (prop) => {
  const { open, handleClose } = prop;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        style={{
          padding: "25px",
          outline: "none",
          minWidth: "10%",
        }}
        elevation={3}
      >
        <Grid container>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/th-zyfvwDdI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Grid>
      </Paper>
    </Modal>
  );
};

const Navbar = (props) => {
  const classes = useStyles();
  let history = useHistory();

  const handleClick = (location) => {
    console.log(location);
    history.push(location);
  };

  const [helpOpen, setHelp] = useState(false);

  return (
    <AppBar position="fixed" color="whitesmoke">
      <Toolbar>
        {isAuth() ? (
          userType() === "recruiter" ? (
            <>
              <Blogo />
              <Typography variant="h6" className={classes.title}>
                HR Portal
              </Typography>
              <Button
                className={classes.keys}
                onClick={() => handleClick("/home")}
              >
                Home
              </Button>
              <Button
                className={classes.keys}
                onClick={() => handleClick("/addjob")}
              >
                Add Jobs
              </Button>
              <Button
                className={classes.keys}
                onClick={() => handleClick("/myjobs")}
              >
                My Jobs
              </Button>
              <Button
                className={classes.keys}
                onClick={() => handleClick("/employees")}
              >
                Under Review
              </Button>
              <Button
                className={classes.keys}
                onClick={() => handleClick("/schedule")}
              >
                Schedule
              </Button>
              <Button
                className={classes.keys}
                onClick={() => handleClick("/profile")}
              >
                Profile
              </Button>
              <Button
                className={classes.keys}
                onClick={() => handleClick("/logout")}
              >
                Logout
              </Button>
            </>
          ) : userType() === "applicant" ? (
            <>
              <Blogo />
              <Typography variant="h6" className={classes.title}>
                Applicant Portal
              </Typography>
              <Button
                className={classes.keys}
                onClick={() => handleClick("/home")}
              >
                Jobs
              </Button>
              <Button
                className={classes.keys}
                onClick={() => handleClick("/applications")}
              >
                Applications
              </Button>
              <Button
                className={classes.keys}
                onClick={() => handleClick("/profile")}
              >
                Profile
              </Button>
              <Button
                className={classes.keys}
                onClick={() => handleClick("/logout")}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Blogo />
              <Typography variant="h6" className={classes.title}>
                Admins Portal
              </Typography>
              <Button
                className={classes.keys}
                onClick={() => handleClick("/")}
              >
                status
              </Button>
              <Button
                className={classes.keys}
                onClick={() => handleClick("./adminHome")}
              >
                Applicants
              </Button>
              <Button
                className={classes.keys}
                onClick={() => handleClick("/getRecruiters")}
              >
                HR
              </Button>
              <Button
                className={classes.keys}
                onClick={() => handleClick("/adminjobs")}
              >
                Jobs
              </Button>
              <Button
                className={classes.keys}
                onClick={() => handleClick("/CreateUser")}
              >
                Add HR/Admin
              </Button>
              <Button
                className={classes.keys}
                onClick={() => handleClick("/logout")}
              >
                Logout
              </Button>
            </>
          )
        ) : (
          <>
            <Blogo />
            <Typography className={classes.title}>
              <Button
                className={classes.auths}
                onClick={() => handleClick("/login")}
              >
                Login
              </Button>
              <Button
                className={classes.auths}
                onClick={() => handleClick("/signup")}
              >
                Signup
              </Button>
            </Typography>
            <Button className={classes.keys} onClick={() => setHelp(true)}>
              How to use
            </Button>
          </>
        )}
      </Toolbar>
      <HelpTile open={helpOpen} handleClose={() => setHelp(false)} />
    </AppBar>
  );
};

export default Navbar;
