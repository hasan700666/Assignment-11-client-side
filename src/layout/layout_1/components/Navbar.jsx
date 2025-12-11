import React, { use } from "react";
import { NavLink } from "react-router";
import Logo from "../../../components/Logo";
import { AuthContext } from "../../../firebase/auth/AuthContext/AuthContext";

const Navbar = () => {
  const { user, singOutUser } = use(AuthContext);

  console.log(user);
  

  const li = (
    <>
      <NavLink to="/" className="mx-3">
        Home
      </NavLink>
      <NavLink to="/about" className="mx-3">
        {" "}
        About
      </NavLink>
      <NavLink to="/all_issues" className="mx-3">
        {" "}
        All Issues
      </NavLink>
      <NavLink to="/add_issues" className="mx-3">
        {" "}
        Add Issues
      </NavLink>
      <NavLink to="/my_issues" className="mx-3">
        {" "}
        My Issues
      </NavLink>
      <NavLink to="/my_favorites" className="mx-3">
        {" "}
        My favorites
      </NavLink>
    </>
  );

  const handleSingOut = () => {
    singOutUser()
      .then(() => {
        console.log("Sign-out successful");
      })
      .catch((error) => {
        console.log("An error happened ", error);
      });
  };

  return (
    <div className="">
      <div className="navbar radius_left_right_css shadow-sm bg-[#fee9e6] ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn_css lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {li}
            </ul>
          </div>
          <a className="btn btn-ghost">
            <Logo></Logo>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{li}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <div className="dropdown dropdown-end mr-4">
                <div tabIndex={0} role="button">
                  <div className="w-10 h-10 rounded-full bg-[#151515]">
                    <img
                      src={user.photoURL}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <h1 className="text-xs mb-5">Welcome {user.displayName}</h1>
                  <button className="btn_css">
                    Dashboard
                  </button>
                  <button onClick={handleSingOut} className="btn_css">
                    Sing Out
                  </button>
                </ul>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/user/sing_up">
                <button className="btn_css">Sing Up</button>
              </NavLink>
              <NavLink to="/user/login">
                <button className="btn_css">Login</button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
