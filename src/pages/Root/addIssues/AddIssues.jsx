import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import img from "../../../assets/photo-add.svg";
import Swal from "sweetalert2";
import useAxiousInstance from "../../../hooks/useAxiousInstance";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { NavLink, useNavigate } from "react-router";

const AddIssues = () => {
  const { user } = useAuth();
  const axiousInsrance = useAxiousInstance();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [userIssuesLen, setUserIssuesLen] = useState({});

  useEffect(() => {
    // id = 3
    axiousInsrance.get(`/user?email=${user.email}`).then((res) => {
      if (!res.data.result.isPremium) {
        axiousInsrance
          .get(`/issues?firebaseId=${user?.uid}`)
          .then((res) => setUserIssuesLen(res.data.length));
      }
    });
  }, [user, axiousInsrance]);

  const onSubmit = (data) => {
    const fromData = new FormData();
    fromData.append("image", data.photo[0]);
    const imgURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imgbb_api_key
    }`;
    axios.post(imgURL, fromData).then((res) => {
      console.log("img upload", res.data.data.url);
      // id = 1
      axiousInsrance
        .post("/issues", {
          title: data.title,
          location: data.location,
          category: data.category,
          description: data.description,
          photoURL: res.data.data.url,
          status: "pending",
          priority: "normal",
          boosted: false,
          boostedAt: null,
          upvotes: undefined,
          upvoters: [undefined],
          reporterFirebaseUid: user.uid,
          assignedStaffUid: null,
          assignedStaffName: null,
          timeline: [
            {
              status: "Pending",
              note: "Issue created",
              by: `${user.displayName}`,
              at: new Date(),
            },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .then((res) => {
          console.log(res);
          navigate("/dashboard/my_issues");
          Swal.fire({
            title: "Issues are added",
            confirmButtonText: "Awesome!",
            customClass: {
              confirmButton: "btn_css",
            },
            buttonsStyling: false,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  return (
    <div>
      {userIssuesLen >= 3 ? (
        <div className="my-80">
          <div className="text-4xl text-center">
            You con't add more then 3 datas
          </div>
          <NavLink to="/dashboard" className="flex justify-center items-center">
            <div className="m-10 flex flex-col justify-center items-center">
              <div className="m-3">Want to add more issues!</div>
              <button className="btn_css">Subscribe Now!</button>
            </div>
          </NavLink>
        </div>
      ) : (
        <>
          <div className="my-10 text-3xl md:text-5xl text-center">
            Add <span className="text_design_like_btn">Issues</span>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full lg:w-[80vw] mx-auto my-10 p-6 md:p-10 bg-[#fee9e6] radius_css"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Side */}
              <div className="w-full lg:w-1/2">
                <fieldset className="space-y-4">
                  <div>
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
                  </div>

                  <div>
                    <label className="label">Location</label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="location"
                      {...register("location", { required: true })}
                    />
                    {errors.location && (
                      <p className="text-red-500">Location field required</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Category</label>
                    <select
                      defaultValue=""
                      className="select w-full"
                      {...register("category", { required: true })}
                    >
                      <option disabled value="">
                        Pick a category
                      </option>
                      <option>Road</option>
                      <option>Mosquito</option>
                      <option>Garbage</option>
                      <option>Street Light</option>
                      <option>Air Pollution</option>
                    </select>
                    {errors.category && (
                      <p className="text-red-500">Category field required</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Description</label>
                    <textarea
                      className="textarea w-full min-h-[120px]"
                      placeholder="add description"
                      {...register("description", { required: true })}
                    ></textarea>
                    {errors.description && (
                      <p className="text-red-500">Description field required</p>
                    )}
                  </div>
                </fieldset>
              </div>

              {/* Right Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <input
                    type="file"
                    className="w-full lg:h-[50vh] h-[5vh] bg-white radius_css cursor-pointer p-5 text-black"
                    {...register("photo", { required: true })}
                  />
                  {img && (
                    <img
                      src={img}
                      alt=""
                      className="lg:absolute bottom-4 right-4 w-16 md:w-20 rounded lg:block hidden"
                    />
                  )}
                  {errors.photo && (
                    <p className="text-red-500 mt-2">Photo field required</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center lg:justify-start">
              <button className="btn_css px-8">Add Issues</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default AddIssues;
