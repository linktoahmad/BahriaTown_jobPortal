import { useContext, useEffect, useState } from "react";
import * as React from "react";
import {
  Button,
  Grid,
  Typography,
  Modal,
  Paper,
  makeStyles,
  TextField,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

import { SetPopupContext } from "../../App";

import apiList from "../../lib/apiList";

const filter = createFilterOptions();
const allJobs = [
  "Account Officer",
  "Accountant",
  "ACE",
  "ACE (Projects)",
  "ACE (Services)",
  "ACRO",
  "Admin Coordinator",
  "Admin Officer",
  "Administrator Human Resources",
  "Advisor (Business Development)",
  "Advisor (Real Estate)",
  "Account  Admin Officer",
  "Advisor to CE",
  "Aerobics Instructor",
  "AMS Officer",
  "Anesthetist",
  "Asphalt Plant Labor",
  "Asphalt Plant Operator",
  "Assistant",
  "Assistant AMS Officer",
  "Assistant Blasting",
  "Assistant Business Development",
  "Assistant Cardiac Surgeon",
  "Assistant Dental",
  "Assistant Despatch Clerk",
  "Assistant Dispatch",
  "Assistant Electrical Engineer",
  "Assistant Horticulture",
  "Assistant Legal Advisor",
  "Assistant Manager (Banking  Financ",
  "Assistant Manager Account",
  "Assistant Manager Audit",
  "Assistant Manager Banquet",
  "Assistant Manager Building Control",
  "Assistant Manager Contracts",
  "Assistant Manager Data Center",
  "Assistant Manager Finance",
  "Assistant Manager GR",
  "Assistant Manager Horticulture",
  "Assistant Manager HR",
  "Assistant Manager Maintenance",
  "Assistant Manager Marketing",
  "Assistant Manager PR",
  "Assistant Manager Purchase",
  "Assistant Manager Security",
  "Assistant Manager Transport",
  "Assistant Manager Water Supply",
  "Assistant OT",
  "Assistant Patwari",
  "Assistant Purchaser",
  "Assistant QA",
  "Assistant QC",
  "Assistant Quantity Engineer",
  "Assistant Sale Manager",
  "Assistant Site Engineer",
  "Assistant Structure Engineer",
  "Assistant Supervisor Maintenance",
  "Assistant Surveyor",
  "Assistant Technical",
  "Assistant Town Planner",
  "Assistant Vet",
  "Assistant Visa Officer",
  "Assistant Warehouse",
  "Assistants Manager Construction",
  "Asstt Admin Officer",
  "Asstt. Auditor",
  "Asstt. Despatch/Record Clerk",
  "Asstt. Law Officer",
  "Asstt. Legal Advisor",
  "Asstt. Manager",
  "Asstt. Manager (Admin  Coord)",
  "Asstt. Manager (Admin and Ops)",
  "Asstt. Manager (Admin)",
  "Asstt. Manager (CR)",
  "Asstt. Manager (CS)",
  "Asstt. Manager (Customer Relations)",
  "Asstt. Manager (Finance)",
  "Asstt. Manager (Marketing)",
  "Asstt. Manager Accounts",
  "Asstt. Manager Business Technology",
  "Asstt. Manager Internal Audit",
  "Asstt. Manager Land",
  "Asstt. Manager Records",
  "Asstt. Network Administrator",
  "Asstt. OIC/R",
  "Asstt. Project Manager",
  "Asstt. Record Keeper",
  "Audit Internship",
  "Audit Officer",
  "Auditor",
  "Auto Electrician",
  "AutoCad Operator",
  "AV Support Executive",
  "Aviation",
  "Baker",
  "Baker II",
  "Banquet Chef",
  "Barber",
  "BBQ Cook",
  "Beautician",
  "Billing Clerk",
  "Blasting Foreman",
  "Bouncer",
  "Brand Manager",
  "Broomer Fitter",
  "Building Inspector",
  "Bus Conductor",
  "Business Development Executive",
  "Business Technology Manager",
  "CAD Designer",
  "CAD Operator",
  "Cardiac Surgeon",
  "Carpenter",
  "CCTV",
  "Cement Mixer",
  "CFO",
  "Chairman",
  "Chapatti Maker",
  "Checkout Manager",
  "Checkout Manager Female",
  "Chef",
  "Chef De Partie",
  "Chemistry Teacher",
  "Chief Architect",
  "Chief Executive",
  "Chief Surveyor",
  "Civil Engineer",
  "Cleaning Supervisor",
  "Clerk",
  "Commis",
  "Complaint Attendant",
  "Computer Operator cum Accountant",
  "CONSTRUCTION MANAGER",
  "Consultant",
  "Consultant / Advisor",
  "Consultant Radiologist",
  "Continental Chef",
  "Controller Examination",
  "Cook",
  "Coordinating Officer",
  "Coordinator",
  "Coordinator Admin",
  "Coordinator Admin  Ops",
  "Coordinator Services",
  "Cost Controller",
  "Counter Person",
  "Crane Operator",
  "CRO",
  "Data Analyst",
  "Data Entry Operator",
  "DCE",
  "Dentist",
  "Deputy Manager (Finance  Accounts)",
  "Deputy Manager CR",
  "Deputy Manager Finance",
  "Deputy Manager HR",
  "Deputy Manager Records",
  "Design Engineer",
  "Despatch Rider",
  "Diesel Man",
  "Director Academics",
  "Director Engineering",
  "Director Land",
  "Dispenser",
  "Dog Handler",
  "Dog Helper",
  "Dozer Operater",
  "Drill Operator",
  "Driver",
  "Driver Bowzer",
  "Driver Bus",
  "Driver Dumper",
  "Driver Excavator",
  "Driver HTV",
  "Driver LTV",
  "Driver TM",
  "Dy. Manager (Accounts)",
  "Earth Work Foreman",
  "Elecrical Engineer",
  "Elecrical Engineer",
  "Elecrical Engineer",
  "Elecrical Engineer",
  "Elecrical Engineer",
  "Elecrical Engineer",
  "Environmental Engineer",
  "Excavator Operator",
  "Exchange Technician",
  "Executive Chef",
  "Executive Coordinator",
  "Executive Coordinator to VCE",
  "Executive Protection Officer",
  "Executive Secretary",
  "Executive Usher",
  "Field Officer",
  "Finance Officer",
  "Financial Advisor",
  "Fireman",
  "Fitte",
  "Food And Beverage Manager",
  "Foreign Teacher",
  "Front Desk Officer",
  "Front Desk Officer",
  "Garbage Collector",
  "Gardener",
  "General Manager Buildings and Infra",
  "General Surgeon",
  "Generator Operator",
  "Geologist",
  "GM (Coord  PR)",
  "GM (F)",
  "GM (Joint Venture Projects)",
  "GM (Marketing) North",
  "GM (Ops)",
  "GM (Rec)",
  "GM Business Development (DHA Affair",
  "GM Coord / Land",
  "GM CR",
  "GM IT",
  "GM Transfer",
  "Golf Attendant",
  "Grader Operator",
  "GRO Female",
  "Groomer",
  "Group Marketing Head",
  "Guide",
  "Gunman",
  "Gym Instructor",
  "Hair Stylist",
  "Head Admin",
  "Head Asset Management",
  "Head Coordination",
  "Head Education",
  "Head Government Relations",
  "Head of Human Resources",
  "Head of IT",
  "Head Operation",
  "Head PR",
  "Head Projects Development",
  "Head Waiter",
  "Help Desk Analyst",
  "Helper",
  "Helper AC Technician",
  "Helper Auto Electrician",
  "Helper Batching Plant",
  "Helper BBQ",
  "Helper Boring Machine",
  "Helper Bowzer",
  "Helper Carpenter",
  "Helper Cement",
  "Helper Cook",
  "Helper Crane",
  "Helper Crush Plant",
  "Helper Drill",
  "Helper Dumper",
  "Helper Electrician",
  "Helper Excavator",
  "Helper Generator",
  "Helper Grader",
  "Helper Hydraulic Mechanic",
  "Helper Lab",
  "Helper Mason",
  "Helper Mechanic",
  "Helper Mess",
  "Helper Painter",
  "Helper Paver",
  "Helper Plumber",
  "Helper Roller",
  "Helper Store",
  "Helper Surveyor",
  "Helper Technician",
  "Helper TM",
  "Helper Welder",
  "Helper Zoo",
  "History Teacher",
  "Horticulture",
  "Horticulturist",
  "Hotel Hostess",
  "House Attendant",
  "House Keeping Supervisor",
  "HR Assistant",
  "HR Executive",
  "HR Executive Hospital",
  "HR generalist",
  "HR Intern",
  "HR Intern",
  "HR Officer",
  "HR Officer",
  "HR Officer",
  "Hydraulic Mechanic",
  "I.T Site Coordinator",
  "Imam Masjid",
  "In charge ICU",
  "In charge Labor",
  "Incharge Operations (North)",
  "Incharge Trainee",
  "Internship",
  "Internship IT Networking",
  "IT Assistant",
  "IT Help Desk Analyst",
  "IT Manager",
  "IT Officer",
  "IT Technician",
  "Italian Chef",
  "Jr Infrastructure Engineer",
  "Junior Steward",
  "Kitchen Helper",
  "Kitchen Incharge",
  "KPO",
  "Lab Engineer and Lab Assistant",
  "Land Revenue Assistant",
  "Law Assistant",
  "Law Officer",
  "Lecturer",
  "Legal Advisor",
  "Legal Consultant",
  "Librarian",
  "Lift Operator",
  "Loader",
  "Logistics Admin",
  "Lotus Support Officer",
  "Lubricator",
  "Magazine Guard",
  "Maintenance Supervisor",
  "Makeup Artist",
  "Management Trainee",
  "Manager (Accounts)",
  "Manager (Marketing)",
  "Manager (Mkt  Ops)",
  "Manager Admin",
  "Manager Admission and Marketing",
  "Manager Audit",
  "Manager Banquet",
  "Manager Building Control",
  "Manager Business Development",
  "Manager Construction",
  "Manager Contracts",
  "Manager Coordinationn  II",
  "Manager CR",
  "Manager Data Center",
  "Manager Finance",
  "Manager Government Relations",
  "Manager Horticulture",
  "Manager Internal Audit",
  "Manager Land",
  "Manager Maintenance",
  "Manager Networks",
  "Manager PR",
  "Manager Purchase",
  "Manager Records",
  "Manager Revenue Settlement",
  "Manager Security (Land)",
  "Manager Transport",
  "Manager Warehouse",
  "Manager Water Supply",
  "Marketing Assistant",
  "Mason",
  "Mechanic",
  "Mechanical Engineer",
  "Media",
  "Medical Specialist",
  "MEP Engineer",
  "MEP Engineer",
  "Mess Waiter",
  "Meter Reader",
  "Moazan",
  "Music Teacher",
  "Nadra Machine Operator",
  "Nephrologists",
  "Network Administrator",
  "Network Support Exec",
  "Network Support Executive",
  "Night Watchman",
  "Non Linear Editor",
  "Nurses",
  "Office Assistant",
  "Office Cleaner",
  "Office Coordinator",
  "Office Runner",
  "Officer Incharge (Record)",
  "OIC/R",
  "Operator Batching Plant",
  "Operator Bobcat",
  "Operator Boiler",
  "Operator Boring Machine",
  "Operator Crush Plant",
  "Operator Mixture",
  "Operator Paver",
  "Operator Plant",
  "Operator PTR",
  "Operator Pump",
  "PA to VCE",
  "Painter",
  "Pastry Chef",
  "Patwari",
  "Payroll Executive",
  "Perfusionist",
  "Photo Copier Operator",
  "Photocopier",
  "Photocopier Operator",
  "Photographer and Videographer",
  "Photographer plus Videographer",
  "Physiotherapist",
  "Pipe Fitter",
  "Plumber",
  "Principal",
  "Procurement Manager",
  "PROCUREMENT Officer",
  "Programmer",
  "Project Coordinator",
  "Project Manager",
  "Project Manager Buildings and Infra",
  "Project Manager Highrise",
  "PSO to CE",
  "Public Relation Officer",
  "Purchase Officer",
  "QC",
  "Quantity Engineer",
  "Radiographer",
  "Receptionist",
  "Record Assistant",
  "Regional Chief EXECUTIVE",
  "Regional GM (South)",
  "Religious Teacher",
  "Roller Operator",
  "Safety Engineer",
  "Safety Inspector",
  "Sale Manager",
  "Sales Officer",
  "SDO",
  "Security Guard",
  "Security Manager",
  "Security Supervisor",
  "Senior Accounts Officer",
  "Senior Auditor",
  "Senior Chef",
  "Senior Gardener",
  "Senior Key Punch Operator",
  "Senior Manager (Banking Affairs)",
  "Senior Manager Finance",
  "Senior Manager procurement",
  "Senior Manager Purchase",
  "Senior MEP Engineer",
  "Senior Network Administrator",
  "Senior Project Manager",
  "Senior Record Assistant",
  "Senior Resident Engineer",
  "Senior Software Engineer",
  "Senior Steward",
  "Senior Store Keeper",
  "Senior Supervisor Security",
  "Senior Surveyor",
  "Sign Board Fitter",
  "Site Engineer",
  "Site Engineer Civil Engineer",
  "Site Inspector",
  "Site Supervisor",
  "Social Media Blogger",
  "Social Media Manager",
  "Software Engineer",
  "Sous Chef",
  "Spray Man",
  "Sr Infrastructure Engineer",
  "Sr Land Surveyor",
  "Sr Project Manage Infrastructure",
  "Sr. GM CR",
  "Sr. GM Transfer",
  "Sr. Manager (CR)",
  "Sr. Manager (Ops)",
  "Sr. Manager ICT",
  "Sr. Sorfware Engineer",
  "SSA",
  "SSG Commando",
  "Staff Nurse",
  "Steel Fixer",
  "Steno typist",
  "Steward",
  "STORE KEEPER",
  "Sub Engineer",
  "Superintendent",
  "Supervisor",
  "Supervisor Cleaning",
  "Supervisor CSSD",
  "Supervisor Dumping",
  "Supervisor Gardener",
  "Supervisor Gas",
  "Supervisor House Keeping",
  "Supervisor Intelligence",
  "Supervisor Lab",
  "Supervisor Material",
  "Supervisor Mess",
  "Supervisor Plumbing",
  "Supervisor Transport",
  "Supervisor Water Supply",
  "Supervisor Workshop",
  "Supply Chain Manager",
  "Support Officer",
  "Surveillance Assistant",
  "Surveyor",
  "Surveyor",
  "Surveyor",
  "Surveyor",
  "Surveyor",
  "Surveyor",
  "Sweeper",
  "Sweet Maker",
  "Swimming Instructor",
  "Swimming Instructor",
  "Swimming Instructor Assistant",
  "System Administrator",
  "System Engineer",
  "Tailor",
  "Tandoorchi",
  "Teacher",
  "Teacher Assistant",
  "Team Lead Surveillance",
  "Technical Assistant",
  "Technical Officer",
  "Technician",
  "Technician AC",
  "Technician Bio Med",
  "Technician CT Scan",
  "Technician Dialysis",
  "Technician ETT",
  "Technician Lab",
  "Technician XRay",
  "Telephone Operator",
  "Test by Babur",
  "Test To Be Deleted",
  "TestDesignation",
  "Therapist",
  "Ticketing  Visa Assistant",
  "Ticketing Officer",
  "Ticketing Person",
  "Trainee Engineer",
  "VCE (Ops.  Admin)",
  "VCE ProjectsI",
  "VCE ProjectsII",
  "VCE SMG",
  "Veterinary Doctor",
  "Vice Chief Executive",
  "Waiter Male",
  "Waitress Female",
  "Ward Assistant",
  "Ward boy",
  "Watchman",
  "Water Managment",
  "Welder",
  "Wireless Operator",
  "Workshop Department",
];

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
}));

