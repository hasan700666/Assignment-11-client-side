import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiousInstance from "../../../hooks/useAxiousInstance";
import { useQuery } from "@tanstack/react-query";
import { FileText } from "lucide-react";

const TotalIssuesSubmitted = () => {
  const { user } = useAuth();
  const axiousInsrance = useAxiousInstance();

  const { data: issues = [] } = useQuery({
    queryKey: ["my-issues", user.uid],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/issues?firebaseId=${user?.uid}`); // id = 8
      return res.data;
    },
  });

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

  const { data: inProgressIssues = [] } = useQuery({
    queryKey: ["my-inProgress-issues", user.uid],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/issues?firebaseId=${user?.uid}`); // id = 2
      const Issues = res.data;
      const FilrerdinProgressIssues = Issues.filter(
        (data) => data.status === "In-Progress"
      );
      console.log("in", FilrerdinProgressIssues);
      if (FilrerdinProgressIssues) {
        return FilrerdinProgressIssues;
      }
    },
  });

  const { data: resolvedIssues = [] } = useQuery({
    queryKey: ["my-resolved-issues", user.uid],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/issues?firebaseId=${user?.uid}`); // id = 2
      const Issues = res.data;
      const FilrerdPandingIssues = Issues.filter(
        (data) => data.status === "Resolved"
      );
      console.log(FilrerdPandingIssues);
      if (FilrerdPandingIssues) {
        return FilrerdPandingIssues;
      }
    },
  });

  //console.log(payment);
  //console.log(user.uid);
  console.log(pendingIssues.length);
  console.log(inProgressIssues.length);
  console.log(resolvedIssues.length);

  return (
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
          <p className="text-sm text-gray-500">Total Issues Submitted</p>
          <h1 className="text-5xl font-bold text-red-600 mt-2">
            {issues.length}
          </h1>
        </div>

        {/* Status Breakdown (UI only) */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          <StatusItem label="Pending" value={pendingIssues.length} />
          <StatusItem label="In Progress" value={inProgressIssues.length} />
          <StatusItem label="Resolved" value={resolvedIssues.length} />
        </div>
      </div>
    </div>
  );
};

export default TotalIssuesSubmitted;

const StatusItem = ({ label, value }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  );
};
