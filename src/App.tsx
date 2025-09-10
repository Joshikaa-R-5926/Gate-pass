import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import HodDashboard from "./pages/HodDashboard";
import WardenDashboard from "./pages/WardenDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ManageStudents from "./pages/ManageStudents";
import ManageHODs from "./pages/ManageHODs";
import ManageTutors from "./pages/ManageTutors";
import ManageWardens from "./pages/ManageWardens";
import PendingRequest from "./pages/PendingRequest";
import RequestHistory from "./pages/RequestHistory";
import Profile from "./pages/Profile";
import Hostellers from "./pages/Hostellers";
import Dashboards from "./pages/Dashboards";
import DashboardRoutes from "./components/DashboardRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboards" element={<Dashboards />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Dashboard Routes */}
          <Route element={<DashboardRoutes />}>
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/tutor-dashboard" element={<TutorDashboard />} />
            <Route path="/hod-dashboard" element={<HodDashboard />} />
            <Route path="/warden-dashboard" element={<WardenDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/manage-students" element={<ManageStudents />} />
            <Route path="/manage-hods" element={<ManageHODs />} />
            <Route path="/manage-tutors" element={<ManageTutors />} />
            <Route path="/manage-wardens" element={<ManageWardens />} />
            <Route path="/pending-request" element={<PendingRequest />} />
            <Route path="/request-history" element={<RequestHistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/hostellers" element={<Hostellers />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;