const CreateJobs = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [jobDetails, setJobDetails] = useState({
    title: "",
    maxApplicants: 10,
    maxPositions: 10,
    deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 16),
    skillsets: [],
    jobType: "Full Time",
    duration: 0,
    salary: 0,
    details: "",
  });

  const handleInput = (key, value) => {
    console.log(value);
    if (key === "maxPositions") {
      // requirement of staff
      if (value > jobDetails.maxApplicants) {
        setPopup({
          open: true,
          severity: "error",
          message: "positions must be smaller then applications",
        });
        /* setJobDetails({
          ...jobDetails,
          [key]: jobDetails.maxApplicants,
        });*/
      }
    }
// damo for pre added skills for job title ace
    if(key==="title"&&value==="ACE"){
      setJobDetails({
        ...jobDetails,
        skillsets: ["1","2","3"],
        title:value
      });
      return
    }

    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleUpdate = () => {
    console.log(jobDetails);
    axios
      .post(apiList.jobs, jobDetails, {
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
        setJobDetails({
          title: "",
          maxApplicants: 100,
          maxPositions: 30,
          deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 16),
          skillsets: [],
          jobType: "Full Time",
          duration: 0,
          salary: 0,
        });
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        console.log(err.response);
      });
  };

  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: "30px", minHeight: "93vh", width: "" }}
      >
        <Grid item>
          <Typography variant="h2">Add Job</Typography>
        </Grid>
        <Grid item container xs direction="column" justify="center">
          <Grid item>
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
              >
                <Grid item>
                  <Autocomplete
                    value={jobDetails.title}
                    onChange={(event, newValue) => {
                      if (typeof newValue === "string") {
                        handleInput("title", newValue);
                      } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        handleInput("title", newValue.inputValue);
                      } else {
                        handleInput("title", newValue);
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);

                      const { inputValue } = params;
                      // Suggest the creation of a new value
                      const isExisting = options.some(
                        (option) => inputValue === option
                      );
                      if (inputValue !== "" && !isExisting) {
                        filtered.push(`${inputValue}`);
                      }

                      return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="Job Title"
                    options={allJobs}
                    getOptionLabel={(option) => option}
                    freeSolo
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Job Title"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item>
                  <ChipInput
                    className={classes.inputBox}
                    label="Skills required"
                    variant="outlined"
                    helperText="Press enter to add skills"
                    value={jobDetails.skillsets}
                    onAdd={(chip) =>
                      setJobDetails({
                        ...jobDetails,
                        skillsets: [...jobDetails.skillsets, chip],
                      })
                    }
                    onDelete={(chip, index) => {
                      let skillsets = jobDetails.skillsets;
                      skillsets.splice(index, 1);
                      setJobDetails({
                        ...jobDetails,
                        skillsets: skillsets,
                      });
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    select
                    label="Job Type"
                    variant="outlined"
                    value={jobDetails.jobType}
                    onChange={(event) => {
                      handleInput("jobType", event.target.value);
                    }}
                    fullWidth
                  >
                    <MenuItem value="Full Time">Full Time</MenuItem>
                    <MenuItem value="Part Time">Part Time</MenuItem>
                    <MenuItem value="Remote">Remote</MenuItem>
                    <MenuItem value="Contract">Contract</MenuItem>
                    <MenuItem value="Internship">Internship</MenuItem>
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField
                    select
                    label="Experience"
                    variant="outlined"
                    value={jobDetails.duration}
                    onChange={(event) => {
                      handleInput("duration", event.target.value);
                    }}
                    fullWidth
                  >
                    <MenuItem value={0}>Fresh</MenuItem>
                    <MenuItem value={1}>1 year</MenuItem>
                    <MenuItem value={2}>2 years</MenuItem>
                    <MenuItem value={3}>3 years</MenuItem>
                    <MenuItem value={4}>4 years</MenuItem>
                    <MenuItem value={5}>5 years</MenuItem>
                    <MenuItem value={6}>6 years</MenuItem>
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField
                    label="Salary"
                    variant="outlined"
                    type="number"
                    value={jobDetails.salary}
                    onChange={(event) => {
                      handleInput("salary", event.target.value);
                    }}
                    onScrollCapture={false}
                    InputProps={{ inputProps: { min: 0 } }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Application Deadline"
                    type="datetime-local"
                    value={jobDetails.deadline}
                    onChange={(event) => {
                      handleInput("deadline", event.target.value);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Maximum Number Of Applicants"
                    type="number"
                    variant="outlined"
                    value={jobDetails.maxApplicants}
                    onChange={(event) => {
                      handleInput("maxApplicants", event.target.value);
                    }}
                    InputProps={{ inputProps: { min: 1 } }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Positions Available"
                    type="number"
                    variant="outlined"
                    value={jobDetails.maxPositions}
                    onChange={(event) => {
                      handleInput("maxPositions", event.target.value);
                    }}
                    InputProps={{ inputProps: { min: 1 } }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Details (upto 300 words)"
                    multiline
                    rows={8}
                    style={{ width: "100%" }}
                    variant="outlined"
                    value={jobDetails.details}
                    onChange={(event) => {
                      if (
                        event.target.value.split(" ").filter(function (n) {
                          return n != "";
                        }).length <= 300
                      ) {
                        handleInput("details", event.target.value);
                      }
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 50px", marginTop: "30px" }}
                onClick={() => handleUpdate()}
              >
                Create Job
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateJobs;
