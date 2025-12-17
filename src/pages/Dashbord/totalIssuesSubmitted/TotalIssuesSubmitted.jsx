import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiousInstance from "../../../hooks/useAxiousInstance";
import { useQuery } from "@tanstack/react-query";
import { FileText } from "lucide-react";

const TotalIssuesSubmitted = () => {
  const [StaffUid, setStaffUid] = useState({});
  const [IssuesData, setIssuesData] = useState({});
  const { user } = useAuth();
  const axiousInsrance = useAxiousInstance();

  const { data: isAdmin } = useQuery({
    queryKey: ["is_admin", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiousInsrance.get(`/user?firebaseUid=${user.uid}`);
      return res.data.result.role === "admin";
    },
  });

  const { data: issues = [], refetch } = useQuery({
    queryKey: ["my-issues", user.uid],
    enabled: !!user?.uid && isAdmin !== undefined,
    queryFn: async () => {
      if (isAdmin) {
        const res = await axiousInsrance.get(`/issues`); // id = 3
        return res.data;
      } else {
        const res = await axiousInsrance.get(`/issues?firebaseId=${user?.uid}`); // id = 8
        return res.data;
      }
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
          (data) => data.status === "Pending"
        );
        if (FilrerdPandingIssues) {
          return FilrerdPandingIssues;
        }
      } else {
        const res = await axiousInsrance.get(`/issues?firebaseId=${user?.uid}`); // id = 2
        const Issues = res.data;
        const FilrerdPandingIssues = Issues.filter(
          (data) => data.status === "Pending"
        );
        if (FilrerdPandingIssues) {
          return FilrerdPandingIssues;
        }
      }
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
          (data) => data.status === "In-Progress"
        );
        if (FilrerdInProgressIssues) {
          return FilrerdInProgressIssues;
        }
      } else {
        const res = await axiousInsrance.get(`/issues?firebaseId=${user?.uid}`); // id = 2
        const Issues = res.data;
        const FilrerdInProgressIssues = Issues.filter(
          (data) => data.status === "In-Progress"
        );
        if (FilrerdInProgressIssues) {
          return FilrerdInProgressIssues;
        }
      }
    },
  });

  const { data: resolvedIssues = [] } = useQuery({
    queryKey: ["my-resolved-issues", user.uid],
    enabled: !!user?.uid && isAdmin !== undefined,
    queryFn: async () => {
      if (isAdmin) {
        const res = await axiousInsrance.get(`/issues`); // id = 3
        const Issues = res.data;
        const FilrerdPandingIssues = Issues.filter(
          (data) => data.status === "Resolved"
        );
        if (FilrerdPandingIssues) {
          return FilrerdPandingIssues;
        }
      } else {
        const res = await axiousInsrance.get(`/issues?firebaseId=${user?.uid}`); // id = 2
        const Issues = res.data;
        const FilrerdPandingIssues = Issues.filter(
          (data) => data.status === "Resolved"
        );
        if (FilrerdPandingIssues) {
          return FilrerdPandingIssues;
        }
      }
    },
  });

  const { data: AllStaff = [] } = useQuery({
    queryKey: ["AllStaff", user?.uid],
    queryFn: async () => {
      const res = await axiousInsrance.get("/user");
      const filterStaff = res.data.filter((data) => data.role == "staff");
      return filterStaff;
    },
  });

  const HandleAssignedStaff = () => {
    const findStffData = AllStaff.find(
      (staff) => StaffUid === staff.firebaseUid
    );

    console.log(findStffData);

    if (findStffData) {
      const staffUidObj = {
        StafFirebaseUid: findStffData.firebaseUid,
        StaffName: findStffData.name,
      };
      axiousInsrance
        .patch(`/issues?_id=${IssuesData._id}`, staffUidObj)
        .then((res) => {
          refetch();
          console.log("update is done ", res.data);
        });
    }
  };

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
      <div className="my-10">
        <div className="text-center">all Issues</div>
        <div>
          <div className="bg-[#fee9e6] mx-auto my-10 radius_css p-5">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Category</th>
                    <th>State</th>
                    <th>priority</th>
                    {isAdmin && <th>Assigned Staff</th>}
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue, index) => (
                    <tr>
                      <th>{index + 1}</th>
                      <td>{issue.title}</td>
                      <td>{issue.location}</td>
                      <td>{issue.category}</td>
                      <td>{issue.status}</td>
                      <td>{issue.priority}</td>
                      {isAdmin && (
                        <td>
                          {issue.assignedStaffUid ? (
                            <>
                              {isAdmin && (
                                <th>
                                  {issue.status === "Pending" ? (
                                    <>
                                      <button className="btn_css">
                                        Reject
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <div className="bg-[#f22303] text-center p-2 rounded-xl text-white">
                                        {issue.assignedStaffName}
                                      </div>
                                    </>
                                  )}
                                </th>
                              )}
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() =>
                                  document
                                    .getElementById(`my_modal_5_${issue._id}`)
                                    .showModal()
                                }
                                className="btn_css"
                              >
                                Assigned Staff
                              </button>
                              <dialog
                                id={`my_modal_5_${issue._id}`}
                                className="modal modal-bottom sm:modal-middle"
                              >
                                <div className="modal-box">
                                  <h3 className="font-bold text-lg">
                                    Assigned Staff Now!
                                  </h3>
                                  <p className="py-4">
                                    Please Assigned The Issues With Staff Now!
                                  </p>
                                  <p>
                                    <select
                                      defaultValue="Pick a color"
                                      className="select appearance-none"
                                      onChange={(e) => {
                                        const selectedId = e.target.value;
                                        setStaffUid(selectedId);
                                        setIssuesData(issue);
                                      }}
                                    >
                                      <option disabled={true}>
                                        Pick a staff
                                      </option>
                                      {AllStaff.map((staff) => (
                                        <option value={staff.firebaseUid}>
                                          {staff.name}
                                        </option>
                                      ))}
                                    </select>
                                  </p>
                                  <div className="modal-action">
                                    <form method="dialog">
                                      <button
                                        className="btn_css"
                                        onClick={HandleAssignedStaff}
                                      >
                                        Assign
                                      </button>
                                      <button className="btn_css">Close</button>
                                    </form>
                                  </div>
                                </div>
                              </dialog>
                            </>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
