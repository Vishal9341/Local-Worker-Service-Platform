import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Company",
      links: [
        { name: "About us", path: "/about" },
        { name: "Terms & conditions", path: "/terms" },
        { name: "Privacy policy", path: "/privacy" },
        { name: "Careers", path: "/careers" }
      ]
    },
    {
      title: "For customers",
      links: [
        { name: "UC reviews", path: "/reviews" },
        { name: "Categories near you", path: "/categories" },
        { name: "Contact us", path: "/contact" }
      ]
    },
    {
      title: "For professionals",
      links: [
        { name: "Register as a professional", path: "/Professional" }
      ]
    },
    {
      title: "Social links",
      links: [
        { name: "Facebook", path: "/" },
        { name: "Instagram", path: "/" },
        { name: "LinkedIn", path: "/" },
        { name: "YouTube", path: "/" }
      ]
    }
  ];

  return (
    <footer className="bg-gray-700 text-white">
      <div className="container mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>

              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.path}
                      className="text-sm hover:text-blue-400"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-500 pt-6 text-center text-sm">
          © {currentYear} LocalWorker. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;