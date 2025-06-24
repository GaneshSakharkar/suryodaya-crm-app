import { Typography } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

const LINKS = [
  {
    title: "Product",
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News"],
  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
  {
    title: "Admin",
    items: [
      { label: "Admin Login", path: "/admin-login" },
      { label: "Admin Register", path: "/admin-register" },
    ],
  },
];

const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="relative w-full mt-20 bottom-0">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <Typography variant="h5" className="mb-6 uppercase">
            Gradient Infotech
          </Typography>
          <div className="grid grid-cols-4 justify-between gap-4">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-3 font-medium opacity-40"
                >
                  {title}
                </Typography>
                {items.map((link) => {
                  if (typeof link === "string") {
                    return (
                      <li key={link}>
                        <Typography
                          as="a"
                          href="#"
                          color="gray"
                          className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                        >
                          {link}
                        </Typography>
                      </li>
                    );
                  } else {
                    return (
                      <li key={link.label}>
                        <Typography
                          as={NavLink}
                          to={link.path}
                          color="gray"
                          className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                        >
                          {link.label}
                        </Typography>
                      </li>
                    );
                  }
                })}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
          >
            &copy; {currentYear}{" "}
            <a href="https://material-tailwind.com/">Gradient Infotech</a>. All
            Rights Reserved.
          </Typography>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            {/* Social media icons remain unchanged */}
          </div>
        </div>
      </div>
    </footer>
  );
};
