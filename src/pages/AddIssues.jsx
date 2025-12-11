import React from "react";
import { useForm } from "react-hook-form";
import img from "../assets/photo-add.svg";

const AddIssues = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
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
                  <option disabled={true}>Pick a color</option>
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
              </fieldset>
            </div>
            <div className="w-[50%] h-full">
              <div className="p-10">
                <input
                  type="file"
                  className="text-white w-full h-[60vh] bg-white radius_css relative cursor-pointer"
                ></input>
                <img
                  src={img}
                  alt=""
                  className="absolute w-20 top-145 right-140"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start mx-10 items-center">
            <button className="btn_css w-30 text-center ">Add Issues</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIssues;
