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
      return res.data;
    },
  });

  if (!isStaff) {
    return <>unaturize access</>;
  }

  const statusOptions = ["in-progress", "working", "resolved", "cancel"];

  const handleStatusClick = (status, id) => {
    console.log("status ", status, id);
    const obj = {
      IssuesStatus: status,
    };
    axiousInsrance.patch(`/issues?_id=${id}`, obj).then((res) => {
      console.log(res.data);
      refetch();
    });

    document.activeElement.blur();
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setfilter(value);
  };

  console.log("the data ", StaffAssignedIssues);
  console.log(user.uid);

  return (
    <div>
      <div>
        <div className="m-5">
          sort by:{" "}
          <select
            defaultValue=""
            className="select"
            onChange={handleSortChange}
          >
            <option disabled={true} value="">
              Pick a color
            </option>
            <option value="boost">Boost</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div></div>
      </div>
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
                {StaffAssignedIssues.map((issue, index) => (
                  <tr key={issue._id}>
                    <th>{index + 1}</th>
                    <td>{issue.title}</td>
                    <td>{issue.location}</td>
                    <td>{issue.category}</td>
                    <td>{issue.status}</td>
                    <td>{issue.updatedAt}</td>
                    <td>
                      <>
                        <button
                          className="btn_css"
                          //onClick={() => handleSow(issue?._id)}
                        >
                          Change Status
                        </button>
                      </>
                      <>
                        <div className="dropdown dropdown-bottom">
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
                            {statusOptions.map((status) => (
                              <li key={status}>
                                <button
                                  onClick={() =>
                                    handleStatusClick(status, issue._id)
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedIssues;
