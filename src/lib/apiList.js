export const server = "http://localhost:4444";

const apiList = {
  login: `${server}/auth/login`,
  signup: `${server}/auth/signup`,
  uploadResume: `${server}/upload/resume`,
  uploadProfileImage: `${server}/upload/profile`,
  jobs: `${server}/api/jobs`,
  applications: `${server}/api/applications`,
  rating: `${server}/api/rating`,
  user: `${server}/api/user`,
  applicants: `${server}/api/applicants`,
  getRectruitrs:`${server}/admin/admin/recruiters`,
  getApplicants:`${server}/admin/admin/users`,
  getJobs:`${server}/admin/admin/jobs`,
  getStatus:`${server}/admin/admin/count`,
  sendmail:`${server}/mail/sendmail`,
  deleteRectruitrs:``,
  deleteApplicants:``,
  deleteJobs:``,

};

export default apiList;
