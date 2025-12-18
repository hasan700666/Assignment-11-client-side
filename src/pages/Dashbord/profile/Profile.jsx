import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import useAxiousInstance from "../../../hooks/useAxiousInstance";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [Update, setUpdate] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosInstance = useAxiousInstance();

  const hendleUpdateProfile = () => {
    setUpdate(!Update);
  };

  const onSubmit = (data) => {
    console.log(data.name, data.photo);

    const fromData = new FormData();
    fromData.append("image", data.photo[0]);
    const imgUploadURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imgbb_api_key
    }`;
    axios.post(imgUploadURL, fromData).then((res) => {
      const imgURL = res.data.data.url;

      updateUser(data.name, res.data.data.url).then((res) => {
        console.log(res, "update is done");

        axiosInstance
          .patch(`/user?Uid=${user.uid}`, {
            name: data.name,
            photoURL: imgURL,
          })
          .then((res) => {
            console.log(res.data);
            toast.success("Successful!");
          })
          .catch((e) => {
            console.log(e);
            toast.success("Successful!");
          });
      });
    });
  };

  return (
    <div>
      <div>
        <Toaster></Toaster>
      </div>
      {Update ? (
        <>
          <div>
            <div className="hero min-h-screen ">
              <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card w-full shrink-0 bg-[#fee9e6]">
                  <div className="card-body bg-[#fee9e6] rounded-4xl pb-15">
                    <h1 className="text-5xl font-bold m-10">Update now!</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <fieldset className="fieldset">
                        <label className="label">Name</label>
                        <input
                          type="name"
                          className="input w-full"
                          placeholder="Enter your Name"
                          name="name"
                          {...register("name", { required: true })}
                        />
                        {errors.name && (
                          <p className="text-red-500">Name field required</p>
                        )}
                        <label className="label">Photo</label>
                        <input
                          type="file"
                          className="file-input w-full"
                          name="photo"
                          {...register("photo", { required: true })}
                        />
                        {errors.photo && (
                          <p className="text-red-500">Photo field required</p>
                        )}

                        <button className="btn_css">Done</button>
                      </fieldset>
                    </form>
                    <button className="btn_css" onClick={hendleUpdateProfile}>
                      Go to My Profile page
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-5xl bg-[#fee9e6] radius_css p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left profile */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative">
                  <div className="w-52 h-52 rounded-2xl border-4 border-red-600 flex items-center justify-center">
                    <img
                      src={user.photoURL}
                      alt="profile"
                      className="w-40 h-40 rounded-full object-cover border-4 border-black"
                    />
                  </div>
                </div>
                <h2 className="mt-6 text-2xl font-semibold">
                  {user.displayName}
                </h2>
                <p className="text-red-600">{user.email}</p>
              </div>

              {/* Right details */}
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold mb-4 border-b pb-2">
                  Bio & other details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="text-gray-500">My Name</p>
                    <p className="font-medium">{user.displayName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone Number</p>
                    <p className="font-medium">N/A</p>
                  </div>
                  <div>
                    <p className="text-gray-500">My Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Password</p>
                    <p className="font-medium">************</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Gender</p>
                    <p className="font-medium">N/A</p>
                  </div>
                  <div>
                    <p className="text-gray-500">My City or Region</p>
                    <p className="font-medium">N/A</p>
                  </div>
                </div>

                <div className="mt-8">
                  <button onClick={hendleUpdateProfile} className="btn_css">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
