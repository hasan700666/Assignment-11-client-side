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
  }, [user,axiousInsrance]);

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
          navigate("/my_issues");
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
        <>
          <div className="text-2xl">you con't add more then 3 data</div>
          <NavLink to="/dashboard">
            <button className="btn_css">Subscribe</button>
          </NavLink>
        </>
      ) : (
        <>
          <div>
            <div className="m-20 text-5xl text-center">
              Add <span className="text_design_like_btn">Issues</span>
            </div>
            <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-[80vw] m-auto my-10 p-10 bg-[#fee9e6] radius_css"
              >
                <div className="flex justify-between">
                  <div className="w-[50%]">
                    <fieldset className="fieldset p-10 ">
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
                        defaultValue="Pick a color"
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
                        <p className="text-red-500">
                          Description field required
                        </p>
                      )}
                    </fieldset>
                  </div>
                  <div className="w-[50%] h-full">
                    <div className="p-10">
                      <input
                        type="file"
                        className="text-white w-full h-[60vh] bg-white radius_css relative cursor-pointer"
                        {...register("photo", { required: true })}
                      ></input>
                      <img
                        src={img}
                        alt=""
                        className="absolute w-20 top-145 right-140"
                      />
                      {errors.photo && (
                        <p className="text-red-500">Photo field required</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-start mx-10 items-center">
                  <button className="btn_css w-30 text-center">
                    Add Issues
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddIssues;
