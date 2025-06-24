import React from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/slice/UserSlice";

// Profile menu items generator
const profileMenuItems = (role) => [
  {
    label: "Dashboard",
    icon: InboxArrowDownIcon,
    link: role === "ADMIN" ? "/admin/dashboard" : "/manager/dashboard",
  },
  {
    label: "My Profile",
    icon: UserCircleIcon,
    link: role === "MANAGER" ? "/manager/profile" : "/admin/profile",
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    link: role === "MANAGER" ? "/manager/edit-profile" : "/admin/edit-profile",
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    link: "#",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    action: "logout", // Special case for logout action
  },
];

export function ProfileAvatar({ user }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const role = user?.role ?? "guest"; // Default to "guest" if user or user.role is undefined
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to sign out?");

    if (confirmLogout) {
      localStorage.clear();
      dispatch(deleteUser());
      closeMenu();
      navigate("/");
    }
    // Your logout logic here
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0"
        >
          <Avatar
            variant="circular"
            size="md"
            alt={user?.name || "Guest Avatar"}
            withBorder={true}
            color="blue-gray"
            className="p-0.5"
            src={
              user?.avatar ||
              "https://docs.material-tailwind.com/img/face-2.jpg"
            }
          />
          <Typography
            variant="h6"
            className="text-lg mx-2 capitalize font-semibold text-gray-900 cursor-pointer"
          >
            {user?.name || "Guest"}
          </Typography>
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems(role).map(({ label, icon, link, action }, key) => {
          const isLastItem = key === profileMenuItems(role).length - 1;

          if (action === "logout") {
            return (
              <MenuItem
                key={label}
                onClick={handleLogout}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 text-red-500`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal text-red-500"
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          }

          return (
            <NavLink to={link} key={label} onClick={closeMenu}>
              <MenuItem
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            </NavLink>
          );
        })}
      </MenuList>
    </Menu>
  );
}
