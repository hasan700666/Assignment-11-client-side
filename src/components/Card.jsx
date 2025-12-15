import React from "react";
import { MdCategory } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { NavLink } from "react-router";

const Card = ({ issue, onUpvote }) => {
  const {
    photoURL,
    title,
    category,
    status,
    priority,
    location,
    upvotes,
    _id,
  } = issue;

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={photoURL} alt="img" className="w-full h-60 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div className="bg-[#fee9e6] p-1 radius_css">{status}</div>
          <div className="bg-[#fee9e6] p-1 radius_css">{priority}</div>
        </h2>
        <p className="flex justify-between">
          <div className="flex gap-1 items-center">
            <MdCategory />
            {category}
          </div>
          <div className="flex gap-1 items-center">
            <FaLocationDot />
            {location}
          </div>
        </p>
        <div className="card-actions justify-end">
          <button className="btn_css" onClick={() => onUpvote()}>
            Upvotea | <samp className="">60</samp>
          </button>
          <NavLink to={`/issue_details?id=${_id}`}>
            <div className="btn_css">View</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Card;
