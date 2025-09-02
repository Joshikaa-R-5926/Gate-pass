import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldCheck, Smartphone, BarChart, Zap, Mail, Phone, MapPin } from "lucide-react";

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
      icon: <ShieldCheck className="h-8 w-8 text-green-500" />,
      title: "Secure",
      description: "Multi-level approvals and digital records keep your information safe.",
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Fast",
      description: "Request and receive gate pass approvals in just a few taps.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-orange-500" />,
      title: "Dashboard",
      description: "Track your request status and view your gate pass history anytime.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-purple-500" />,
      title: "Mobile Friendly",
      description: "Works perfectly on your phone, tablet, or computer.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-lg">Hostel GatePass</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#home" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Home</a>
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
            <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">About</a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="relative py-20 md:py-32">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:via-indigo-900 dark:to-purple-900 animate-gradient-xy"></div>
          <motion.div
            className="container grid lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-center lg:text-left">
              <motion.h1
                className="text-4xl font-extrabold tracking-tight lg:text-6xl text-gray-900 dark:text-gray-100"
                variants={itemVariants}
              >
                Effortless Hostel Gate Pass Management
              </motion.h1>
              <motion.p
                className="mt-6 max-w-2xl mx-auto lg:mx-0 text-lg text-gray-600 dark:text-gray-400"
                variants={itemVariants}
              >
                Your simple, secure way to request and manage hostel gate passes. Get approved in minutes and enjoy your time out.
              </motion.p>
              <motion.div className="mt-8 flex justify-center lg:justify-start gap-4" variants={itemVariants}>
                <Link to="/login">
                  <Button size="lg" className="text-lg px-8 py-6 hover:scale-105 transition-transform">Go to Portal</Button>
                </Link>
              </motion.div>
            </div>
            <motion.div variants={itemVariants} className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Happy students" 
                className="rounded-xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </section>

        <section id="features" className="py-20 md:py-28 bg-white dark:bg-gray-950">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">A Smarter Way to Manage Gate Passes</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Designed for convenience and security.
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
                  className="p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg shadow-sm text-center transition-transform transform hover:-translate-y-2"
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

        <section id="about" className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Students collaborating" 
                className="rounded-xl shadow-lg"
              />
            </motion.div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Modernizing Campus Life</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Hostel GatePass replaces outdated paper-based systems with a streamlined digital solution. Our platform offers a secure and easy-to-use experience for everyone: students can request passes effortlessly, wardens can approve them on the go, and institutions gain better oversight.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 md:py-28 bg-white dark:bg-gray-950">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get In Touch</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                We'd love to hear from you. Contact us for any inquiries.
              </p>
            </div>
            <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-3 text-center">
                <div className="flex flex-col items-center">
                    <Mail className="h-8 w-8 mb-2 text-blue-500"/>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">support@hostelgatepass.com</p>
                </div>
                <div className="flex flex-col items-center">
                    <Phone className="h-8 w-8 mb-2 text-blue-500"/>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-400">+1 (234) 567-890</p>
                </div>
                <div className="flex flex-col items-center">
                    <MapPin className="h-8 w-8 mb-2 text-blue-500"/>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-600 dark:text-gray-400">123 Tech Avenue, Silicon Valley</p>
                </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white dark:bg-gray-950">
        <div className="container py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Hostel GatePass. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:underline">Privacy</a>
            <a href="#contact" className="text-gray-600 dark:text-gray-400 hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;