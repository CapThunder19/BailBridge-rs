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
import { User, FileText, Scale, LogOut, Bell, Settings, UserCircle2, Mail, Shield } from 'lucide-react';

export default function UserDashboard() {
  const router = useRouter();
  const [username, setUsername] = useState<string>('User');
  const [email, setEmail] = useState<string>('user@example.com');
  const [role, setRole] = useState<string>('user');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    
    if (!token) {
      router.push('/login');
      return;
    }
    
    if (storedRole !== 'user') {
      // Redirect to appropriate dashboard
      router.push(`/dashboard/${storedRole}`);
      return;
    }

    setRole(storedRole || 'user');
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
                      <p className="text-sm font-medium leading-none">{username}</p>
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
              Welcome back, {username}!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              User Dashboard - Manage your bail applications and track status
            </p>
          </div>

          {/* Call to Action Cards */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-[#25343F] dark:text-white mb-6 text-center">
              WHAT WOULD YOU LIKE TO DO?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* AI Suggestion Card */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#FF9B51] bg-white dark:bg-[#2A3F52]">
                  <CardContent className="p-6 flex flex-col items-center gap-3 justify-between min-h-[320px]">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center shadow-lg">
                      <Scale className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">CHECK AI SUGGESTION</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                        Get AI-powered bail eligibility analysis
                      </p>
                    </div>
                    <Button className="w-full bg-transparent border-2 border-[#4A5F7F] text-gray-900 dark:text-[#B8C4D9] hover:bg-[#4A5F7F] hover:text-white rounded-full transition-all shadow-sm">
                      Check Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Bail Form Card */}
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
                      <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">BAIL FORM</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                        Fill prisoner details and submit application
                      </p>
                    </div>
                    <Button className="w-full bg-transparent border-2 border-[#4A5F7F] text-gray-900 dark:text-[#B8C4D9] hover:bg-[#4A5F7F] hover:text-white rounded-full transition-all shadow-sm">
                      Fill Form
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* View Status Card */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#FF9B51] bg-white dark:bg-[#2A3F52]">
                  <CardContent className="p-6 flex flex-col items-center gap-3 justify-between min-h-[320px]">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center shadow-lg">
                      <User className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">VIEW STATUS</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                        Track your bail application progress
                      </p>
                    </div>
                    <Button className="w-full bg-transparent border-2 border-[#4A5F7F] text-gray-900 dark:text-[#B8C4D9] hover:bg-[#4A5F7F] hover:text-white rounded-full transition-all shadow-sm">
                      View Status
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Documents Card */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#FF9B51] bg-white dark:bg-[#2A3F52]">
                  <CardContent className="p-6 flex flex-col items-center gap-3 justify-between min-h-[320px]">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-lg">
                      <FileText className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">DOCUMENTS</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                        Upload and manage required documents
                      </p>
                    </div>
                    <Button className="w-full bg-transparent border-2 border-[#4A5F7F] text-gray-900 dark:text-[#B8C4D9] hover:bg-[#4A5F7F] hover:text-white rounded-full transition-all shadow-sm">
                      Upload
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Support Card */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#FF9B51] bg-white dark:bg-[#2A3F52]">
                  <CardContent className="p-6 flex flex-col items-center gap-3 justify-between min-h-[320px]">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#DC2626] to-[#B91C1C] flex items-center justify-center shadow-lg">
                      <Bell className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">CONTACT US</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                        Get help from our support team
                      </p>
                    </div>
                    <Button className="w-full bg-transparent border-2 border-[#4A5F7F] text-gray-900 dark:text-[#B8C4D9] hover:bg-[#4A5F7F] hover:text-white rounded-full transition-all shadow-sm">
                      Contact
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Recent Applications */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Your submitted bail applications and their current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No applications submitted yet</p>
                <p className="text-sm mt-2">Click on "BAIL FORM" above to submit your first application</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
