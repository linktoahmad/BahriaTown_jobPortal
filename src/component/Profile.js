import { Profiler, useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Modal,
  Paper,
  makeStyles,
  TextField,
  Avatar,
} from "@material-ui/core";
import Progressbar from "./progressbar";
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import FileUploadInput from "../lib/FileUploadInput";
import DescriptionIcon from "@material-ui/icons/Description";
import FaceIcon from "@material-ui/icons/Face";
import { SetPopupContext } from "../App";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import apiList, { server } from "../lib/apiList";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // padding: "30px",
  },
  avatar: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
}));

const MultifieldInput = (props) => {
  const classes = useStyles();
  const { education, setEducation } = props;

  return (
    <>
      {education.map((obj, key) => (
        <Grid item container className={classes.inputBox} key={key}>
          <Grid item xs={6}>
            <TextField
              label={`Ecucation  #${key + 1}`}
              value={education[key].institutionName}
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].institutionName = event.target.value;
                setEducation(newEdu);
              }}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Start Year"
              value={obj.startYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].startYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="End Year"
              value={obj.endYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].endYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item style={{ alignSelf: "center" }}>
        <Button
          variant="contained"
          style={{
            background: "#088475",
            color: "white",
          }}
          onClick={() =>
            setEducation([
              ...education,
              {
                institutionName: "",
                startYear: "",
                endYear: "",
              },
            ])
          }
          className={classes.inputBox}
        >
          Add another institution details
        </Button>
      </Grid>
    </>
  );
};

const Profile = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  const [userData, setUserData] = useState();
  const [open, setOpen] = useState(false);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    education: [],
    skills: [],
    resume: "",
    profile: "",
    MyAddress: "",
    contactNumber: "",
    email: "",
  });
  const [progress, setprogress] = useState(0);

  const [education, setEducation] = useState([
    {
      institutionName: "",
      startYear: "",
      endYear: "",
    },
  ]);
  const [phone, setPhone] = useState("");
  const handleInput = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value,
    });
    progresupdae();
  };

  useEffect(() => {
    getData()
  }, []);

  const getData = () => {
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        //console.log(response.data);
        setProfileDetails(response.data);
        setPhone(response.data.contactNumber)
        if (response.data.education.length > 0) {
          setEducation(
            response.data.education.map((edu) => ({
              institutionName: edu.institutionName ? edu.institutionName : "",
              startYear: edu.startYear ? edu.startYear : "",
              endYear: edu.endYear ? edu.endYear : "",
            }))
          );
        }
        
      })
      .catch((err) => {
        //console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  const progresupdae = () => {
    let count = 0;
    if (profileDetails.name.length > 1) {
      count += 12.5;
    }
    //console.log(profileDetails.name);
    if (profileDetails.contactNumber !== "") count += 12.5;
    //console.log(profileDetails.contactNumber);
    if (profileDetails.email !== "") count += 12.5;
    //console.log(profileDetails.email);
    if (profileDetails.MyAddress !== "") count += 12.5;
    //console.log(profileDetails.MyAddress);
    if (profileDetails.education !== []) count += 12.5;
    //console.log(profileDetails.education);
    if (profileDetails.skills !== []) count += 12.5;
    //console.log(profileDetails.skills);
    if (profileDetails.resume !== "") count += 12.5;
    //console.log(profileDetails.resume);
    if (profileDetails.profile !== "") count += 12.5;
    //console.log(profileDetails.profile);

    setTimeout(() => {
      setprogress(count);
    }, 1000);
    
  };

  progresupdae()

  const handleClose = () => {
    setOpen(false);
  };

  const editDetails = () => {
    setOpen(true);
  };

  const handleUpdate = () => {
    ////console.log(education);

    let updatedDetails = {
      ...profileDetails,
      education: education
        .filter((obj) => obj.institutionName.trim() !== "")
        .map((obj) => {
          if (obj["endYear"] === "") {
            delete obj["endYear"];
          }
          return obj;
        }),
    };

    if (phone !== "") {
      
      updatedDetails = {
        ...updatedDetails,
        contactNumber: `+${phone}`,
      };
    } else {
      updatedDetails = {
        ...updatedDetails,
        contactNumber: "",
      };
    }
    //alert(updatedDetails)
    axios
      .put(apiList.user, updatedDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        //console.log(err.response);
      });
    setOpen(false);
  };

  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: "30px", minHeight: "93vh" }}
      >
        <Grid item>
          <Typography variant="h2">Profile</Typography>
        </Grid>
        <Grid item xs>
          <Paper
            style={{
              padding: "20px",
              outline: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              container
              direction="column"
              alignItems="stretch"
              spacing={3}
              style={{ display: "flex" }}
            >
              <Typography style={{ alignSelf: "center" }}>
                Profile progress {progress}%
              </Typography>
              <Progressbar value={progress} />
              <Grid
                item
                direction="row"
                alignItems="stretch"
                spacing={3}
                style={{ display: "flex" }}
              >
                <Grid item style={{ paddingTop: "10px", paddingRight: "10px" }}>
                  <Avatar
                    src={`${server}${profileDetails.profile}`}
                    className={classes.avatar}
                  />
                </Grid>

                <Grid
                  container
                  direction="column"
                  alignItems="stretch"
                  spacing={3}
                  style={{ display: "flex" }}
                >
                  <Grid item>
                    <TextField
                      label="Name"
                      value={profileDetails.name}
                      onChange={(event) =>
                        handleInput("name", event.target.value)
                      }
                      className={classes.inputBox}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                  <PhoneInput
                  country={"pk"}
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  style={{ width: "auto" }}
                />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  label="E-mail"
                  value={profileDetails.email}
                  disabled={true}
                  className={classes.inputBox}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Address"
                  value={profileDetails.MyAddress}
                  onChange={(event) =>
                    handleInput("MyAddress", event.target.value)
                  }
                  className={classes.inputBox}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <MultifieldInput
                education={education}
                setEducation={setEducation}
              />
              <Grid item>
                <ChipInput
                  className={classes.inputBox}
                  label="Skills"
                  variant="outlined"
                  helperText="Press enter to add skills"
                  value={profileDetails.skills}
                  onAdd={(chip) =>
                    setProfileDetails({
                      ...profileDetails,
                      skills: [...profileDetails.skills, chip],
                    })
                  }
                  onDelete={(chip, index) => {
                    let skills = profileDetails.skills;
                    skills.splice(index, 1);
                    setProfileDetails({
                      ...profileDetails,
                      skills: skills,
                    });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <FileUploadInput
                  className={classes.inputBox}
                  label="Resume (.pdf)"
                  icon={<DescriptionIcon />}
                  uploadTo={apiList.uploadResume}
                  handleInput={handleInput}
                  identifier={"resume"}
                />
              </Grid>
              <Grid item>
                <FileUploadInput
                  className={classes.inputBox}
                  label="Profile Photo (.jpg/.png)"
                  icon={<FaceIcon />}
                  uploadTo={apiList.uploadProfileImage}
                  handleInput={handleInput}
                  identifier={"profile"}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              style={{
                background: "#088475",
                color: "white",
                padding: "10px 50px",
                marginTop: "30px",
              }}
              onClick={() => handleUpdate()}
            >
              Update Details
            </Button>
          </Paper>
        </Grid>
      </Grid>
      {/* <Modal open={open} onClose={handleClose} className={classes.popupDialog}> */}

      {/* </Modal> */}
    </>
  );
};

export default Profile;
