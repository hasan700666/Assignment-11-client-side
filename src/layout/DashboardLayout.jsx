import React from "react";
import { NavLink, Outlet } from "react-router";
import Logo from "../components/Logo";
import img from "../../public/CircleLogo.png";
import { CgProfile } from "react-icons/cg";
import { BiErrorAlt } from "react-icons/bi";
import { PiMoneyWavyDuotone } from "react-icons/pi";
import { GrUserWorker } from "react-icons/gr";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoCheckmarkDone } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiousInstance from "../hooks/useAxiousInstance";

const DashboardLayout = () => {
  const { user } = useAuth();
  const axiousInsrance = useAxiousInstance();

  const { data: isAdmin = [] } = useQuery({
    queryKey: ["is_admin", user.uid],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/user/${user.uid}`);
      if (res.data.result.role == "admin") {
        return res.data.result.role;
      }
    },
  });

  console.log(isAdmin.length);

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn_css"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4">Dashbord</div>
          </nav>
          {/* Page content here */}
          <div className="p-4">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <a
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Logo icon */}
                  <img
                    src={img}
                    alt=""
                    className="my-1.5 hidden is-drawer-close:block size-4"
                  />
                  <span className="is-drawer-close:hidden mx-15">
                    <Logo></Logo>
                  </span>
                </a>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right btn_css"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <CgProfile />
                  <span className="is-drawer-close:hidden">Profile</span>
                </NavLink>
              </li>
              <li >
                <NavLink
                  to="/dashboard/total_issues"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right btn_css"
                  data-tip="Homepage"
                >
                  {/* Logo icon */}
                  <BiErrorAlt />
                  <span className="is-drawer-close:hidden">Total Issues</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/total_payment"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right btn_css"
                  data-tip="Homepage"
                >
                  {/* Logo icon */}
                  <PiMoneyWavyDuotone />
                  <span className="is-drawer-close:hidden">Total Payment</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/total_in_progress_issues"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right btn_css"
                  data-tip="Homepage"
                >
                  {/* Logo icon */}
                  <GrUserWorker />
                  <span className="is-drawer-close:hidden">
                    Total In Progress Issues
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/total_pending_issues"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right btn_css"
                  data-tip="Homepage"
                >
                  {/* Logo icon */}
                  <FaClockRotateLeft />
                  <span className="is-drawer-close:hidden">
                    Total Panding Issues
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/total_resolved_issues"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right btn_css"
                  data-tip="Homepage"
                >
                  {/* Logo icon */}
                  <IoCheckmarkDone />
                  <span className="is-drawer-close:hidden">
                    Total Resolved Issues
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
