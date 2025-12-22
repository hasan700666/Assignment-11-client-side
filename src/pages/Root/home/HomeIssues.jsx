import React from "react";
import useAxiousInstance from "../../../hooks/useAxiousInstance";
import { useQuery } from "@tanstack/react-query";
import { MdCategory } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import HomeCard from "../../../components/HomeCard";

const HomeIssues = () => {
  const axiousInsrance = useAxiousInstance();

  const { data: issues = [] } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/issues`); // id = 2
      const filterResolvedIssues = res.data.filter(
        (data) => data.status === "resolved"
      );
      return filterResolvedIssues;
    },
  });

  console.log(issues);

  return (
    <div>
      <div className="m-20 text-5xl text-center">
        Latest Resolve <span className="text_design_like_btn">Issue</span>
      </div>
      <div className="bg-[#fee9e6] w-9/12 p-10 mx-auto my-10 radius_css grid grid-cols-3">
        {issues.map((issue) => (
          <HomeCard issue={issue}></HomeCard>
        ))}
      </div>
    </div>
  );
};

export default HomeIssues;
