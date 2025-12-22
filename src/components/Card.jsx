import React from "react";
import { MdCategory } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxiousInstance from "../hooks/useAxiousInstance";
import { useQuery } from "@tanstack/react-query";

const Card = ({ issue, refetch }) => {
  const navigate = useNavigate();
  const axiousInsrance = useAxiousInstance();
  const {
    photoURL,
    title,
    category,
    status,
    priority,
    location,
    upvoters,
    _id,
  } = issue;
  const { user } = useAuth();

  const { data: IsUserBlocked = [] } = useQuery({
    queryKey: ["isUser", user?.email],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/user?email=${user.email}`);
      return res.data.result.isBlocked;
    },
  });

  const onUpvote = () => {
    if (!user) {
      return navigate("/user/login");
    }

    if (IsUserBlocked) {
      return navigate("/isuser_is_blocked");
    }

    const obj = {
      firebaseUid: user.uid,
    };
    const res = axiousInsrance.patch(`/issues?_id=${_id}`, obj).then((res) => {
      console.log(res.data);
      refetch();
    });

    return res;
  };

  return (
    <div className="card bg-[#fee9e6] w-96 shadow-md hover:shadow-xl transition-shadow duration-300 p-5">
      <figure className="relative">
        <img src={photoURL} alt="issue" className="w-full h-56 object-cover" />

        <span className="absolute top-3 left-3 bg-[#fee9e6] text-sm px-3 py-1 rounded-full">
          {status}
        </span>

        <span className="absolute top-3 right-3 bg-[#fee9e6] text-sm px-3 py-1 rounded-full">
          {priority}
        </span>
      </figure>

      <div className="card-body gap-3">
        <h2 className="card-title text-lg font-semibold line-clamp-2">
          {title}
        </h2>

        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MdCategory className="text-base" />
            <span>{category}</span>
          </div>

          <div className="flex items-center gap-1">
            <FaLocationDot className="text-base" />
            <span>{location}</span>
          </div>
        </div>

        <div className="card-actions justify-between items-center pt-3 border-t">
          {issue?.reporterFirebaseUid === user?.uid ? (
            <span className="text-sm text-red-600 font-medium">
              Your reported issue
            </span>
          ) : (
            <button className="btn_css" onClick={onUpvote}>
              👍 Upvote <span>({upvoters.length - 1})</span>
            </button>
          )}

          <NavLink to={`/issue_details?id=${_id}`}>
            <button className="btn_css">View Details</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Card;
