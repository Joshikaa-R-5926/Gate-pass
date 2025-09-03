import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-white dark:bg-gray-950">
      <div className="container py-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Hostel GatePass. All rights reserved.</p>
        </div>
        <div className="flex gap-6 text-sm">
          <Link to="#" className="text-gray-600 dark:text-gray-400 hover:underline">Privacy</Link>
          <a href="#contact" className="text-gray-600 dark:text-gray-400 hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;