import useAuth from "../../../hooks/useAuth";
import useAxiousInstance from "../../../hooks/useAxiousInstance";
import { useQuery } from "@tanstack/react-query";
import { FileText } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StaffTodayTask from "../staffTodayTask/StaffTodayTask";
import TotalStaffAssignedIssues from "../totalStaffAssignedIssues/TotalStaffAssignedIssues";
import TotalStaffResolvedIssues from "../totalStaffResolvedIssues/TotalStaffResolvedIssues";
import TotalStaffClosedIssues from "../totalStaffClosedIssues/totalStaffClosedIssues";
import TotalPendingIssues from "../totalPendingIssues/TotalPendingIssues";
import TotalInProgressIssues from "../totalInProgressIssues/TotalInProgressIssues";
import TotalResolvedIssues from "../totalResolvedIssues/TotalResolvedIssues";
import TotalPayments from "../totalPayments/TotalPayments";

const DashboardOverview = () => {
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

  const { data: isStaff } = useQuery({
    queryKey: ["is_staff", user?.uid],
    queryFn: async () => {
      const res = await axiousInsrance.get(`/user?email=${user.email}`);
      return res.data.result.role === "staff";
    },
  });

  const { data: issues = [] } = useQuery({
    queryKey: ["my-issues", user.uid],
    enabled: !!user?.uid && isAdmin !== undefined && isStaff !== undefined,
    queryFn: async () => {
      if (isAdmin) {
        const res = await axiousInsrance.get(`/issues`); // id = 3
        return res.data;
      } else if (isStaff) {
        const res = await axiousInsrance.get(`/issues?staffUid=${user?.uid}`);
        return res.data;
      } else {
        const res = await axiousInsrance.get(`/issues?firebaseId=${user?.uid}`); // id = 8
        return res.data;
      }
    },
  });

  const { data: pendingIssues = [] } = useQuery({
    queryKey: ["my-pending-issues", user.uid],
    enabled: !!user?.uid && isAdmin !== undefined && isStaff !== undefined,
    queryFn: async () => {
      if (isAdmin) {
        const res = await axiousInsrance.get(`/issues`); // id = 3
        const Issues = res.data;
        const FilrerdPandingIssues = Issues.filter(
          (data) => data.status === "pending"
        );
        if (FilrerdPandingIssues) {
          return FilrerdPandingIssues;
        }
      } else if (isStaff) {
        const res = await axiousInsrance.get(`/issues?staffUid=${user?.uid}`); // id = 2
        const Issues = res.data;
        const FilrerdPandingIssues = Issues.filter(
          (data) => data.status === "pending"
        );
        if (FilrerdPandingIssues) {
          return FilrerdPandingIssues;
        }
      } else {
        const res = await axiousInsrance.get(`/issues?firebaseId=${user?.uid}`); // id = 2
        const Issues = res.data;
        const FilrerdPandingIssues = Issues.filter(
          (data) => data.status === "pending"
        );
        if (FilrerdPandingIssues) {
          return FilrerdPandingIssues;
        }
      }
    },
  });

  const { data: inProgressIssues = [] } = useQuery({
    queryKey: ["my-inProgress-issues", user.uid],
    enabled: !!user?.uid && isAdmin !== undefined && isStaff !== undefined,
    queryFn: async () => {
      if (isAdmin) {
        const res = await axiousInsrance.get(`/issues`); // id = 3
        const Issues = res.data;
        const FilrerdInProgressIssues = Issues.filter(
          (data) => data.status === "in-progress"
        );
        if (FilrerdInProgressIssues) {
          return FilrerdInProgressIssues;
        }
      } else if (isStaff) {
        const res = await axiousInsrance.get(`/issues?staffUid=${user?.uid}`); // id = 2
        const Issues = res.data;
        const FilrerdInProgressIssues = Issues.filter(
          (data) => data.status === "in-progress"
        );
        if (FilrerdInProgressIssues) {
          return FilrerdInProgressIssues;
        }
      } else {
        const res = await axiousInsrance.get(`/issues?firebaseId=${user?.uid}`); // id = 2
        const Issues = res.data;
        const FilrerdInProgressIssues = Issues.filter(
          (data) => data.status === "in-progress"
        );
        if (FilrerdInProgressIssues) {
          return FilrerdInProgressIssues;
        }
      }
    },
  });

  const { data: resolvedIssues = [] } = useQuery({
    queryKey: ["my-resolved-issues", user.uid],
    enabled: !!user?.uid && isAdmin !== undefined && isStaff !== undefined,
    queryFn: async () => {
      if (isAdmin) {
        const res = await axiousInsrance.get(`/issues`); // id = 3
        const Issues = res.data;
        const FilrerdPandingIssues = Issues.filter(
          (data) => data.status === "resolved"
        );
        if (FilrerdPandingIssues) {
          return FilrerdPandingIssues;
        }
      } else if (isStaff) {
        const res = await axiousInsrance.get(`/issues?staffUid=${user?.uid}`); // id = 2
        const Issues = res.data;
        const FilrerdPandingIssues = Issues.filter(
          (data) => data.status === "resolved"
        );
        if (FilrerdPandingIssues) {
          return FilrerdPandingIssues;
        }
      } else {
        const res = await axiousInsrance.get(`/issues?firebaseId=${user?.uid}`); // id = 2
        const Issues = res.data;
        const FilrerdPandingIssues = Issues.filter(
          (data) => data.status === "resolved"
        );
        if (FilrerdPandingIssues) {
          return FilrerdPandingIssues;
        }
      }
    },
  });

  const { data: closedIssues = [] } = useQuery({
    queryKey: ["my-closed-issues", user.uid],
    enabled: !!user?.uid && isAdmin !== undefined && isStaff !== undefined,
    queryFn: async () => {
      if (isAdmin) {
        const res = await axiousInsrance.get(`/issues`); // id = 3
        const Issues = res.data;
        const FilrerdInProgressIssues = Issues.filter(
          (data) => data.status === "closed"
        );
        if (FilrerdInProgressIssues) {
          return FilrerdInProgressIssues;
        }
      } else if (isStaff) {
        const res = await axiousInsrance.get(`/issues?staffUid=${user?.uid}`); // id = 2
        const Issues = res.data;
        const FilrerdInProgressIssues = Issues.filter(
          (data) => data.status === "closed"
        );
        if (FilrerdInProgressIssues) {
          return FilrerdInProgressIssues;
        }
      } else {
        const res = await axiousInsrance.get(`/issues?firebaseId=${user?.uid}`); // id = 2
        const Issues = res.data;
        const FilrerdInProgressIssues = Issues.filter(
          (data) => data.status === "closed"
        );
        if (FilrerdInProgressIssues) {
          return FilrerdInProgressIssues;
        }
      }
    },
  });

  const { data: workingIssues = [] } = useQuery({
    queryKey: ["my-working-issues", user.uid],
    enabled: !!user?.uid && isAdmin !== undefined && isStaff !== undefined,
    queryFn: async () => {
      if (isAdmin) {
        const res = await axiousInsrance.get(`/issues`); // id = 3
        const Issues = res.data;
        const FilrerdInProgressIssues = Issues.filter(
          (data) => data.status === "working"
        );
        if (FilrerdInProgressIssues) {
          return FilrerdInProgressIssues;
        }
      } else if (isStaff) {
        const res = await axiousInsrance.get(`/issues?staffUid=${user?.uid}`); // id = 2
        const Issues = res.data;
        const FilrerdInProgressIssues = Issues.filter(
          (data) => data.status === "working"
        );
        if (FilrerdInProgressIssues) {
          return FilrerdInProgressIssues;
        }
      } else {
        const res = await axiousInsrance.get(`/issues?firebaseId=${user?.uid}`); // id = 2
        const Issues = res.data;
        const FilrerdInProgressIssues = Issues.filter(
          (data) => data.status === "working"
        );
        if (FilrerdInProgressIssues) {
          return FilrerdInProgressIssues;
        }
      }
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

  const issueChartData = [
    {
      name: "Pending",
      value: pendingIssues.length,
    },
    {
      name: "In Progress",
      value: inProgressIssues.length,
    },
    {
      name: "Working",
      value: workingIssues.length,
    },
    {
      name: "Resolved",
      value: resolvedIssues.length,
    },
    {
      name: "Closed",
      value: closedIssues.length,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-5xl text-[#f22303]">Overview</div>
      <div className="w-200 bg-white rounded-2xl shadow-md p-6 ">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Reported Issues
          </h2>
          <FileText className="w-5 h-5 text-red-600" />
        </div>

        {/* Total Count */}
        <div className="text-center my-6">
          <p className="text-sm text-gray-500">Total Issues Submitted</p>
          <h1 className="text-5xl font-bold text-red-600 mt-2">
            {issues.length}
          </h1>
        </div>

        {/* Status Breakdown (UI only) */}
        <div className="grid grid-cols-5 gap-4 mt-6 text-center">
          <StatusItem label="Pending" value={pendingIssues.length} />
          <StatusItem label="In Progress" value={inProgressIssues.length} />
          <StatusItem label="Working" value={workingIssues.length} />
          <StatusItem label="Resolved" value={resolvedIssues.length} />
          <StatusItem label="Closed" value={closedIssues.length} />
        </div>
      </div>
      <div>
        <div></div>
        <div>
          <div className="h-100 my-10 bg-white p-5">
            <h3 className="text-center m-10 text-5xl text-[#f22303]">
              Issues Status Overview
            </h3>
            <ResponsiveContainer width="700" height="100%">
              <BarChart data={issueChartData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="mt-30 w-full">
        <div className="text-center m-10 text-5xl text-[#f22303]">
          all Issues
        </div>
        <div className="mx-20">
          <div className="bg-[#fee9e6] mx-auto my-10 radius_css p-10 w-full">
            <div className="overflow-x-auto w-full">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Category</th>
                    <th>State</th>
                    <th>priority</th>
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
                      <td>{issue.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        {isStaff ? (
          <>
            <div>
              <StaffTodayTask></StaffTodayTask>
            </div>
            <div>
              <TotalStaffAssignedIssues></TotalStaffAssignedIssues>
            </div>
            <div>
              <TotalStaffResolvedIssues></TotalStaffResolvedIssues>
            </div>
            <div>
              <TotalStaffClosedIssues></TotalStaffClosedIssues>
            </div>
          </>
        ) : (
          <>
            {isAdmin ? (
              <>
                <div>
                  <div>
                    <div className="text-center mt-10 text-5xl text-[#f22303]">
                      Total Panding Issues
                    </div>
                    <div>
                      <TotalPendingIssues></TotalPendingIssues>
                    </div>
                  </div>
                  <div>
                    <div className="text-center mt-10 text-5xl text-[#f22303]">
                      Total In Progress Issues
                    </div>
                    <div>
                      <TotalInProgressIssues></TotalInProgressIssues>
                    </div>
                  </div>
                  <div>
                    <div className="text-center mt-10 text-5xl text-[#f22303]">
                      Total Resolved Issues
                    </div>
                    <div>
                      <TotalResolvedIssues></TotalResolvedIssues>
                    </div>
                  </div>
                  <div>
                    <div className="text-center mt-10 text-5xl text-[#f22303]">
                      Total Payment Issues
                    </div>
                    <div>
                      <TotalPayments></TotalPayments>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div>
                    <div className="text-center mt-10 text-5xl text-[#f22303]">
                      Your Total Panding Issues
                    </div>
                    <div>
                      <TotalPendingIssues></TotalPendingIssues>
                    </div>
                  </div>
                  <div>
                    <div className="text-center mt-10 text-5xl text-[#f22303]">
                      Your Total In Progress Issues
                    </div>
                    <div>
                      <TotalInProgressIssues></TotalInProgressIssues>
                    </div>
                  </div>
                  <div>
                    <div className="text-center mt-10 text-5xl text-[#f22303]">
                      Your Total Resolved Issues
                    </div>
                    <div>
                      <TotalResolvedIssues></TotalResolvedIssues>
                    </div>
                  </div>
                  <div>
                    <div className="text-center mt-10 text-5xl text-[#f22303]">
                      Your Total Payment Issues
                    </div>
                    <div>
                      <TotalPayments></TotalPayments>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;

const StatusItem = ({ label, value }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  );
};
