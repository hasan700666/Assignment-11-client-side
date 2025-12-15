import React from "react";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiousInstance from "../hooks/useAxiousInstance";
import { useSearchParams } from "react-router";

const IssueDetails = () => {
  const [searchParams] = useSearchParams();
  const issues_id = searchParams.get("id");
  const { user } = useAuth();

  const axiousInsrance = useAxiousInstance();
  const { data: issue = [] } = useQuery({
    queryKey: ["issue", user.uid],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/issues?id=${issues_id}`);
      return res.data[0];
    },
  });

  const isOwner = user?.uid === issue?.reporterFirebaseUid;
  const canEdit = isOwner && issue?.status === "Pending";
  const canDelete = isOwner;
  const canBoost = !issue?.boosted;

  //console.log(issues_id);
  console.log(issue);
  //console.log(canEdit);
  console.log(canBoost);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#fee9e6] m-20 radius_css">
      {/* Issue Header */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Left: Issue Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{issue.title}</h2>

            {/* Issue Image */}
            {issue.photoURL && (
              <img
                src={issue.photoURL}
                alt="Issue"
                className="w-full max-w-md h-60 rounded-lg my-4 object-cover"
              />
            )}

            <p className="text-gray-600 mt-2">{issue.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span
                className={`px-3 py-1 rounded-full text-white text-sm 
              ${
                issue.status === "Pending"
                  ? "bg-yellow-500"
                  : issue.status === "In-Progress"
                  ? "bg-blue-500"
                  : issue.status === "Resolved"
                  ? "bg-green-500"
                  : "bg-gray-500"
              }`}
              >
                {issue.status}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm 
              ${
                issue.priority === "high"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200"
              }`}
              >
                {issue.priority === "high"
                  ? "High Priority"
                  : "Normal Priority"}
              </span>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex flex-col gap-2">
            {canEdit && <button className="btn_css">Edit</button>}
            {canDelete && <button className="btn_css">Delete</button>}
            {canBoost && (
              <button className="btn_css">Boost Issue (100 Tk)</button>
            )}
          </div>
        </div>
      </div>

      {/* Staff Info */}
      {issue.assignedStaff ? (
        <div className="bg-white rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-lg mb-2">Assigned Staff</h3>
          <div className="flex items-center gap-4">
            <img
              src={issue.assignedStaff.photo}
              alt={issue.assignedStaff.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-medium">{issue.assignedStaff.name}</p>
              <p className="text-gray-500">{issue.assignedStaff.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-lg mb-2">Not Assigned Staff Yet</h3>
        </div>
      )}

      {/* Timeline Section */}
      <div className="bg-white rounded-lg p-4">
        <h3 className="font-semibold text-lg mb-4">Issue Timeline</h3>
        <div className="flex flex-col-reverse gap-4">
          {issue?.timeline?.map((entry, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full border-2 border-red-600 bg-white"></div>
                {index < issue.timeline.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-300"></div>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {new Date(entry.at).toLocaleString()}
                </p>
                <p className="font-medium">{entry.status}</p>
                <p>{entry.note}</p>
                <p className="text-gray-500 text-sm">By: {entry.by}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
