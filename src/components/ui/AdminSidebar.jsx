import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  Bars3Icon,
  XMarkIcon,
  ChartPieIcon,
  BookOpenIcon,
  InboxIcon,
  ClipboardIcon,
  NewspaperIcon,
  PencilSquareIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ArrowDownCircleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/slice/UserSlice";

export const Sidebar = ({ user }) => {
  const [open, setOpen] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // state to control sidebar visibility

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // localStorage.removeItem("jwt");
    const confirmLogout = confirm("Are you sure, you want to logout?");
    if (confirmLogout) {
      localStorage.clear();
      dispatch(deleteUser());
      // setUser1(null);
      navigate(`${user.role === "ADMIN" ? "/admin-login" : "/manager-login"}`);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <>
      {/* Sidebar Toggle Button for Mobile */}
      <div className="lg:hidden absolute p-4">
        <button onClick={toggleSidebar}>
          <Bars3Icon className="h-6 w-6 text-gray-800" />
        </button>
      </div>

      {/* Sidebar */}
      <Card
        className={`fixed top-0 left-0 h-auto bg-white shadow-sm transition-transform transform ${
          isSidebarOpen
            ? "translate-x-0 top-20 z-50 h-lvh"
            : "-translate-x-full"
        } lg:relative lg:translate-x-0 w-1/6 p-4 mt-1`}
      >
        {/* Close Sidebar Button */}

        <div className="flex justify-between">
          <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray">
              CRM
            </Typography>
          </div>

          <div className="lg:hidden mb-4">
            <button onClick={toggleSidebar}>
              <XMarkIcon className="h-6 w-6 text-gray-800" />
            </button>
          </div>
        </div>

        <List>
          <NavLink
            to={`${
              user.role === "ADMIN" ? "/admin/dashboard" : "/manager/dashboard"
            }`}
          >
            <ListItem>
              <ListItemPrefix>
                <ChartPieIcon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </NavLink>
          {user.role === "ADMIN" && (
            <NavLink to="/admin/managers">
              <ListItem>
                <ListItemPrefix>
                  <UserGroupIcon className="h-5 w-5" />
                </ListItemPrefix>
                All Managers
              </ListItem>
            </NavLink>
          )}
          {user.role === "ADMIN" && (
            <NavLink to="/admin/request">
              <ListItem>
                <ListItemPrefix>
                  <ArrowDownCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Approval Request
              </ListItem>
            </NavLink>
          )}
          {user.role === "ADMIN" && (
            <NavLink to="/admin/courses">
              <ListItem>
                <ListItemPrefix>
                  <BookOpenIcon className="h-5 w-5" />
                </ListItemPrefix>
                Courses
              </ListItem>
            </NavLink>
          )}
          <NavLink
            to={`${
              user.role === "ADMIN" ? "/admin/enquiries" : "/manager/enquiries"
            }`}
          >
            <ListItem>
              <ListItemPrefix>
                <NewspaperIcon className="h-5 w-5" />
              </ListItemPrefix>
              Enquiries
            </ListItem>
          </NavLink>
          <NavLink
            to={`${
              user.role === "ADMIN"
                ? "/admin/registrations"
                : "/manager/registrations"
            }`}
          >
            <ListItem>
              <ListItemPrefix>
                <ClipboardIcon className="h-5 w-5" />
              </ListItemPrefix>
              Registrations
            </ListItem>
          </NavLink>
          <NavLink
            to={`${
              user.role === "ADMIN" ? "/admin/due-dates" : "/manager/due-dates"
            }`}
          >
            <ListItem>
              <ListItemPrefix>
                <CalendarDaysIcon className="h-5 w-5" />
              </ListItemPrefix>
              Due Dates
            </ListItem>
          </NavLink>

          {user.role === "ADMIN" && (
  <NavLink to="/admin-register">
    <ListItem>
      <ListItemPrefix>
        <UserIcon className="h-5 w-5" />
      </ListItemPrefix>
      Add Admin
    </ListItem>
  </NavLink>
)}

          {/* <NavLink to="/manager/enquiry-form">
            <ListItem>
              <ListItemPrefix>
                <PencilSquareIcon className="h-5 w-5" />
              </ListItemPrefix>
              Enquiry Form
            </ListItem>
          </NavLink>
          <NavLink to="/manager/registration-form">
            <ListItem>
              <ListItemPrefix>
                <AcademicCapIcon className="h-5 w-5" />
              </ListItemPrefix>
              Registration Form
            </ListItem>
          </NavLink>
          <NavLink
            to={`${
              user.role === "ADMIN" ? "/admin/profile" : "/manager/profile"
            }`}
          >
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
          </NavLink>                   */}
          <ListItem onClick={handleLogout}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    </>
  );
};
