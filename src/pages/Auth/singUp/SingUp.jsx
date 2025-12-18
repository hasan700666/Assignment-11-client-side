import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { GoogleAuthProvider } from "firebase/auth";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import useAxiousInstance from "../../../hooks/useAxiousInstance";

const SingUp = () => {
  const axiosInstance = useAxiousInstance();
  const location = useLocation();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const { createUser, updateUser, singInUserByGoogle } = useAuth();
  const [sow, setSow] = useState(false);
  const [sowConfirm, setSowConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      return toast.error("Password and confirm password do not match.");
    }

    createUser(data.email, data.password)
      .then((res) => {
        const firebaseUid = res.user.uid;
        const fromData = new FormData();
        fromData.append("image", data.photo[0]);
        const imgUploadURL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_imgbb_api_key
        }`;
        axios.post(imgUploadURL, fromData).then((res) => {
          const imgURL = res.data.data.url;

          updateUser(data.name, res.data.data.url)
            .then((res) => {
              console.log(res, "update Done");

              // id = 4
              axiosInstance
                .post("/user", {
                  firebaseUid: firebaseUid,
                  name: data.name,
                  email: data.email,
                  photoURL: imgURL,
                  role: "citizen",
                  isBlocked: false,
                  isPremium: false,
                  createdAt: new Date(),
                })
                .then((res) => {
                  console.log(res.data);
                  navigate(location.state || "/");
                })
                .catch((e) => {
                  console.log(e);
                  navigate(location.state || "/");
                });
            })
            .catch((e) => {
              console.log(e);
            });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSow = () => {
    setSow(!sow);
  };

  const handleSowConfirm = () => {
    setSowConfirm(!sowConfirm);
  };

  const handelGoogleSingIn = () => {
    singInUserByGoogle(provider)
      .then((res) => {
        console.log(res.user.email);
        // id = 4
        axiosInstance
          .post("/user", {
            firebaseUid: res.user.uid,
            name: res.user.displayName,
            email: res.user.email,
            photoURL: res.user.photoURL,
            role: "citizen",
            isBlocked: false,
            isPremium: false,
            createdAt: new Date(),
          })
          .then((res) => {
            console.log(res.data);
            navigate(location.state || "/");
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <div className="flex justify-center items-center">
        <div className="m-5">
          <div className="flex-col lg:flex-row-reverse ">
            <div className="card w-full shrink-0 shadow-2xl bg_css">
              <div className="card-body bg_css rounded_css pb-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {" "}
                  <fieldset className="fieldset">
                    <h1 className="text-5xl font-bold m-10 text-center">
                      Register now!
                    </h1>
                    {/* name field */}
                    <label className="label">Name</label>
                    <input
                      type="text"
                      className="input w-full rounded_css"
                      placeholder="Enter Your Name"
                      name="name"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <p className="text-red-500">Name field required</p>
                    )}
                    {/* email field */}
                    <label className="label">Email</label>
                    <input
                      type="email"
                      className="input w-full rounded_css"
                      placeholder="Enter Your Email"
                      name="email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <p className="text-red-500">Email field required</p>
                    )}
                    {/* photo field */}
                    <label className="label">Photo</label>
                    <input
                      type="file"
                      className="file-input w-full rounded_css"
                      placeholder="Enter Your Photo-URL"
                      name="photo"
                      {...register("photo", { required: true })}
                    />
                    {errors.photo && (
                      <p className="text-red-500">Photo field required</p>
                    )}
                    {/* password field */}
                    <label className="label">Password</label>
                    <div className="flex justify-between items-center">
                      <input
                        type={sow ? "text" : "password"}
                        className="input w-full rounded_css"
                        placeholder="Enter Your Password"
                        name="password"
                        {...register("password", {
                          required: true,
                          minLength: 6,
                          pattern: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                        })}
                      />
                      <button
                        className="btn_css rounded_css"
                        type="button"
                        onClick={handleSow}
                      >
                        {sow ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.password?.type === "required" && (
                      <p className="text-red-500">Password field required</p>
                    )}
                    {errors.password?.type === "minLength" && (
                      <p className="text-red-500">
                        Password field must have 6 character
                      </p>
                    )}
                    {errors.password?.type === "pattern" && (
                      <p className="text-red-500">
                        Password field must have 1 upper case and 1 lower case
                      </p>
                    )}

                    {/* confirm password field */}
                    <label className="label">Confirm Password</label>
                    <div className="flex justify-between items-center">
                      <input
                        type={sowConfirm ? "text" : "password"}
                        className="input w-full rounded_css"
                        placeholder="Enter Your Confirm Password"
                        name="confirm_password"
                        {...register("confirmPassword", { required: true })}
                      />
                      <button
                        className="btn_css"
                        type="button"
                        onClick={handleSowConfirm}
                      >
                        {sowConfirm ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500">
                        Confirm password field required
                      </p>
                    )}
                    <button className="btn_css mt-4 button_css">
                      Register
                    </button>
                  </fieldset>
                </form>
                <a
                  className="btn bg-white text-black border-[#e5e5e5]"
                  onClick={handelGoogleSingIn}
                >
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Login with Google
                </a>
                <div className="flex justify-center items-center flex-col mt-5">
                  Already have an account?{" "}
                  <NavLink to="/user/login" state={location.state}>
                    <button className="btn_css mt-3">Log in</button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
