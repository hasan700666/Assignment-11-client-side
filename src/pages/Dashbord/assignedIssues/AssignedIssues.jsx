import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiousInstance from "../../../hooks/useAxiousInstance";

const AssignedIssues = () => {
  const { user } = useAuth();
  const axiousInsrance = useAxiousInstance();
  const [filter, setfilter] = useState("");

  const { data: isStaff } = useQuery({
    queryKey: ["is_staff", user?.uid],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/user?email=${user.email}`);
      if (res.data.result.role == "staff") {
        return res.data.result.role;
      }
    },
  });

  const { data: StaffAssignedIssues = [], refetch } = useQuery({
    queryKey: ["issues_data", user?.uid, filter],
    queryFn: async () => {
      const res = await axiousInsrance.get(
        `/issues?staffUid=${user?.uid}&sort=${filter}`
      );
      if (res.data.message) {
        return res.data.message;
      }
      return res.data;
    },
  });

  if (!isStaff) {
    return <>unaturize access</>;
  }

  const statusFlow = {
    pending: ["in-progress"],
    "in-progress": ["working"],
    working: ["resolved"],
    resolved: ["closed"],
    closed: [],
  };

  const handleStatusClick = (status, id) => {
    //console.log("status ", status, id);
    const obj = {
      IssuesStatus: status,
    };
    axiousInsrance.patch(`/issues?_id=${id}`, obj).then((res) => {
      //console.log(res.data);
      refetch();
    });

    document.activeElement.blur();
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setfilter(value);
  };

  //console.log(StaffAssignedIssues);

  return (
    <div>
      {StaffAssignedIssues.length > 0 ? (
        <>
          <div>
            <div className="m-5">
              sort by:{" "}
              <select
                defaultValue=""
                className="select"
                onChange={handleSortChange}
              >
                <option disabled={true} value="">
                  Sort by
                </option>
                <option value="boost">Boost</option>
                <option value="date">Date</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In-Progress</option>
                <option value="working">Working</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div></div>
          </div>
          <div>
            {StaffAssignedIssues === "no data on bost" ? (
              <>
                <div className="text-4xl text-center my-100">
                  No issues Bosted Yet
                </div>
              </>
            ) : (
              <>
                {StaffAssignedIssues === "no data on panding" ? (
                  <>
                    <div className="text-4xl text-center my-100">
                      No issues Panding Yet
                    </div>
                  </>
                ) : (
                  <>
                    {StaffAssignedIssues === "no data on in-progress" ? (
                      <>
                        <div className="text-4xl text-center my-100">
                          No issues In Progress Yet
                        </div>
                      </>
                    ) : (
                      <>
                        {StaffAssignedIssues === "no data on working" ? (
                          <>
                            <div className="text-4xl text-center my-100">
                              No issues Working Yet
                            </div>
                          </>
                        ) : (
                          <>
                            {StaffAssignedIssues === "no data on resolved" ? (
                              <>
                                <div className="text-4xl text-center my-100">
                                  No Resolved Bosted Yet
                                </div>
                              </>
                            ) : (
                              <>
                                {StaffAssignedIssues === "no data on closed" ? (
                                  <>
                                    <div className="text-4xl text-center my-100">
                                      No issues Closed Yet
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div>
                                      <div className="bg-[#fee9e6] w-9/12 mx-auto my-10 radius_css p-5">
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
                                                <th>Update</th>
                                                <th>Action</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {StaffAssignedIssues.map(
                                                (issue, index) => (
                                                  <tr key={issue._id}>
                                                    <th>{index + 1}</th>
                                                    <td>{issue.title}</td>
                                                    <td>{issue.location}</td>
                                                    <td>{issue.category}</td>
                                                    <td>{issue.status}</td>
                                                    <td>{issue.updatedAt}</td>
                                                    <td>
                                                      <>
                                                        <div className="dropdown dropdown-end">
                                                          <button
                                                            tabIndex={0}
                                                            role="button"
                                                            className="btn m-1"
                                                          >
                                                            Click ⬇️
                                                          </button>
                                                          <ul
                                                            tabIndex={-1}
                                                            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                                                          >
                                                            {(
                                                              statusFlow[
                                                                issue.status
                                                              ] || []
                                                            ).map((status) => (
                                                              <li key={status}>
                                                                <button
                                                                  onClick={() =>
                                                                    handleStatusClick(
                                                                      status,
                                                                      issue._id
                                                                    )
                                                                  }
                                                                >
                                                                  {status}
                                                                </button>
                                                              </li>
                                                            ))}
                                                          </ul>
                                                        </div>
                                                      </>
                                                    </td>
                                                  </tr>
                                                )
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="text-4xl text-center my-100">You Are Free</div>
        </>
      )}
    </div>
  );
};

export default AssignedIssues;
