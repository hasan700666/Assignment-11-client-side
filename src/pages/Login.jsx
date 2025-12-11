import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router";
import { GoogleAuthProvider } from "firebase/auth";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const provider = new GoogleAuthProvider();
  const { singInUser, singInUserByGoogle } = useAuth();
  const [sow, setSow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    singInUser(data.email, data.password)
      .then((res) => {
        console.log(res);
        navigate(location.state || "/")
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handelSow = () => {
    setSow(!sow);
    console.log(sow);
  };

  const handelGoogleSingIn = () => {
    singInUserByGoogle(provider)
      .then((res) => {
        console.log(res);
        navigate(location.state || "/")
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <div>{/* <Toaster /> */}</div>
        <div className="m-5">
          <div className="hero-content flex-col lg:flex-row-reverse ">
            <div className="card w-full shrink-0 shadow-2xl bg_css">
              <div className="card-body bg_css rounded_css pb-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {" "}
                  <fieldset className="fieldset">
                    <h1 className="text-5xl font-bold m-10 text-center">
                      Login now!
                    </h1>
                    {/* email field */}
                    <label className="label ">Email</label>
                    <input
                      type="email"
                      className="input w-full rounded_css"
                      placeholder="Email"
                      name="email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <p className="text-red-500">Email field required</p>
                    )}
                    {/* password field */}
                    <label className="label">Password</label>
                    <div className="flex items-center">
                      <input
                        type={sow ? "text" : "password"}
                        className="input rounded_css"
                        placeholder="Password"
                        name="password"
                        {...register("password", { required: true })}
                      />
                      <button
                        className="btn_css"
                        type="button"
                        onClick={handelSow}
                      >
                        {sow ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500">Password field required</p>
                    )}
                    <div>
                      <a
                        className="link link-hover"
                        // onClick={handleForgotPassword}
                        type="button"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <button className="btn_css">Login</button>
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
                  Don't have an account?{" "}
                  <NavLink to="/user/sing_up" state={location.state}>
                    <button className="btn_css mt-3">Sing up</button>
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

export default Login;
