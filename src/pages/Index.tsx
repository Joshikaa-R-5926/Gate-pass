import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"; // Import motion from framer-motion

const Index = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <motion.div
        className="text-center mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100"
          variants={itemVariants}
        >
          Welcome to Your Blank App
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 dark:text-gray-400"
          variants={itemVariants}
        >
          Start building your amazing project here!
        </motion.p>
        <motion.div
          className="mt-6 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 flex-wrap justify-center"
          variants={itemVariants}
        >
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
        </motion.div>
      </motion.div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;