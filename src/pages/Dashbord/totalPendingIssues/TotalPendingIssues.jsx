import { FileText } from "lucide-react";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiousInstance from "../../../hooks/useAxiousInstance";
import { useQuery } from "@tanstack/react-query";

const TotalPendingIssues = () => {
  const { user } = useAuth();
  const axiousInsrance = useAxiousInstance();

  const { data: pendingIssues = [] } = useQuery({
      queryKey: ["my-pending-issues", user.uid],
      queryFn: async () => {
        const res = await axiousInsrance.get(`/issues?firebaseId=${user?.uid}`); // id = 2
        const Issues = res.data;
        const FilrerdPandingIssues = Issues.filter(
          (data) => data.status === "Pending"
        );
        //console.log(FilrerdPandingIssues);
        if (FilrerdPandingIssues) {
          return FilrerdPandingIssues;
        }
      },
    });
  

  console.log(pendingIssues);
  console.log(user.uid);

  return (
    <div>
      <div className="flex flex-col justify-center items-center m-30">
        <div className="max-w-md bg-white rounded-2xl shadow-md p-6 ">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              My Reported Issues
            </h2>
            <FileText className="w-5 h-5 text-red-600" />
          </div>

          {/* Total Count */}
          <div className="text-center my-6">
            <p className="text-sm text-gray-500">Total Pending Submitted</p>
            <h1 className="text-5xl font-bold text-red-600 mt-2">{pendingIssues.length}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalPendingIssues;