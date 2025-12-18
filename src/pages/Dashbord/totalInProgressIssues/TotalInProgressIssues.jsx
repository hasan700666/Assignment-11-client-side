import { FileText } from "lucide-react";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiousInstance from "../../../hooks/useAxiousInstance";
import { useQuery } from "@tanstack/react-query";

const TotalInProgressIssues = () => {
  const { user } = useAuth();
  const axiousInsrance = useAxiousInstance();

  const { data: isAdmin } = useQuery({
    queryKey: ["is_admin", user.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiousInsrance.get(`/user?email=${user.email}`);
      return res.data.result.role === "admin";
    },
  });

  const { data: inProgressIssues = [] } = useQuery({
    queryKey: ["my-inProgress-issues", user.uid],
    enabled: !!user?.uid && isAdmin !== undefined,
    queryFn: async () => {
      if (isAdmin) {
        const res = await axiousInsrance.get(`/issues`); // id = 3
        const Issues = res.data;
        const FilrerdInProgressIssues = Issues.filter(
          (data) => data.status === "in-progress"
        );
        if (FilrerdInProgressIssues) {
          return FilrerdInProgressIssues;
        }
      } else {
        const res = await axiousInsrance.get(`/issues?firebaseId=${user?.uid}`); // id = 2
        const Issues = res.data;
        const FilrerdInProgressIssues = Issues.filter(
          (data) => data.status === "in-progress"
        );
        if (FilrerdInProgressIssues) {
          return FilrerdInProgressIssues;
        }
      }
    },
  });

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
            <p className="text-sm text-gray-500">Total In-Progress Submitted</p>
            <h1 className="text-5xl font-bold text-red-600 mt-2">
              {inProgressIssues.length}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalInProgressIssues;
