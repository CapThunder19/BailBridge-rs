'use client';

import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Shield, Zap, Code, ArrowRight, Lock, Scale, Gavel, Users, FileText, Clock, TrendingUp, CheckCircle, Brain, LineChart, Briefcase, UserCheck } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with Argon2 encryption and JWT authentication',
    color: 'from-[#10B981] to-[#059669]',
  },
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Smart bail eligibility assessment using advanced AI algorithms',
    color: 'from-[#4F46E5] to-[#7C3AED]',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built with Rust backend for blazing-fast performance and reliability',
    color: 'from-[#F59E0B] to-[#FF9B51]',
  },
  {
    icon: Users,
    title: 'Multi-Role Access',
    description: 'Separate dashboards for judges, lawyers, and applicants',
    color: 'from-[#3B82F6] to-[#2563EB]',
  },
  {
    icon: FileText,
    title: 'Digital Documentation',
    description: 'Paperless bail application process with secure document management',
    color: 'from-[#EC4899] to-[#DB2777]',
  },
  {
    icon: LineChart,
    title: 'Real-Time Analytics',
    description: 'Comprehensive insights and statistics for better decision making',
    color: 'from-[#14B8A6] to-[#0D9488]',
  },
];

const stats = [
  { number: '10K+', label: 'Applications Processed', icon: FileText },
  { number: '500+', label: 'Active Legal Professionals', icon: Briefcase },
  { number: '95%', label: 'User Satisfaction', icon: TrendingUp },
  { number: '24/7', label: 'System Availability', icon: Clock },
];

