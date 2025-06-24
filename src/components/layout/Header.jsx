import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import { ProfileAvatar } from "../ui/Avatar";
import { useSelector } from "react-redux";
import { decryptData } from "../../security/Encryption";

// Menu items for the resources dropdown
const navListMenuItems = [
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: SquaresPlusIcon,
  },
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
  },
  {
    title: "Blog",
    description: "Find the perfect solution for your needs.",
    icon: Bars4Icon,
  },
  {
    title: "Services",
    description: "Learn how we can help you achieve your goals.",
    icon: SunIcon,
  },
  {
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
    icon: GlobeAmericasIcon,
  },
  {
    title: "Contact",
    description: "Find the perfect solution for your needs.",
    icon: PhoneIcon,
  },
  {
    title: "News",
    description: "Read insightful articles, tips, and expert opinions.",
    icon: NewspaperIcon,
  },
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: RectangleGroupIcon,
  },
  {
    title: "Special Offers",
    description: "Explore limited-time deals and bundles",
    icon: TagIcon,
  },
];

// Resources Menu Component
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(
    ({ icon, title, description }, key) => (
      <a href="#" key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="lg" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

// Main Navigation List
function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="#"
        variant="md"
        color="blue-gray"
        className="font-medium"
      >
        <NavLink to="/">
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            Home
          </ListItem>
        </NavLink>
      </Typography>
      <NavListMenu />
      <Typography
        as="a"
        href="#"
        variant="md"
        color="blue-gray"
        className="font-medium"
      >
        <NavLink to="/contact-us">
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            Contact Us
          </ListItem>
        </NavLink>
      </Typography>
    </List>
  );
}

export const Header = () => {
  const [openNav, setOpenNav] = React.useState(false);

  // Use selector to get the user data from Redux store
  const data = useSelector((state) => state.userReducer.user);
  const user = data ? decryptData(data) : null; // Decrypt and get the user data

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto z-50 max-w-full top-2 sticky px-4 py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <NavLink to="/" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
          <Typography variant="h6" className="uppercase text-md sm:text-xl">
            Gradient Infotech
          </Typography>
        </NavLink>
        {/* <div className="hidden lg:block">
          <NavList />
        </div> */}

        {/* Right Section - Conditional Rendering for Profile Avatar */}
        <div className="hidden flex justify-center items-center gap-2 lg:flex">
          {user ? (
            <ProfileAvatar user={user} />
          ) : (
            <>
              <NavLink to="/manager-login">
                <Button variant="text" size="md" color="blue-gray">
                  Log In
                </Button>
              </NavLink>
              <NavLink to="/manager-register">
                <Button variant="filled" size="md">
                  Register
                </Button>
              </NavLink>
            </>
          )}
        </div>

        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <NavLink to="/manager-login">
            <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
              Log In
            </Button>
          </NavLink>
          <NavLink to="/manager-register">
            <Button variant="filled" size="sm" fullWidth>
              Register
            </Button>
          </NavLink>
        </div>
      </Collapse>
    </Navbar>
  );
};
