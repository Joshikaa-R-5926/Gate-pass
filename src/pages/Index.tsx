import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Welcome to Your Blank App</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Start building your amazing project here!
        </p>
        <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 flex-wrap justify-center">
          <Link to="/login">
            <Button>Go to Login Page</Button>
          </Link>
          <Link to="/student-dashboard">
            <Button variant="outline">Go to Student Dashboard</Button>
          </Link>
          <Link to="/tutor-dashboard">
            <Button variant="outline">Go to Tutor Dashboard</Button>
          </Link>
          <Link to="/hod-dashboard">
            <Button variant="outline">Go to HOD Dashboard</Button>
          </Link>
          <Link to="/warden-dashboard">
            <Button variant="outline">Go to Warden Dashboard</Button>
          </Link>
          <Link to="/admin-dashboard">
            <Button variant="outline">Go to Admin Dashboard</Button>
          </Link>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;