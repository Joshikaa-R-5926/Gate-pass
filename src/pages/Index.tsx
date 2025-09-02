import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldCheck, Smartphone, BarChart, Zap, Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="py-20 md:py-32 bg-gray-100 dark:bg-gray-900">
          <motion.div
            className="container grid lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-center lg:text-left">
              <motion.h1
                className="text-5xl font-extrabold tracking-tight lg:text-7xl text-gray-900 dark:text-gray-100"
                variants={itemVariants}
              >
                <span className="text-blue-600 dark:text-blue-500">
                  Effortless
                </span> Hostel Gate Pass Management
              </motion.h1>
              <motion.p
                className="mt-6 max-w-2xl mx-auto lg:mx-0 text-lg text-gray-700 dark:text-gray-300"
                variants={itemVariants}
              >
                Your simple, secure way to request and manage hostel gate passes. Get approved in minutes and enjoy your time out.
              </motion.p>
              <motion.div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4" variants={itemVariants}>
                <Link to="/login">
                  <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto hover:scale-105 transition-transform">Get Started</Button>
                </Link>
                <a href="#features">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto hover:scale-105 transition-transform bg-transparent">Learn More</Button>
                </a>
              </motion.div>
            </div>
            <motion.div variants={itemVariants} className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format=fit&crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="University campus with students" 
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
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
                  className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm text-center transition-transform transform hover:-translate-y-2"
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

        <section id="about" className="py-20 md:py-28 bg-gray-100 dark:bg-gray-900">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format=fit&crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
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
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Let's Connect
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                Have questions or need support? We're here to help. Reach out to us through any of the channels below.
              </p>
            </div>
            <motion.div
              className="max-w-4xl mx-auto grid gap-8 md:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={itemVariants}>
                <Card className="text-center h-full transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-gray-900">
                  <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                      <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-xl font-semibold">Email Us</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Send your questions to our support team.
                    </p>
                    <a href="mailto:support@hostelgatepass.com" className="mt-4 inline-block text-blue-600 dark:text-blue-400 font-medium hover:underline">
                      support@hostelgatepass.com
                    </a>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="text-center h-full transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-gray-900">
                  <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                      <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-xl font-semibold">Call Us</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Talk to our team for immediate assistance.
                    </p>
                    <a href="tel:+1234567890" className="mt-4 inline-block text-green-600 dark:text-green-400 font-medium hover:underline">
                      +1 (234) 567-890
                    </a>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="text-center h-full transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-gray-900">
                  <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50">
                      <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-xl font-semibold">Visit Us</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Find us at our main office location.
                    </p>
                    <p className="mt-4 text-gray-800 dark:text-gray-200 font-medium">
                      123 Tech Avenue, Silicon Valley
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
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