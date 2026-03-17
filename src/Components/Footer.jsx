import React from 'react';
import {Link} from "react-router-dom";

const FooterMinimal = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Company',
      links: ['About us', 'Terms & conditions', 'Privacy policy', 'Careers']
    },
    {
      title: 'For customers',
      links: ['UC reviews', 'Categories near you', 'Contact us']
    },
    {
      title: 'For professionals',
      links: ['Register as a professional']
    },
    {
      title: 'Social links',
      links: ['Facebook', 'Instagram', 'LinkedIn', 'YouTube']
    }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12  bg-gray-700">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-white hover:text-blue-600 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-white text-sm text-center">
            © {currentYear} LocalWorker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterMinimal;