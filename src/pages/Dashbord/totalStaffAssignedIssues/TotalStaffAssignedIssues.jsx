import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiousInstance from "../../../hooks/useAxiousInstance";
import useAuth from "../../../hooks/useAuth";
import { NavLink } from "react-router";

const TotalStaffAssignedIssues = () => {
  const { user } = useAuth();
  const axiousInsrance = useAxiousInstance();

  const { data: isStaff } = useQuery({
    queryKey: ["is_staff", user?.uid],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/user?email=${user.email}`);
      if (res.data.result.role == "staff") {
        return res.data.result.role;
      }
    },
  });

  const { data: StaffAssignedIssues = [] } = useQuery({
    queryKey: ["issues_data", user?.uid],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/issues?staffUid=${user?.uid}`);
      const allInProgressIssues = res.data.filter(
        (res) => res.status === "pending"
      );
      return allInProgressIssues;
    },
  });

  if (!isStaff) {
    return <>unaturize access</>;
  }

  //console.log(StaffAssignedIssues);

  return (
    <div>
      <div></div>
      {StaffAssignedIssues.length === 0 ? (
        <>
          <div>No Issues Assigned With You Yet</div>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="flex justify-center items-center">
        <NavLink to="/dashboard/assigned_issues_page">
          <button className="btn_css">Update Issues Status</button>
        </NavLink>
      </div>
    </div>
  );
};

export default TotalStaffAssignedIssues;
