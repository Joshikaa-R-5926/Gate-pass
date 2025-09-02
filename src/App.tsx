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
import ManageStudentsPage from "./pages/ManageStudentsPage";
import ManageHodsPage from "./pages/ManageHodsPage";
import ManageTutorsPage from "./pages/ManageTutorsPage";
import ManageWardensPage from "./pages/ManageWardensPage";
import PendingRequestsPage from "./pages/PendingRequestsPage";
import RequestHistoryPage from "./pages/RequestHistoryPage";
import ProfilePage from "./pages/ProfilePage";
import HostellersPage from "./pages/HostellersPage";

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
          <Route path="/manage-students" element={<ManageStudentsPage />} />
          <Route path="/manage-hods" element={<ManageHodsPage />} />
          <Route path="/manage-tutors" element={<ManageTutorsPage />} />
          <Route path="/manage-wardens" element={<ManageWardensPage />} />
          <Route path="/pending-requests" element={<PendingRequestsPage />} />
          <Route path="/request-history" element={<RequestHistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/hostellers" element={<HostellersPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;