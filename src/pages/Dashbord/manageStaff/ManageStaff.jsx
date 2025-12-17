import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiousInstance from "../../../hooks/useAxiousInstance";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ManageStaff = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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

  const { data: AllStaff = [] } = useQuery({
    queryKey: ["AllStaff", user?.uid],
    queryFn: async () => {
      const res = await axiousInsrance.get("/user");
      const filterStaff = res.data.filter((data) => data.role == "staff");
      return filterStaff;
    },
  });

  if (!isAdmin) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-infinity size-20"></span>
      </div>
    );
  }

  const handleAddStaff = (data) => {
    if (data.password !== data.confirm_password) {
      return toast.error("Password and confirm password do not match.");
    }
    const fromData = new FormData();
    fromData.append("image", data.photo[0]);
    const imgUploadURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imgbb_api_key
    }`;
    axios.post(imgUploadURL, fromData).then((res) => {
      const imgURL = res.data.data.url;
      axiousInsrance
        .post("/create/staff", {
          password: data.password,
          name: data.name,
          email: data.email,
          photoURL: imgURL,
          role: "staff",
          phone: data.phone,
          isBlocked: false,
          isPremium: false,
          createdAt: new Date(),
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  const handleDelete = (id) => {
    console.log("delete", id);
  };

  const handleUpdate = (id) => {
    console.log(id);

    // the word is not done
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <div>All Staff</div>
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
                  <th>phone</th>
                  <th>firebase Uid</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {AllStaff?.map((staff, index) => (
                  <tr key={staff._id}>
                    <th>{index + 1}</th>
                    <td>{staff.name}</td>
                    <td>{staff.email}</td>
                    <td>{staff.phone}</td>
                    <td>{staff.firebaseUid}</td>
                    <td>{new Date(staff.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleUpdate(staff)}
                        className="btn_css"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(staff._id)}
                        className="btn_css"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          className="btn_css"
          onClick={() => document.getElementById("my_modal_1")?.showModal()}
        >
          Add Staff
        </button>
      </div>
      <div>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <form
              onSubmit={handleSubmit(handleAddStaff)}
              className=" m-auto my-10 p-10 bg-[#fee9e6] radius_css"
            >
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="name of staff"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-red-500">Name field required</p>
                )}
                <label className="label">email</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="email of staff"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500">Email field required</p>
                )}
                <label className="label">phone Number</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="phone number of staff"
                  {...register("phone", { required: true })}
                />
                {errors.phone && (
                  <p className="text-red-500">phone field required</p>
                )}
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input w-full"
                  placeholder="Enter password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-red-500">password field required</p>
                )}
                <label className="label">Confirm Password</label>
                <input
                  type="password"
                  className="input w-full"
                  placeholder="Enter confirm password"
                  {...register("confirm_password", { required: true })}
                ></input>
                {errors.confirm_password && (
                  <p className="text-red-500">
                    Confirm password field required
                  </p>
                )}
                <input
                  className="bg-white p-2"
                  type="file"
                  {...register("photo", { required: true })}
                ></input>
                {errors.photo && (
                  <p className="text-red-500">photo field required</p>
                )}
              </fieldset>
              <div className="flex justify-center items-center">
                <button className="btn_css text-center">Add</button>
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
  );
};

export default ManageStaff;
