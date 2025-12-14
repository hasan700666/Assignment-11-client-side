import { IoMdCard } from "react-icons/io";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiousInstance from "../../../hooks/useAxiousInstance";

const TotalPayments = () => {
  const { user } = useAuth();
  const axiousInsrance = useAxiousInstance();

  const { data: payment = [] } = useQuery({
    queryKey: ["my-payment", user.uid],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/payment/${user.uid}`); // id = 8
      return res.data;
    },
  });

  console.log(payment);
  console.log(user.uid);

  return (
    <div>
      <div className="flex flex-col justify-center items-center m-30">
        <div className=" bg-white rounded-2xl shadow-md p-6 ">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              My Reported Issues
            </h2>
            <IoMdCard className="w-5 h-5 text-red-600" />
          </div>
          {/* Total Count */}
          <div className="text-center my-6">
            <div>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Job</th>
                      <th>Favorite Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>1</th>
                      <td>Cy Ganderton</td>
                      <td>Quality Control Specialist</td>
                      <td>Blue</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th>2</th>
                      <td>Hart Hagerty</td>
                      <td>Desktop Support Technician</td>
                      <td>Purple</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <th>3</th>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Red</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalPayments;
