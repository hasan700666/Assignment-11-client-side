import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiousInstance from "../../../hooks/useAxiousInstance";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const TotalUser = () => {
  const { user } = useAuth();
  const axiousInsrance = useAxiousInstance();

  const { data: isAdmin } = useQuery({
    queryKey: ["is_admin", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiousInsrance.get(`/user?email=${user.email}`);
      return res.data.result.role === "admin";
    },
  });

  const { data: AllUser = [], refetch } = useQuery({
    queryKey: ["AllUser", user?.uid],
    queryFn: async () => {
      const res = axiousInsrance.get("/user");
      return res;
    },
  });

  if (!isAdmin) {
    return <>un authrorize access</>;
  }
  
  const handleBlock = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won to Block this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // id = 10
        axiousInsrance.patch(`/user?id=${id}`, { data: true }).then((res) => {
          //console.log(res.data);
          if (res.data.acknowledged) {
            refetch();
            Swal.fire({
              title: "Blocked!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleUnBlock = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won to Un Block this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // id = 10
        axiousInsrance.patch(`/user?id=${id}`, { data: false }).then((res) => {
          //(res.data);
          if (res.data.acknowledged) {
            refetch();
            Swal.fire({
              title: "Un Blocked!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div>
        <div className="bg-[#fee9e6] w-9/12 mx-auto my-10 radius_css p-5">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Premium</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {AllUser?.data?.map((regUser, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{regUser.name}</td>
                    <td>{regUser.email}</td>
                    <td>{regUser.isPremium ? <>yes</> : <>No</>}</td>
                    <td>{regUser.createdAt}</td>
                    <td>
                      {regUser.isBlocked ? (
                        <button
                          className="btn_css"
                          onClick={() => handleUnBlock(regUser._id)}
                        >
                          Un Block Now
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleBlock(regUser._id)}
                            className="btn_css"
                          >
                            Block Now
                          </button>
                        </>
                      )}
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

export default TotalUser;
