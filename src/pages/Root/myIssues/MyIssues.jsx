import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiousInstance from "../../../hooks/useAxiousInstance";
import Swal from "sweetalert2";

const MyIssues = () => {
  const { user } = useAuth();
  const axiousInsrance = useAxiousInstance();

  const { data: issues = [], refetch } = useQuery({
    queryKey: ["my-issues", user.uid],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/issues?firebaseId=${user?.uid}`); // id = 2
      return res.data;
    },
  });

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiousInsrance.delete(`/issues/${id}`).then((res) => {
          // id = 5
          console.log(res.data.deletedCount);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleBost = async (name, id) => {
    const paymentInfo = {
      name: name,
      id: id,
      email: user.email,
    };

    const res = await axiousInsrance.post(
      // id = 6
      "/create-checkout-session",
      paymentInfo
    );
    console.log(res.data.url);
    window.location.href = res.data.url;
  };
  return (
    <div>
      <div></div>
      <div className="bg-[#fee9e6] w-9/12 h-[80vh] mx-auto my-10 radius_css p-5">
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
                <th>Boost</th>
                <th>Update</th>
                <th>Action</th>
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
                  <td>{issue.upvoters}</td>
                  <td>
                    {issue.boosted ? (
                      <div className="bg-[#f22303] text-center p-2 rounded-xl text-white">
                        Boosted
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            document.getElementById("my_modal_5").showModal()
                          }
                          className="btn_css"
                        >
                          Bost Now
                        </button>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <dialog
                          id="my_modal_5"
                          className="modal modal-bottom sm:modal-middle"
                        >
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">Bost Now!</h3>
                            <p className="py-4">
                              Please pay $5 for bust yout issue
                            </p>
                            <div className="modal-action">
                              <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button
                                  className="btn_css"
                                  onClick={() =>
                                    handleBost(issue.title, issue._id)
                                  }
                                >
                                  Bost
                                </button>
                                <button className="btn_css">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </>
                    )}
                  </td>
                  <td>{issue.updatedAt}</td>
                  <td>
                    <>
                      <button className="btn_css">Sow</button>
                      <button className="btn_css">Update</button>
                      <button
                        className="btn_css"
                        onClick={() => handleDelete(issue._id)}
                      >
                        Delete
                      </button>
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyIssues;
