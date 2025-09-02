import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldCheck, Smartphone, BarChart, Zap, Mail, Phone, MapPin, Building, Users } from "lucide-react";

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
      description: "Multi-level approval workflow ensures maximum security and accountability.",
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Fast",
      description: "Students can request gate passes in seconds through an intuitive, streamlined interface.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-orange-500" />,
      title: "Dashboard",
      description: "Admins get a comprehensive overview with detailed reports and analytics.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-purple-500" />,
      title: "Mobile Friendly",
      description: "Access and manage gate passes on the go from any device, anytime.",
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
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="relative py-20 md:py-32">
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
                <Button size="lg" className="text-lg px-8 py-6 hover:scale-105 transition-transform">Get Started</Button>
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
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About GatePass Pro</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                GatePass Pro was born from the need to modernize and simplify the process of managing student movements in educational institutions. Our mission is to provide a secure, efficient, and user-friendly platform for students, staff, and administration.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Building className="h-8 w-8 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">For Institutions</h3>
                    <p className="text-gray-600 dark:text-gray-400">Enhance campus security, reduce administrative overhead, and gain valuable insights into student traffic with our powerful dashboard and reporting tools.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="h-8 w-8 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">For Students</h3>
                    <p className="text-gray-600 dark:text-gray-400">Enjoy a hassle-free experience with quick gate pass requests, real-time status updates, and a digital record of your entries and exits, all from your smartphone.</p>
                  </div>
                </div>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1607237138185-e894ee31b3c7?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Modern university campus" className="rounded-lg shadow-lg object-cover h-full w-full" />
              </div>
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
                    <p className="text-gray-600 dark:text-gray-400">support@gatepasspro.com</p>
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
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} GatePass Pro. All rights reserved.</p>
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