const howItWorks = [
  {
    step: '1',
    title: 'Register & Login',
    description: 'Create your account as a user, lawyer, or judicial officer',
    icon: UserCheck,
  },
  {
    step: '2',
    title: 'Submit Application',
    description: 'Fill out the bail application form with required details',
    icon: FileText,
  },
  {
    step: '3',
    title: 'AI Assessment',
    description: 'Get instant AI-powered eligibility analysis and recommendations',
    icon: Brain,
  },
  {
    step: '4',
    title: 'Review & Decision',
    description: 'Judicial review and final decision on bail application',
    icon: Gavel,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAEFEF] to-[#D6DDDF] dark:from-[#25343F] dark:to-[#2E3F4D] transition-colors duration-200 relative overflow-hidden">
      <ThemeToggle />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Scales of Justice */}
        <motion.div
          className="absolute top-20 left-10 text-[#FF9B51] opacity-10 dark:opacity-20"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Scale className="h-32 w-32" />
        </motion.div>

        <motion.div
          className="absolute top-1/3 right-20 text-[#4F46E5] opacity-10 dark:opacity-20"
          animate={{
            y: [0, 40, 0],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Scale className="h-24 w-24" />
        </motion.div>

        {/* Floating Gavels */}
        <motion.div
          className="absolute bottom-1/4 left-1/4 text-[#FF9B51] opacity-10 dark:opacity-20"
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
            rotate: [0, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <Gavel className="h-28 w-28" />
        </motion.div>

        <motion.div
          className="absolute top-2/3 right-1/3 text-[#3B82F6] opacity-10 dark:opacity-20"
          animate={{
            y: [0, 35, 0],
            x: [0, -15, 0],
            rotate: [0, -25, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <Gavel className="h-20 w-20" />
        </motion.div>

        {/* Floating Documents */}
        <motion.div
          className="absolute top-40 right-1/4 text-[#10B981] opacity-10 dark:opacity-20"
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <FileText className="h-24 w-24" />
        </motion.div>

        <motion.div
          className="absolute bottom-40 left-1/3 text-[#F59E0B] opacity-10 dark:opacity-20"
          animate={{
            y: [0, 30, 0],
            x: [0, -10, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
        >
          <FileText className="h-28 w-28" />
        </motion.div>

        {/* Additional Legal Symbols */}
        <motion.div
          className="absolute bottom-20 right-10 text-[#8B5CF6] opacity-10 dark:opacity-20"
          animate={{
            y: [0, -35, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        >
          <Shield className="h-32 w-32" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-16 text-[#EC4899] opacity-10 dark:opacity-20"
          animate={{
            y: [0, 25, 0],
            x: [0, 12, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 9.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8
          }}
        >
          <Briefcase className="h-26 w-26" />
        </motion.div>

        {/* Animated Circles */}
        <motion.div
          className="absolute top-10 right-40 w-64 h-64 rounded-full bg-gradient-to-br from-[#FF9B51]/10 to-[#F59E0B]/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-20 left-40 w-80 h-80 rounded-full bg-gradient-to-br from-[#4F46E5]/10 to-[#7C3AED]/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <motion.div
          className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-[#10B981]/10 to-[#059669]/5 blur-3xl"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <div className="inline-block mb-4">
              <div className="flex items-center gap-3 bg-white/80 dark:bg-[#1a2634]/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <Scale className="h-6 w-6 text-[#FF9B51]" />
                <span className="text-sm font-semibold text-[#25343F] dark:text-white">
                  Justice Made Accessible
                </span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-[#25343F] dark:text-white leading-tight">
              Welcome to{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF9B51] to-[#F59E0B]">
                BailBridge
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#6B7985] dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Streamlining the bail application process with AI-powered analysis, secure digital workflows, and real-time tracking
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-[#FF9B51] to-[#F59E0B] hover:from-[#FF8A3D] hover:to-[#E68E00] shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 border-[#FF9B51] text-[#FF9B51] hover:bg-[#FF9B51] hover:text-white transition-all">
                  Login
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-8"
            >
              <Shield className="h-4 w-4 text-[#10B981]" />
              <span>Trusted by legal professionals nationwide • Secure & Compliant</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white/50 dark:bg-[#1a2634]/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9B51] to-[#F59E0B] mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#25343F] dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#25343F] dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need for efficient bail application management
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#FF9B51] bg-white dark:bg-[#2A3F52]">
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 shadow-lg`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-[#25343F] dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white/50 dark:bg-[#1a2634]/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#25343F] dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Simple, efficient process from application to decision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Connecting Line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#FF9B51] to-transparent -translate-x-4"></div>
                )}
                
                <Card className="text-center h-full bg-white dark:bg-[#2A3F52] shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className="relative inline-block mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF9B51] to-[#F59E0B] flex items-center justify-center shadow-lg">
                        <step.icon className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#25343F] dark:bg-white flex items-center justify-center font-bold text-white dark:text-[#25343F] text-sm">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-[#25343F] dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#25343F] dark:text-white mb-6">
                Why Choose BailBridge?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Transform the bail application process with cutting-edge technology designed for justice and efficiency.
              </p>
              
              <div className="space-y-4">
                {[
                  'Reduce processing time by up to 70%',
                  'AI-powered eligibility assessment',
                  'Real-time application tracking',
                  'Secure document management',
                  'Role-based access control',
                  'Comprehensive analytics dashboard',
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Gavel, label: 'For Judges', color: 'from-[#4F46E5] to-[#7C3AED]' },
                { icon: Briefcase, label: 'For Lawyers', color: 'from-[#FF9B51] to-[#F59E0B]' },
                { icon: Users, label: 'For Applicants', color: 'from-[#3B82F6] to-[#2563EB]' },
                { icon: Shield, label: 'Secure & Compliant', color: 'from-[#10B981] to-[#059669]' },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="text-center p-6 bg-white dark:bg-[#2A3F52] hover:shadow-xl transition-all"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} mb-4 shadow-lg`}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <p className="font-semibold text-[#25343F] dark:text-white">{item.label}</p>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#25343F] to-[#2E3F4D] dark:from-[#1a2634] dark:to-[#25343F] relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of legal professionals already using BailBridge to streamline their workflow
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-[#FF9B51] to-[#F59E0B] hover:from-[#FF8A3D] hover:to-[#E68E00] shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  Create Account <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 border-white text-white hover:bg-white hover:text-[#25343F] transition-all">
                  Sign In
                </Button>
              </Link>
            </div>

            <p className="text-sm text-gray-400 pt-4">
              Built with <span className="text-[#FF9B51]">Rust</span> and <span className="text-[#FF9B51]">Next.js</span> • Enterprise-grade security
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a2634] py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-[#FF9B51]" />
              <span className="text-white font-semibold text-lg">BailBridge</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2026 BailBridge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
