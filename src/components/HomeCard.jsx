import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { NavLink } from "react-router";

const HomeCard = ({ issue }) => {
  return (
    <div>
      <div className="card bg-white shadow-md hover:shadow-xl transition-shadow duration-300 p-5">
        <figure className="relative">
          <img
            src={issue.photoURL}
            alt="issue"
            className="w-full h-56 object-cover"
          />

          <span className="absolute top-3 left-3 bg-[#fee9e6] text-sm px-3 py-1 rounded-full">
            {issue.status}
          </span>

          <span className="absolute top-3 right-3 bg-[#fee9e6] text-sm px-3 py-1 rounded-full">
            {issue.priority}
          </span>
        </figure>

        <div className="card-body gap-3">
          <h2 className="card-title text-lg font-semibold line-clamp-2">
            {issue.title}
          </h2>

          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MdCategory className="text-base" />
              <span>{issue.category}</span>
            </div>

            <div className="flex items-center gap-1">
              <FaLocationDot className="text-base" />
              <span>{issue.location}</span>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <NavLink to={`/issue_details?id=${issue._id}`}>
              <button className="btn_css">View Details</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
