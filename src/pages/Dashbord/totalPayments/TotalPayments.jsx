import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiousInstance from "../../../hooks/useAxiousInstance";

const TotalPayments = () => {
  const { user } = useAuth();
  const axiousInsrance = useAxiousInstance();
  const [filter, setFilter] = useState("");

  const { data: isAdmin } = useQuery({
    queryKey: ["is_admin", user.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiousInsrance.get(`/user?email=${user.email}`);
      return res.data.result.role === "admin";
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["my-payment", user.uid, filter],
    enabled: !!user?.uid && isAdmin !== undefined,
    queryFn: async () => {
      if (isAdmin) {
        const res = await axiousInsrance.get(`/payment`); // id = 8
        if (filter === "boost") {
          const filterBoost = res.data.filter(
            (data) => data.type === "issues boost"
          );
          return filterBoost;
        } else if (filter === "subscribe") {
          const filterSub = res.data.filter(
            (data) => data.type === "user subscription"
          );
          return filterSub;
        }
        return res.data;
      } else {
        const res = await axiousInsrance.get(
          `/payment?firebaseUid=${user.uid}`
        ); // id = 8
        if (filter === "boost") {
          const filterBoost = res.data.filter(
            (data) => data.type === "issues boost"
          );
          return filterBoost;
        } else if (filter === "subscribe") {
          const filterSub = res.data.filter(
            (data) => data.type === "user subscription"
          );
          return filterSub;
        }
        return res.data;
      }
    },
  });

  const handleSortChange = (e) => {
    const value = e.target.value;
    setFilter(value);
  };

  //console.log(payments);
  //console.log(filter);

  return (
    <div>
      <div></div>
      <div>
        <div>
          <div className="m-5">
            sort by:{" "}
            <select
              defaultValue=""
              className="select"
              onChange={handleSortChange}
            >
              <option value="">
                none
              </option>
              <option value="boost">Boosted Issues</option>
              <option value="subscribe">Subscribe</option>
            </select>
          </div>
          <div></div>
        </div>
      </div>
      <div className="bg-[#fee9e6] w-10/12 mx-auto my-10 radius_css p-5">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Type</th>
                <th>Issues Id(if the issues is bosted)</th>
                <th>CreatedAt</th>
                <th>User FirebaseUid</th>
                <th>Provider</th>
                <th>Transaction Id</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>{payment.type}</td>
                  <td>{payment.issueId}</td>
                  <td>{payment.createdAt}</td>
                  <td>{payment.firebaseUid}</td>
                  <td>{payment.provider}</td>
                  <td>{payment.transactionId}</td>
                  <td>{payment.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <dialog id="edit_modal" className="modal"></dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalPayments;
