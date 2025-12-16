import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiousInstance from "../../../hooks/useAxiousInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

const MyIssues = () => {
  const { user } = useAuth();
  const axiousInsrance = useAxiousInstance();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: issues = [], refetch } = useQuery({
    queryKey: ["issues", user.uid],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/issues?firebaseId=${user?.uid}`); // id = 2
      return res.data;
    },
  });

  const handleDelete = (id) => {
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
      uid: user.uid,
    };

    const res = await axiousInsrance.post(
      // id = 6
      "/create-checkout-session",
      paymentInfo
    );

    window.location.assign(res.data.url);
  };

  const handleSow = (id) => {
    navigate(`/issue_details?id=${id}`);
  };

  const onSubmit = async (data) => {
    const res = await axiousInsrance.patch(`/issues/${data?._id}`, data);
    console.log(res);
    document.getElementById("edit_modal").close();
    refetch();
  };

  const openEditModal = (issue) => {
    reset(issue);
    document.getElementById("edit_modal").showModal();
  };

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
                  <td>{issue.upvoters.length - 1}</td>
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
                      <button
                        className="btn_css"
                        onClick={() => handleSow(issue?._id)}
                      >
                        Sow
                      </button>
                      <button
                        className="btn_css"
                        onClick={() => openEditModal(issue)}
                      >
                        Update
                      </button>
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
          <div>
            <dialog id="edit_modal" className="modal">
              <div className="modal-box">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className=" m-auto my-10 p-10 bg-[#fee9e6] radius_css"
                >
                  <fieldset className="fieldset">
                    <label className="label">Title</label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="name of issues"
                      {...register("title", { required: true })}
                    />
                    {errors.title && (
                      <p className="text-red-500">Title field required</p>
                    )}
                    <label className="label">Location</label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="select category name"
                      {...register("location", { required: true })}
                    />
                    {errors.location && (
                      <p className="text-red-500">Label field required</p>
                    )}
                    <label className="label">Category</label>
                    <select
                      className="select w-full"
                      {...register("category", { required: true })}
                    >
                      <option disabled={true}>Pick a category</option>
                      <option>Road</option>
                      <option>Mosquito</option>
                      <option>Garbage</option>
                      <option>Street Light</option>
                      <option>Air Pollution </option>
                    </select>
                    {errors.category && (
                      <p className="text-red-500">Category field required</p>
                    )}
                    <label className="label">Description</label>
                    <textarea
                      type="text"
                      className="textarea w-full h-30"
                      placeholder="add description"
                      {...register("description", { required: true })}
                    ></textarea>
                    {errors.description && (
                      <p className="text-red-500">Description field required</p>
                    )}
                    <input
                      className="bg-white p-2"
                      type="file"
                      {...register("photo")}
                    ></input>
                  </fieldset>
                  <div className="flex justify-center items-center">
                    <button className="btn_css text-center">Update</button>
                  </div>
                </form>

                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn_css">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyIssues;
