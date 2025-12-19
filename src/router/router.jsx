import { createBrowserRouter } from "react-router";
import Home from "../pages/Root/home/Home";
import AllIssues from "../pages/Root/allIssues/AllIssues";
import About from "../pages/Root/about/About";
import MyIssues from "../pages/Root/myIssues/MyIssues";
import MyFavorites from "../pages/Root/myFavorites/MyFavorites";
import SingUp from "../pages/Auth/singUp/SingUp";
import PrivetRoute from "./PrivetRoute";
import AddIssues from "../pages/Root/addIssues/AddIssues";
import Profile from "../pages/Dashbord/profile/Profile";
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";
import Login from "../pages/Auth/login/Login";
import PaymentLayout from "../layout/PaymentLayout";
import Success from "../pages/Payment/Success/Success";
import Failed from "../pages/Payment/failed/Failed";
import TotalPayments from "../pages/Dashbord/totalPayments/TotalPayments";
import TotalInProgressIssues from "../pages/Dashbord/totalInProgressIssues/TotalInProgressIssues";
import TotalPendingIssues from "../pages/Dashbord/totalPendingIssues/TotalPendingIssues";
import TotalResolvedIssues from "../pages/Dashbord/totalResolvedIssues/TotalResolvedIssues";
import IssueDetails from "../components/IssueDetails";
import TotalUser from "../pages/Dashbord/totalUaser/TotalUser";
import ManageStaff from "../pages/Dashbord/manageStaff/ManageStaff";
import TotalStaffResolvedIssues from "../pages/Dashbord/totalStaffResolvedIssues/TotalStaffResolvedIssues";
import TotalStaffAssignedIssues from "../pages/Dashbord/totalStaffAssignedIssues/TotalStaffAssignedIssues";
import StaffTodayTask from "../pages/Dashbord/staffTodayTask/StaffTodayTask";
import TotalStaffClosedIssues from "../pages/Dashbord/totalStaffClosedIssues/totalStaffClosedIssues";
import AssignedIssues from "../pages/Dashbord/assignedIssues/AssignedIssues";
import DashboardOverview from "../pages/Dashbord/Dashboard Overview/DashboardOverview";
import IsUserBlocked from "../components/IsUserBlocked";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "all_issues",
        Component: AllIssues,
      },
      {
        path: "issue_details",
        element: (
          <PrivetRoute>
            <IssueDetails></IssueDetails>
          </PrivetRoute>
        ),
      },
      {
        path: "my_issues",
        element: (
          <PrivetRoute>
            <MyIssues></MyIssues>
          </PrivetRoute>
        ),
      },
      {
        path: "my_favorites",
        element: (
          <PrivetRoute>
            <MyFavorites></MyFavorites>
          </PrivetRoute>
        ),
      },
      {
        path: "add_issues",
        element: (
          <PrivetRoute>
            <IsUserBlocked>
              <AddIssues></AddIssues>
            </IsUserBlocked>
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "/user/",
    Component: AuthLayout,
    children: [
      {
        path: "sing_up",
        Component: SingUp,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <DashboardLayout></DashboardLayout>
      </PrivetRoute>
    ),
    children: [
      {
        index: true,
        Component: Profile,
      },
      {
        path: "dashboard_overview",
        Component: DashboardOverview,
      },
      {
        path: "total_payment",
        Component: TotalPayments,
      },
      {
        path: "total_in_progress_issues",
        Component: TotalInProgressIssues,
      },
      {
        path: "total_pending_issues",
        Component: TotalPendingIssues,
      },
      {
        path: "total_resolved_issues",
        Component: TotalResolvedIssues,
      },
      {
        path: "total_user",
        Component: TotalUser,
      },
      {
        path: "manage_staff",
        Component: ManageStaff,
      },
      {
        path: "total_staff_resolved_issues",
        Component: TotalStaffResolvedIssues,
      },
      {
        path: "total_staff_assigned_issues",
        Component: TotalStaffAssignedIssues,
      },
      {
        path: "staff_today_task",
        Component: StaffTodayTask,
      },
      {
        path: "total_staff_closed_issues",
        Component: TotalStaffClosedIssues,
      },
      {
        path: "assigned_issues_page",
        Component: AssignedIssues,
      },
    ],
  },
  {
    path: "/payment",
    element: (
      <PrivetRoute>
        <PaymentLayout></PaymentLayout>
      </PrivetRoute>
    ),
    children: [
      {
        path: "success",
        Component: Success,
      },
      {
        path: "failed",
        Component: Failed,
      },
    ],
  },
  {
    path: "/isuser_is_blocked",
    Component: IsUserBlocked,
  },
]);
