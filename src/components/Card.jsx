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

    console.log("hasan ", user.uid);
    return res;
  };

  
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
          {issue?.reporterFirebaseUid == user?.uid ? (
            <>
              <div>this is your</div>
            </>
          ) : (
            <button className="btn_css" onClick={() => onUpvote()}>
              Upvotea | <samp className="">{upvoters.length - 1}</samp>
            </button>
          )}
          <NavLink to={`/issue_details?id=${_id}`}>
            <div className="btn_css">View</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Card;
