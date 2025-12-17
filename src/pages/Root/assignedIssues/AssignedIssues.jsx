import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiousInstance from "../../../hooks/useAxiousInstance";

const AssignedIssues = () => {
  const { user } = useAuth();
  const axiousInsrance = useAxiousInstance();

  const { data: isStaff } = useQuery({
    queryKey: ["is_staff", user?.uid],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/user?firebaseUid=${user?.uid}`);
      if (res.data.result.role == "staff") {
        return res.data.result.role;
      }
    },
  });

  const { data: StaffAssignedIssues = [] } = useQuery({
    queryKey: ["issues_data", user?.uid],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/issues?staffUid=${user?.uid}`);
      return res.data;
    },
  });

  if (!isStaff) {
    return <>unaturize access</>;
  }

  console.log("the data ", StaffAssignedIssues);
  console.log(user.uid);

  return <div>i am for staff</div>;
};

export default AssignedIssues;
