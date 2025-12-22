import React from "react";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiousInstance from "../hooks/useAxiousInstance";
import { Ban, AlertCircle, HelpCircle } from "lucide-react";
import { NavLink } from "react-router";

const IsUserBlocked = ({ children }) => {
  const { user } = useAuth();
  const axiousInsrance = useAxiousInstance();

  const { data: IsUserBlocked = [] } = useQuery({
    queryKey: ["isUser", user.email],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/user?email=${user.email}`);
      return res.data.result.isBlocked;
    },
  });

  if (IsUserBlocked) {
    return (
      <div className="min-h-screen my-10 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-[#fee9e6] rounded-xl p-8">
            {/* Icon */}
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Ban className="w-10 h-10 text-red-600" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Account Blocked
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Your account has been temporarily suspended
            </p>

            {/* Message */}
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">
                  Your account was found to be in violation of our community
                  guidelines.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-center items-center">
              <button className="w-full btn_css">Contact Support</button>
              <NavLink
                to="/"
                className="flex justify-center items-center w-full"
              >
                <button className="w-full btn_css">Go To Home Page</button>
              </NavLink>
            </div>

            {/* Help */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm">
                  Need help? Contact our support team
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default IsUserBlocked;
