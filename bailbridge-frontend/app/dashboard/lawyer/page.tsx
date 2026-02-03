'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import { Briefcase, FileText, Users, LogOut, Bell, Settings, Scale, UserCircle2, Mail, Shield } from 'lucide-react';

export default function LawyerDashboard() {
  const router = useRouter();
  const [username, setUsername] = useState<string>('Lawyer');
  const [email, setEmail] = useState<string>('lawyer@example.com');
  const [role, setRole] = useState<string>('lawyer');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    
    if (!token) {
      router.push('/login');
      return;
    }
    
    if (storedRole !== 'lawyer') {
      // Redirect to appropriate dashboard
      router.push(`/dashboard/${storedRole}`);
      return;
    }

    setRole(storedRole || 'lawyer');
    // TODO: Fetch actual user data from API using token
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAEFEF] to-[#D6DDDF] dark:from-[#25343F] dark:to-[#2E3F4D]">
      <ThemeToggle />
      
      {/* Header */}
      <div className="bg-white/80 dark:bg-[#1a2634]/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Scale className="h-8 w-8 text-[#FF9B51]" />
              <h1 className="text-2xl font-bold text-[#25343F] dark:text-white">BailBridge</h1>
              <span className="text-sm px-3 py-1 bg-[#FF9B51] text-white rounded-full font-semibold">
                Lawyer
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              
              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-10 w-10 rounded-full bg-white dark:bg-gradient-to-br dark:from-[#3A4B59] dark:to-[#4A5F7F] hover:bg-gray-100 dark:hover:from-[#4A5F7F] dark:hover:to-[#5A6F8F] p-0 border border-gray-300 dark:border-transparent"
                  >
                    <UserCircle2 className="h-6 w-6 text-gray-700 dark:text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Advocate {username}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Role: {role.charAt(0).toUpperCase() + role.slice(1)}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserCircle2 className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Messages</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#25343F] dark:text-white mb-2">
              Welcome, Advocate {username}!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Lawyer Dashboard - Manage your clients and their bail applications
            </p>
          </div>

          {/* Call to Action Cards */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-[#25343F] dark:text-white mb-6 text-center">
              WHAT WOULD YOU LIKE TO DO?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Add New Client Card */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#FF9B51] bg-white dark:bg-[#2A3F52]">
                  <CardContent className="p-6 flex flex-col items-center gap-3 justify-between min-h-[320px]">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center shadow-lg">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">ADD NEW CLIENT</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                        Register and manage new clients
                      </p>
                    </div>
                    <Button className="w-full bg-transparent border-2 border-[#4A5F7F] text-gray-900 dark:text-[#B8C4D9] hover:bg-[#4A5F7F] hover:text-white rounded-full transition-all shadow-sm">
                      Add Client
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* File Bail Application Card */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#FF9B51] bg-white dark:bg-[#2A3F52]">
                  <CardContent className="p-6 flex flex-col items-center gap-3 justify-between min-h-[320px]">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#FF9B51] flex items-center justify-center shadow-lg">
                      <FileText className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">FILE BAIL APPLICATION</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                        Submit bail applications for clients
                      </p>
                    </div>
                    <Button className="w-full bg-transparent border-2 border-[#4A5F7F] text-gray-900 dark:text-[#B8C4D9] hover:bg-[#4A5F7F] hover:text-white rounded-full transition-all shadow-sm">
                      File Application
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* View Case Calendar Card */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#FF9B51] bg-white dark:bg-[#2A3F52]">
                  <CardContent className="p-6 flex flex-col items-center gap-3 justify-between min-h-[320px]">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center shadow-lg">
                      <Scale className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">VIEW CASE CALENDAR</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                        Track upcoming hearings and deadlines
                      </p>
                    </div>
                    <Button className="w-full bg-transparent border-2 border-[#4A5F7F] text-gray-900 dark:text-[#B8C4D9] hover:bg-[#4A5F7F] hover:text-white rounded-full transition-all shadow-sm">
                      View Calendar
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Client Cases */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Active Cases</CardTitle>
              <CardDescription>Your clients' ongoing bail applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No active cases to display</p>
                <p className="text-sm mt-2">Click on "FILE BAIL APPLICATION" above to start a new case</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
