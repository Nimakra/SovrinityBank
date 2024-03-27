import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/hooks/ContextWrapper";
import Register from "../components/modals/register";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBank } from "@fortawesome/free-solid-svg-icons";

type Result = {
  err?: any;
  ok?: any;
};

const Header: FunctionComponent = () => {
  const { login, logout, isAuthenticated, user, setShowRegModal } = useAuth();

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);

  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 bg-black1-200 shadow py-0 transition-all duration-300">
      <nav className="relative flex flex-wrap items-center justify-between mx-auto max-w-[1270px] px-3">
        <div className="order-0 mt-1">
        <h2 className="text-2xl text-white font-bold mb-4">
            <FontAwesomeIcon icon={faBank} className="mr-2 text-white" />
              Sovrinity
            </h2>
        </div>
        <input id="nav-toggle" type="checkbox" className="hidden" />
        <label
          id="show-button"
          htmlFor="nav-toggle"
          className="order-1 flex cursor-pointer items-center lg:order-1 lg:hidden text-white"
        >
          <svg className="h-6 fill-current" viewBox="0 0 20 20">
            <title>Menu Open</title>
            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
          </svg>
        </label>
        <label
          id="hide-button"
          htmlFor="nav-toggle"
          className="order-2 hidden cursor-pointer items-center lg:order-1"
        >
          <svg className="h-6 fill-current" viewBox="0 0 20 20">
            <title>Menu Close</title>
            <polygon
              points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
              transform="rotate(45 10 10)"
            ></polygon>
          </svg>
        </label>

        <ul
          id="nav-menu"
          className="navbar-nav order-2 hidden w-full flex-[0_0_100%] lg:order-1 lg:flex lg:w-auto lg:flex-auto lg:justify-center lg:space-x-5 list-none"
        >
          <li className="nav-item " onClick={() => navigate("/")}>
            <a className="nav-link active">Home</a>
          </li>
          <li className="nav-item nav-dropdown group relative">
            <span className="nav-link inline-flex items-center">
              Services
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </span>
            <ul className="nav-dropdown-list hidden group-hover:block lg:invisible lg:absolute lg:block lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100">
              <li
                className="nav-dropdown-item"
                onClick={() =>
                  isAuthenticated ? navigate("/Transfer") : login()
                }
              >
                <a className="nav-dropdown-link">Send Money</a>
              </li>
              <li
                className="nav-dropdown-item"
                onClick={() =>
                  isAuthenticated ? navigate("/Deposit") : login()
                }
              >
                <a className="nav-dropdown-link">Deposit</a>
              </li>
              <li
                className="nav-dropdown-item"
                onClick={() =>
                  isAuthenticated ? navigate("/Withdraw") : login()
                }
              >
                <a className="nav-dropdown-link">Withdraw</a>
              </li>
              <li
                className="nav-dropdown-item"
                onClick={() =>
                  isAuthenticated ? navigate("/Withdraw") : login()
                }
              >
                <a className="nav-dropdown-link">Receive Money</a>
              </li>
              <li
                className="nav-dropdown-item"
                onClick={() =>
                  isAuthenticated ? navigate("/Receive") : login()
                }
              >
                <a className="nav-dropdown-link">P2P Trading</a>
              </li>
              <li
                className="nav-dropdown-item"
                onClick={() =>
                  isAuthenticated ? navigate("/Invest") : login()
                }
              >
                <a className="nav-dropdown-link">Terms & Conditions</a>
              </li>
            </ul>
          </li>
          {isAuthenticated && (
            <>
              <li className="nav-item" onClick={() => navigate("/Dashboard")}>
                <a className="nav-link">Dashboard</a>
              </li>
              <li className="nav-item" onClick={() => navigate("/Transactions")}>
                <a className="nav-link">Transaction History</a>
              </li>
              <li className="nav-item mt-3.5 lg:hidden">
                <a
                  className="btn btn-white btn-sm border-border"
                  href="signin.html"
                >
                  Create Profile
                </a>
              </li>
            </>
          )}
        </ul>

        {!isAuthenticated ? (
          <button
            onClick={async () => {
              login();
            }}
            className="cursor-pointer order-1 ml-auto hidden items-center md:order-2 md:ml-0 lg:flex bg-whitesmoke-50 hover:bg-whitesmoke-300 rounded-3xl p-3"
          >
            <div className="text-lg font-bold font-montserrat text-black">
              Login
            </div>
          </button>
        ) : (
          <button
            onClick={async () => {
              logout();
            }}
            className="cursor-pointer order-1 ml-auto hidden items-center md:order-2 md:ml-0 lg:flex bg-whitesmoke-50 hover:bg-whitesmoke-300 rounded-3xl p-3"
          >
            <div className="text-lg font-medium font-montserrat text-black">
              Logout
            </div>
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
