import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Theme from "./Theme";
import { Menu, X } from "lucide-react";
import LogoPointer from "../assets/LogoPointer";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  // State to manage mobile menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // State to track if the user has scrolled down
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set to true if scrolled down more than 20 pixels
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger immediately on mount to check starting position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamically calculate our header classes based on route and scroll state
  let headerClasses =
    "z-50 flex flex-row justify-between items-center px-5 md:px-10 font-medium transition-all duration-300 ";

  if (isHome) {
    // HOME PAGE: Fixed at the top so it overlays the hero section
    headerClasses += "fixed top-0 left-0 w-full ";
    if (isScrolled || isMenuOpen) {
      headerClasses +=
        "bg-surface border-b-2 border-border-custom shadow-md py-3 ";
    } else {
      // Transparent and slightly taller at the very top
      headerClasses += "bg-transparent border-transparent py-6 ";
    }
  } else {
    // OTHER PAGES: Standard sticky solid header
    headerClasses +=
      "sticky top-0 bg-surface border-b-2 border-border-custom py-3 ";
  }

  // Determine if the text should be shown (always on other pages, or when scrolled/menu open on home)
  const showBrandText = !isHome || isScrolled || isMenuOpen;

  return (
    <header className={headerClasses}>
      {/* Logo Area */}
      <div
        className="flex flex-row items-center gap-2 md:pl-8 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <LogoPointer className="h-12 w-14 text-primary hover:opacity-80 transition-all duration-300" />
        {/* Conditionally render text and bumped font size up to text-2xl / md:text-xl */}
        {showBrandText && (
          <span className="ml-2 text-2xl font-bold md:text-xl animate-fade-in">
            Moksha
          </span>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-row gap-5 items-center">
        <NavLink
          to="/documentation"
          className="hover:text-primary transition-colors"
        >
          <div>Documentation</div>
        </NavLink>
        <NavLink
          to="/playground"
          className="hover:text-primary transition-colors"
        >
          <div>Playground</div>
        </NavLink>
        <NavLink
          to="https://github.com/Swarup-Moulik/Moksha"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-1 text-lg bg-primary text-primary-foreground hover:opacity-80 rounded-md transition-opacity"
        >
          <div>Github</div>
        </NavLink>
        <Theme />
      </div>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden flex items-center gap-4">
        <Theme />
        <button
          onClick={toggleMenu}
          className="text-foreground focus:outline-none cursor-pointer"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-surface border-b-2 border-border-custom flex flex-col items-center gap-6 py-6 md:hidden shadow-xl transition-all">
          <NavLink
            to="/documentation"
            onClick={toggleMenu}
            className="text-lg hover:text-primary transition-colors"
          >
            Documentation
          </NavLink>
          <NavLink
            to="/playground"
            onClick={toggleMenu}
            className="text-lg hover:text-primary transition-colors"
          >
            Playground
          </NavLink>
          <NavLink
            to="https://github.com/Swarup-Moulik/Moksha"
            target="_blank"
            rel="noopener noreferrer"
            onClick={toggleMenu}
            className="px-6 py-2 text-lg bg-primary text-primary-foreground hover:opacity-80 rounded-md transition-opacity"
          >
            Github
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
