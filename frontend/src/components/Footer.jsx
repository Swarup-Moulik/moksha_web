import React from "react";
import { assets } from "../assets/assets";
import LogoPointer from "../assets/LogoPointer";

function Footer() {
  return (
    <footer className="bg-surface flex flex-col md:flex-row justify-center items-center py-3 font-medium border-t-2 border-border-custom transition-colors duration-300 mt-auto">
      <div className="flex flex-row items-center gap-2 mb-4 md:mb-0">
        <LogoPointer className="h-12 w-14 text-primary grayscale" />
        <span className="text-foreground opacity-70">
          &copy; {new Date().getFullYear()} Moksha. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
