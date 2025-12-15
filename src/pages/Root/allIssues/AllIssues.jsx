import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiousInstance from "../../../hooks/useAxiousInstance";
import Card from "../../../components/Card";

const AllIssues = () => {
  const { user } = useAuth();
  const axiousInsrance = useAxiousInstance();

  const { data: issues = [], refetch } = useQuery({
    queryKey: ["issues", user?.uid],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/issues`); // id = 2
      return res.data;
    },
  });

  return (
    <div>
      <div></div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {issues.map((issue) => (
            <Card key={issue._id} issue={issue} refetch={refetch} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllIssues;
