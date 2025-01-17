import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useBreakpoints from "../api/utilities/responsive";
import {
  DesiCartIcon,
  Wishlist,
  Cart,
  AccountLogo,
  AccountLogoActive,
} from "../assets/icons";
import SideNavbar from "./navbar/sidebar";
import { FaBars } from "react-icons/fa";
import userApi from "../api/asyncThunk/userApi";
import ThemeToggle from "../small-components/ThemeToggle";
import SearchBar from "./SearchBar";
import AccountDropdown from "../small-components/AccountDropdown";
import CustomHeadroom from "../small-components/CustomHeadroom";
import ProductNavbar from "../small-components/productNavbar";

const Navbar = ({isProductDetailPage}) => {
  const user = useSelector((state) => state.user);
  const { isDarkMode } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { logout } = userApi;
  const { isLoggedIn, loggedInUserName } = user;

  const { isMobile } = useBreakpoints();
  const [showDropDown, setShowDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const routeLocation = useLocation().pathname;
  const accountLogoRoute =
    routeLocation === "/login-signup" ||
    routeLocation === "/signup" ||
    routeLocation === "/login";

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const normalNavbarValidation = isProductDetailPage && isMobile;
  return (
    <>
      {!normalNavbarValidation ?
      <div className="navbar-container">
        {isMobile && !isProductDetailPage && (
          <div className="navbar-section-mobile-container">
            <div className="left-side-mobile-navbar">
              <FaBars
                className="mobile-menu-icon"
                onClick={handleToggleSidebar}
              />
              {sidebarOpen && (
                <SideNavbar
                  dispatch={dispatch}
                  isLoggedIn={isLoggedIn}
                  loggedInUserName={loggedInUserName}
                  logout={logout}
                  navigate={navigate}
                  setSidebarOpen={setSidebarOpen}
                  sidebarOpen={sidebarOpen}
                />
              )}
              <Link className="navbar-logo-container" to="/">
                Desi Cart
              </Link>
            </div>
            <div className="right-side-mobile-navbar">
              <Wishlist stroke={isDarkMode ? 'white' : 'black'} />
              <Link to="/checkout/cart">
              <Cart stroke={isDarkMode ? 'white' : 'black'} />
              </Link>
              <ThemeToggle />
            </div>
          </div>
        )}
        {!isMobile && (
          <>
            <Link className="navbar-logo-container" to="/">
              <DesiCartIcon />
            </Link>
            <div className="navbar-section-container">
              <Link className="navbar-section-link" to='/products?search=men-clothing'>MEN</Link>
              <Link className="navbar-section-link" to='/products?search=women-clothing'>WOMEN</Link>
              <Link className="navbar-section-link" to='/products?search=kids-clothing'>KIDS</Link>
              {/* <Link className="navbar-section-link">FOOTWEAR</Link> */}
            </div>
            <SearchBar />
            <div className="navbar-right-container">
              <Link to="/wishlist">
                <div>
                  <Wishlist stroke={isDarkMode ? 'white' : 'black'} />
                </div>
              </Link>
              <Link to="/checkout/cart">
                <div>
                  <Cart stroke={isDarkMode ? 'white' : 'black'} />
                </div>
              </Link>

              {!accountLogoRoute && (
                <div
                  className="navbar-account-logo-wrapper"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {!showDropDown ? <AccountLogo color={isDarkMode ? 'white' : 'black'} /> : <AccountLogoActive />}
                  {showDropDown && (
                    <div
                      className="navbar-account-dropdown-wrapper"
                      onMouseEnter={handleMouseEnter}
                    >
                      <AccountDropdown />
                    </div>
                  )}
                </div>
              )}
              <ThemeToggle />
            </div>
          </>
        )}
      </div> :
      <ProductNavbar />
      }
    </>
  );
};

export default Navbar;
