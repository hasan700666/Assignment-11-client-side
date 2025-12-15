import React from "react";
import useAuth from "../../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  const handleUpdate = () => {
    console.log("j");
    
  };

  return (
    <div>
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
            <h2 className="mt-6 text-2xl font-semibold">{user.displayName}</h2>
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
              <button onClick={handleUpdate} className="btn_css">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
