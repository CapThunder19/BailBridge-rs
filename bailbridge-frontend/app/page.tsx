'use client';

import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Shield, Zap, Code, ArrowRight, Lock, Github } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Lock,
    title: 'Secure',
    description: 'Argon2 password hashing and JWT authentication',
    color: 'text-[#25343F] dark:text-[#FF9B51]',
  },
  {
    icon: Zap,
    title: 'Fast',
    description: 'Built with Rust for blazing-fast performance',
    color: 'text-[#FF9B51] dark:text-[#FFB173]',
  },
  {
    icon: Code,
    title: 'Modern',
    description: 'Next.js 15 with TypeScript and Tailwind CSS',
    color: 'text-[#BFC9D1] dark:text-[#D4DDE3]',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#EAEFEF] to-[#D6DDDF] dark:from-[#25343F] dark:to-[#2E3F4D] transition-colors duration-200">
      <ThemeToggle />
      
      <div className="text-center space-y-8 p-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-[#25343F] dark:text-white mb-4">
            Welcome to{' '}
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-[#25343F] to-[#FF9B51] dark:from-[#FF9B51] dark:to-[#FFB173]">
              BailBridge
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#6B7985] dark:text-gray-300 max-w-2xl mx-auto">
            A secure authentication platform built with{' '}
            <span className="font-semibold text-[#25343F] dark:text-[#FF9B51]">Rust</span> and{' '}
            <span className="font-semibold text-[#25343F] dark:text-[#FF9B51]">Next.js</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <Link href="/signup">
            <Button size="lg" className="text-lg px-12 py-6 shadow-lg hover:shadow-xl transition-all">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <div className="flex gap-4">
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Login
              </Button>
            </Link>
            
            <Link href="/signup">
              <Button size="lg" variant="ghost" className="text-lg px-8 py-6">
                Sign Up
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                  <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <Shield className="h-4 w-4" />
          <span>Enterprise-grade security with role-based access control</span>
        </motion.div>
      </div>
    </div>
  );
}
