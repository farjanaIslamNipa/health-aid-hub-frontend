import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import App from "../App";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AllSupplies from "../pages/supplies/AllSupplies";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/layouts/ProtectedRoute";
import SupplyView from "../pages/supplies/SupplyView";
import SupplyList from "../pages/dashboard/supply/SupplyList";
import CreateSupply from "../pages/dashboard/supply/CreateSupply";
import DonatePage from "../pages/donation/DonatePage";
import DonorLeaderBoard from "../pages/donation/DonorLeaderBoard";
import Community from "../pages/community/Community";
import CreateTestimonial from "../pages/dashboard/testimonials/CreateTestimonial";
import AboutUs from "../pages/AboutUs";
import VolunteerSignUp from "../pages/volunteer/VolunteerSignUp";
import TermsAndConditions from "../pages/TermsAndConditions";
import PrivacyPolicy from "../pages/PrivacyPolicy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "supplies",
        element: <AllSupplies />,
      },
      {
        path: "supplies/:id",
        element: <SupplyView />,
      },
      {
        path: "/donate",
        element: <ProtectedRoute>
          <DonatePage />
        </ProtectedRoute>,
      },
      {
        path: "/leaderboard",
        element: <DonorLeaderBoard />,
      },
      {
        path: "/community",
        element: <Community />,
      },
      {
        path: "/volunteer",
        element: <VolunteerSignUp />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "supplies",
        element: <SupplyList />,
      },
      {
        path: "create-supply",
        element: <CreateSupply />,
      },
      {
        path: "create-testimonial",
        element: <CreateTestimonial />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
