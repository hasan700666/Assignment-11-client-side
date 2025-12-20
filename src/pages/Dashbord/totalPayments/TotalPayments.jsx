import { IoMdCard } from "react-icons/io";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiousInstance from "../../../hooks/useAxiousInstance";

const TotalPayments = () => {
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

  const { data: payment = [] } = useQuery({
    queryKey: ["my-payment", user.uid],
    enabled: !!user?.uid && isAdmin !== undefined,
    queryFn: async () => {
      if (isAdmin) {
        console.log("hello");

        const res = await axiousInsrance.get(`/payment`); // id = 8
        return res.data;
      } else {
        const res = await axiousInsrance.get(
          `/payment?firebaseUid=${user.uid}`
        ); // id = 8
        return res.data;
      }
    },
  });

  console.log(payment);

  return (
    <div>
      <div></div>
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
                <th>Likes</th>
                <th>Update</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payment.map((issue, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>{issue.title}</td>
                  <td>{issue.location}</td>
                  <td>{issue.category}</td>
                  <td>{issue.status}</td>
                  <td>{issue.upvoters.length - 1}</td>
                  <td>{issue.updatedAt}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <dialog id="edit_modal" className="modal">
              
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalPayments;
