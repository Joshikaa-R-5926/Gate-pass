import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldCheck, Smartphone, BarChart, Zap } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Streamlined Requests",
      description: "Students can request gate passes in seconds through an intuitive interface.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-green-500" />,
      title: "Secure Approvals",
      description: "Multi-level approval workflow for wardens, tutors, and HODs ensures security.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-purple-500" />,
      title: "Mobile Friendly",
      description: "Access and manage gate passes on the go from any device.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-orange-500" />,
      title: "Insightful Analytics",
      description: "Admins get a comprehensive overview with detailed reports and dashboards.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-lg">GatePass Pro</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/dashboards">
              <Button variant="outline">View Dashboards</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative py-20 md:py-32">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:via-indigo-900 dark:to-purple-900 animate-gradient-xy"></div>
          <motion.div
            className="container text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl font-extrabold tracking-tight lg:text-6xl text-gray-900 dark:text-gray-100"
              variants={itemVariants}
            >
              Effortless Gate Pass Management
            </motion.h1>
            <motion.p
              className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400"
              variants={itemVariants}
            >
              A seamless, secure, and efficient solution for managing student gate passes. Empowering institutions with modern technology.
            </motion.p>
            <motion.div className="mt-8 flex justify-center gap-4" variants={itemVariants}>
              <Link to="/login">
                <Button size="lg" className="text-lg px-8 py-6">Get Started</Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <section id="features" className="py-20 md:py-28 bg-white dark:bg-gray-950">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose GatePass Pro?</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Everything you need for a modern gate pass system.
              </p>
            </div>
            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg shadow-sm text-center"
                  variants={itemVariants}
                >
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} GatePass Pro. All rights reserved.</p>
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Index;