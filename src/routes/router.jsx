import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { ManagerLoginPage } from "../pages/manager/ManagerLoginPage";
import { AdminLoginPage } from "../pages/admin/AdminLoginPage";
import { AdminRegisterPage } from "../pages/admin/AdminRegisterPage";
import { ManagerRegisterPage } from "../pages/manager/ManagerRegisterPage";
import { Home } from "../pages/Home";
import { ManagerProtectedRoute } from "./ProtectedRoute";
import { AdminProtectedRoute } from "./AdminProtectedRoute";
import { AdminProfile } from "../pages/admin/AdminProfile";
import { ManagerProfile } from "../pages/manager/ManagerProfile";
import { ContactUs } from "../pages/ContactUs";
import { Enquiries } from "../pages/manager/enquiries/Enquiries";
import { Registrations } from "../pages/manager/registrations/Registrations";
import { EnquiryForm } from "../pages/manager/enquiry form/EnquiryForm";
import { RegistrationForm } from "../pages/manager/registration form/RegistrationForm";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ViewCourses from "../pages/admin/courses/ViewCourses";
import { RegistrationDetail } from "../pages/manager/registrations/RegistrationDetail";
import { EnquiryDetailPage } from "../pages/manager/enquiries/EnquiryDetail";
import { DueDate } from "../pages/manager/dueDateStudents/DueDate";
import { DueDateAdmin } from "../pages/admin/dueDateStudents/DueDateAdmin";
import ManagersList from "../pages/admin/managers/ApprovedManagers";
import ManagersReq from "../pages/admin/managers/NotApprovedManagers";
import ManagerDashboard from "../pages/manager/dashboard/ManagerDashboard";
import { AdminEnquiries } from "../pages/admin/enquiries/Enquiries";
import { AdminRegistrations } from "../pages/admin/registrations/Registrations";
import { AdminRegistrationDetail } from "../pages/admin/registrations/RegistrationDetail";
import ManagerDetail from "../pages/admin/managers/ManagerDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/manager-login",
        element: <ManagerLoginPage />,
      },
      {
        path: "/admin-login",
        element: <AdminLoginPage />,
      },
      {
        path: "/admin-register",
        element: <AdminRegisterPage />,
      },
      {
        path: "/manager-register",
        element: <ManagerRegisterPage />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/manager",
        element: <ManagerProtectedRoute />,
        children: [
          {
            path: "/manager/profile",
            element: <ManagerProfile />,
          },
          {
            path: "/manager/dashboard",
            element: <ManagerDashboard />,
          },
          {
            path: "/manager/enquiry-form",
            element: <EnquiryForm />,
          },
          {
            path: "/manager/registration-form",
            element: <RegistrationForm />,
          },
          {
            path: "/manager/enquiries",
            element: <Enquiries />,
          },
          {
            path: "/manager/registrations",
            element: <Registrations />,
          },
          {
            path: "/manager/registration/:id",
            element: <RegistrationDetail />,
          },
          {
            path: "/manager/enquiry/:id",
            element: <EnquiryDetailPage />,
          },
          {
            path: "/manager/due-dates",
            element: <DueDate />,
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminProtectedRoute />,
        children: [
          {
            path: "/admin/profile",
            element: <AdminProfile />,
          },
          {
            path: "/admin/dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "/admin/courses",
            element: <ViewCourses />,
          },
          {
            path: "/admin/due-dates",
            element: <DueDateAdmin />,
          },
          {
            path: "/admin/managers",
            element: <ManagersList />,
          },
          {
            path: "/admin/request",
            element: <ManagersReq />,
          },
          {
            path: "/admin/enquiries",
            element: <AdminEnquiries />,
          },
          {
            path: "/admin/registrations",
            element: <AdminRegistrations />,
          },
          {
            path: "/admin/registration/:id",
            element: <AdminRegistrationDetail />,
          },
          {
            path: "/admin/manager/:id",
            element: <ManagerDetail />,
          },
        ],
      },
    ],
  },
]);
