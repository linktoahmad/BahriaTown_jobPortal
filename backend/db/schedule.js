const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    applicantId: {
      type: String,
      required: true,
    },
    recruiterId: {
      type: String,
      required: true,
    },
    jobId: {
      type: String,
      required: true,
    },
   
    dateOfApplication: {
      type: String,
      
    },
    dateOfInterview: {
      type: String,
    },
    applicantEmail: {
      type: String,
    },
    
  },
  { collation: { locale: "en" } }
);



module.exports = mongoose.model("schedules", schema);
