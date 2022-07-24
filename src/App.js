import { createContext, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";

import Welcome, { ErrorPage } from "./component/Welcome";
import WelcomeUser from "./component/WelcomeUser";
import Landing from "./component/LandingPage";
import Navbar from "./component/Navbar";
import NotFound from "./component/404";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Signup from "./component/Signup";
import Home from "./component/Home";
import Admin from "./component/Admin/Home";
import Status from "./component/Admin/Status";
import Recruiters from "./component/Admin/Recruiters";
import AdminJobs from "./component/Admin/Jobs";
import Applications from "./component/Applications";
import Profile from "./component/Profile";
import CreateJobs from "./component/recruiter/CreateJobs";
import MyJobs from "./component/recruiter/MyJobs";
import Schedule from "./component/recruiter/Schedule";
import JobApplications from "./component/recruiter/JobApplications";
import AcceptedApplicants from "./component/recruiter/AcceptedApplicants";
import RecruiterProfile from "./component/recruiter/Profile";
import AddUser from "./component/Admin/CreatUser";
import MessagePopup from "./lib/MessagePopup";
import isAuth, { userType } from "./lib/isAuth";
import logo from "./logo.png";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundImage: `url(${logo})`,
    backgroundPosition:"center",
    backgroundSize:"cover",
    backgroundAttachment: "fixed",
    background: "#f7faf9",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "98vh",
    paddingTop: "60px",
    boxSizing: "border-box",
    width: "100%",
  },
}));

export const SetPopupContext = createContext();

function App() {
  const classes = useStyles();
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });
  return (
    <BrowserRouter>
      <SetPopupContext.Provider value={setPopup}>
        <Grid container direction="column">
          <Grid item xs>
            <Navbar />
          </Grid>
          <Grid item className={classes.body}>
            <Switch>
              <Route exact path="/">
                {userType() === "applicant" ? (
                  <WelcomeUser />
                ) : userType() === null ? (
                  <Landing />
                ) : userType() === "admin" ? (
                  <Status />
                ) : (
                  <Welcome />
                )}
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/logout">
                <Logout />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/adminHome">
                {userType() === "admin" ? <Admin /> : <NotFound />}
              </Route>
              <Route exact path="/CreateUser">
                {userType() === "admin" ? <AddUser /> : <NotFound />}
              </Route>
              <Route exact path="/adminJobs">
                {userType() === "admin" ? <AdminJobs /> : <NotFound />}
              </Route>
              <Route exact path="/getRecruiters">
                {userType() === "admin" ? <Recruiters /> : <NotFound />}
              </Route>
              <Route exact path="/applications">
                {userType() === "applicant" ? <Applications /> : <NotFound />}
              </Route>
              <Route exact path="/profile">
                {userType() === "recruiter" ? (
                  <RecruiterProfile />
                ) : (
                  <Profile />
                )}
              </Route>
              <Route exact path="/schedule">
                {userType() === "recruiter" ? <Schedule /> : <NotFound />}
              </Route>
              <Route exact path="/addjob">
                {userType() === "recruiter" ? <CreateJobs /> : <NotFound />}
              </Route>
              <Route exact path="/myjobs">
                {userType() === "recruiter" ? <MyJobs /> : <NotFound />}
              </Route>
              <Route exact path="/job/applications/:jobId">
                {userType() === "recruiter" ? (
                  <JobApplications />
                ) : (
                  <NotFound />
                )}
              </Route>
              <Route exact path="/employees">
                {userType() === "recruiter" ? (
                  <AcceptedApplicants />
                ) : (
                  <NotFound />
                )}
              </Route>
              <Route>
                <ErrorPage />
              </Route>
            </Switch>
          </Grid>
        </Grid>
        <MessagePopup
          open={popup.open}
          setOpen={(status) =>
            setPopup({
              ...popup,
              open: status,
            })
          }
          severity={popup.severity}
          message={popup.message}
        />
      </SetPopupContext.Provider>
    </BrowserRouter>
  );
}

export default App;
