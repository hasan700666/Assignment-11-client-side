import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiousInstance from "../../../hooks/useAxiousInstance";
import Swal from "sweetalert2";

const AllIssuesForAdmin = () => {
  const [StaffUid, setStaffUid] = useState({});
  const [IssuesData, setIssuesData] = useState({});
  const { user } = useAuth();
  const axiousInsrance = useAxiousInstance();

  const { data: isAdmin } = useQuery({
    queryKey: ["is_admin", user.uid],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/user?email=${user.email}`);
      if (res.data.result.role == "admin") {
        return res.data.result.role;
      }
    },
  });

  const { data: isStaff } = useQuery({
    queryKey: ["is_staff", user?.uid],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/user?email=${user.email}`);
      return res.data.result.role === "staff";
    },
  });

  const { data: issues = [], refetch } = useQuery({
    queryKey: ["my-issues", user.uid],
    enabled: !!user?.uid && isAdmin !== undefined && isStaff !== undefined,
    queryFn: async () => {
      if (isAdmin) {
        const res = await axiousInsrance.get(`/issues`); // id = 3
        return res.data;
      } else if (isStaff) {
        const res = await axiousInsrance.get(`/issues?staffUid=${user?.uid}`);
        return res.data;
      } else {
        const res = await axiousInsrance.get(`/issues?firebaseId=${user?.uid}`); // id = 8
        return res.data;
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

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won to rejected the Issues for this Staff!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const staffUidObj = {
          StafFirebaseUid: null,
        };
        axiousInsrance.patch(`/issues?_id=${id}`, staffUidObj).then(() => {
          refetch();
          Swal.fire({
            title: "Rejected!",
            text: "Your work is done.",
            icon: "success",
          });
        });
      }
    });
  };

  const HandleAssignedStaff = () => {
    const findStffData = AllStaff.find(
      (staff) => StaffUid === staff.firebaseUid
    );
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
    <div>
      <div className="mt-10 w-full">
        <div className="mx-20">
          <div className="bg-[#fee9e6] mx-auto my-10 radius_css p-10 w-full">
            <div className="overflow-x-auto w-full">
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
                                  {issue.status === "pending" ? (
                                    <button
                                      className="btn_css"
                                      onClick={() => handleReject(issue._id)}
                                    >
                                      Reject
                                    </button>
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
                                      defaultValue=""
                                      className="select appearance-none"
                                      onChange={(e) => {
                                        const selectedId = e.target.value;
                                        setStaffUid(selectedId);
                                        setIssuesData(issue);
                                      }}
                                    >
                                      <option disabled={true} value="">
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

export default AllIssuesForAdmin;
