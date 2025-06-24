import axios from "axios";

export const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginManager = (loginReq) => {
  return api.post("/auth/manager/login", loginReq);
};

export const loginAdmin = (loginReq) => {
  return api.post("/auth/admin/login", loginReq);
};

export const registerManager = (registerReq) => {
  return api.post("/auth/manager/register", registerReq);
};

export const registerAdmin = (registerReq) => {
  return api.post("/auth/admin/register", registerReq);
};

export const getManager = (jwt) => {
  return api.get("/manager/getManager", {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getManagerById = (jwt, id) => {
  return api.get(`/admin/getManagerById/${id}`, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getAdmin = (jwt) => {
  return api.get("/admin/getAdmin", {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getCources = () => {
  return api.get("/home/getAllCourse");
};

export const sendEnquiryForm = (jwt, formReq) => {
  return api.post("/manager/addEnquiry", formReq, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const sendRegistrationForm = (jwt, formReq) => {
  return api.post("/manager/addRegistration", formReq, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getEnquiries = (jwt, entity) => {
  return api.get(`/${entity}/enquiries`, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getRegistrations = (jwt, entity) => {
  return api.get(`/${entity}/registrations`, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const AddGetCourse = (jwt, courseReq) => {
  return api.post("/admin/addGetCourse", courseReq, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const deleteGetCourse = (jwt, id) => {
  return api.post(
    `/admin/deleteGetCourse/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
};

export const searchById = (jwt, id) => {
  return api.get(`/manager/searchRegistrationById/${id}`, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const searchByName = (jwt, name) => {
  return api.get(`/manager/searchRegistrationByName/${name}`, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getRegistrationById = (jwt, id) => {
  return api.get(`/manager/getRegistrationById/${id}`, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getEnquiriesById = (jwt, id) => {
  return api.get(`/manager/getEnquiryById/${id}`, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getAllCollege = (jwt) => {
  return api.get("/manager/getAllCollege", {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getAllBranch = (jwt) => {
  return api.get("/manager/getAllBranch", {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getAllQualification = (jwt) => {
  return api.get("/manager/getAllQualification", {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getDistinctCourse = (jwt) => {
  return api.get("/manager/getDistinctCourse", {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const addEnquiryDetail = (jwt, enquiryFormId, enquiryDetailreq) => {
  return api.post(
    `/manager/addEnquiryDetail/${enquiryFormId}`,
    enquiryDetailreq,
    {
      headers: {
        // Corrected from 'Headers' to 'headers'
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
};

export const getEnquiryDetail = (jwt, id) => {
  return api.get(`/manager/getEnquiryDetail/${id}`, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const sendEmail = (jwt, emailReq, entity) => {
  return api.post(`/${entity}/sendEmail`, emailReq, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const searchEnquiriesById = (jwt, id) => {
  return api.get(`/manager/searchEnquiryFormById/${id}`, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const searchEnquiriesByName = (jwt, name) => {
  return api.get(`/manager/searchEnquiryFormByName/${name}`, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getDistinctCollege = (jwt) => {
  return api.get("/manager/getDistinctEnquiryCollege", {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getDistinctBranch = (jwt) => {
  return api.get("/manager/getDistinctEnquiryBranch", {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getDistinctQualification = (jwt) => {
  return api.get("/manager/getDistinctQualification", {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};
export const getDueRegistration = (jwt, entity) => {
  return api.get(`/admin/getDueForm`, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const updateEquiryForm = (jwt, enquiryFormReq) => {
  return api.post("/manager/updateEnquiry", enquiryFormReq, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const updateRegistrationForm = (jwt, registrationFormReq) => {
  return api.post("/manager/updateRegistration", registrationFormReq, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const payAmount = (jwt, payReq, entity) => {
  return api.post(`/${entity}/payAmount`, payReq, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getAllManagers = (jwt) => {
  return api.get("/admin/getAllManagers", {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getAllAprrovalReq = (jwt) => {
  return api.get("/admin/getAllApprovalRequest", {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const ApproveManager = (jwt, ApprovalReq) => {
  return api.post("/admin/approveManager", ApprovalReq, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const ActiveManager = (jwt, ApprovalReq) => {
  return api.post("/admin/activeManager", ApprovalReq, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getRecentRegistrations = (jwt, entity) => {
  return api.get(`/${entity}/top5Registrations`, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getRecentEnquiries = (jwt, entity) => {
  return api.get(`/${entity}/getTop5EnquiryForm`, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const updateRegistration = (jwt, reqPayload) => {
  return api.post("/admin/updateRegistration", reqPayload, {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};
