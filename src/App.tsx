import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import HodDashboard from "./pages/HodDashboard";
import WardenDashboard from "./pages/WardenDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ManageStudents from "./pages/ManageStudents"; // New import
import ManageHODs from "./pages/ManageHODs";         // New import
import ManageTutors from "./pages/ManageTutors";     // New import
import ManageWardens from "./pages/ManageWardens";   // New import
import PendingRequest from "./pages/PendingRequest"; // New import
import RequestHistory from "./pages/RequestHistory"; // New import
import Profile from "./pages/Profile";               // New import
import Hostellers from "./pages/Hostellers";         // New import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/tutor-dashboard" element={<TutorDashboard />} />
          <Route path="/hod-dashboard" element={<HodDashboard />} />
          <Route path="/warden-dashboard" element={<WardenDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/manage-students" element={<ManageStudents />} />     {/* New route */}
          <Route path="/manage-hods" element={<ManageHODs />} />             {/* New route */}
          <Route path="/manage-tutors" element={<ManageTutors />} />         {/* New route */}
          <Route path="/manage-wardens" element={<ManageWardens />} />       {/* New route */}
          <Route path="/pending-request" element={<PendingRequest />} />     {/* New route */}
          <Route path="/request-history" element={<RequestHistory />} />     {/* New route */}
          <Route path="/profile" element={<Profile />} />                   {/* New route */}
          <Route path="/hostellers" element={<Hostellers />} />             {/* New route */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;