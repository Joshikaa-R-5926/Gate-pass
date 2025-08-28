import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"; // Import motion from framer-motion

const Index = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity,
      },
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden p-4">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:via-indigo-900 dark:to-purple-900 animate-gradient-xy"></div>

      <motion.div
        className="text-center mb-8 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100 md:text-5xl lg:text-6xl"
          variants={itemVariants}
        >
          Welcome to Your Dyad App
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 dark:text-gray-400 md:text-2xl lg:text-3xl max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Start building your amazing project here! Explore the different dashboards.
        </motion.p>
        <motion.div
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto" // Changed to responsive grid
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} whileHover="hover">
            <Link to="/login">
              <Button className="w-full px-6 py-3 text-lg">Go to Login Page</Button>
            </Link>
          </motion.div>
          <motion.div variants={itemVariants} whileHover="hover">
            <Link to="/student-dashboard">
              <Button variant="outline" className="w-full px-6 py-3 text-lg">Go to Student Dashboard</Button>
            </Link>
          </motion.div>
          <motion.div variants={itemVariants} whileHover="hover">
            <Link to="/tutor-dashboard">
              <Button variant="outline" className="w-full px-6 py-3 text-lg">Go to Tutor Dashboard</Button>
            </Link>
          </motion.div>
          <motion.div variants={itemVariants} whileHover="hover">
            <Link to="/hod-dashboard">
              <Button variant="outline" className="w-full px-6 py-3 text-lg">Go to HOD Dashboard</Button>
            </Link>
          </motion.div>
          <motion.div variants={itemVariants} whileHover="hover">
            <Link to="/warden-dashboard">
              <Button variant="outline" className="w-full px-6 py-3 text-lg">Go to Warden Dashboard</Button>
            </Link>
          </motion.div>
          <motion.div variants={itemVariants} whileHover="hover">
            <Link to="/admin-dashboard">
              <Button variant="outline" className="w-full px-6 py-3 text-lg">Go to Admin Dashboard</Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;