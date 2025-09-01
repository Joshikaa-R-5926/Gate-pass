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
// Import new admin pages
import GenericDashboard from "./pages/admin/GenericDashboard";
import PendingRequests from "./pages/admin/PendingRequests";
import RequestHistory from "./pages/admin/RequestHistory";
import Profile from "./pages/admin/Profile";

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
          {/* Add new admin routes */}
          <Route path="/admin-dashboard/dashboard" element={<GenericDashboard />} />
          <Route path="/admin-dashboard/pending" element={<PendingRequests />} />
          <Route path="/admin-dashboard/history" element={<RequestHistory />} />
          <Route path="/admin-dashboard/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;