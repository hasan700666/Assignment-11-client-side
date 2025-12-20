import { FileText } from "lucide-react";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiousInstance from "../../../hooks/useAxiousInstance";
import { useQuery } from "@tanstack/react-query";

const TotalPendingIssues = () => {
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

  const { data: pendingIssues = [] } = useQuery({
    queryKey: ["my-pending-issues", user.uid],
    enabled: !!user?.uid && isAdmin !== undefined,
    queryFn: async () => {
      if (isAdmin) {
        const res = await axiousInsrance.get(`/issues`); // id = 3
        const Issues = res.data;
        const FilrerdPandingIssues = Issues.filter(
          (data) => data.status === "pending"
        );
        if (FilrerdPandingIssues) {
          return FilrerdPandingIssues;
        }
      } else {
        const res = await axiousInsrance.get(`/issues?firebaseId=${user?.uid}`); // id = 2
        const Issues = res.data;
        const FilrerdPandingIssues = Issues.filter(
          (data) => data.status === "pending"
        );
        if (FilrerdPandingIssues) {
          return FilrerdPandingIssues;
        }
      }
    },
  });

  return (
    <div className="max-w-sm mx-auto my-20">
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="p-2 bg-red-100 rounded-lg mr-3">
            <FileText className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">Reported Issues</h2>
            <p className="text-gray-500 text-sm">Panding review</p>
          </div>
        </div>

        {/* Count */}
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-red-600">
            {pendingIssues.length}
          </div>
          <p className="text-gray-600 mt-2">issues pending</p>
        </div>

        {/* Single Action Button */}
        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors">
          View Issues
        </button>
      </div>
    </div>
  );
};

export default TotalPendingIssues;
