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
import { Briefcase, FileText, Users, LogOut, Bell, Settings, Scale, UserCircle2, Mail, Shield, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

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

  // Mock data for charts
  const clientCasesData = [
    { month: 'Jan', cases: 12, won: 8, lost: 3, pending: 1 },
    { month: 'Feb', cases: 15, won: 10, lost: 4, pending: 1 },
    { month: 'Mar', cases: 18, won: 13, lost: 3, pending: 2 },
    { month: 'Apr', cases: 14, won: 9, lost: 3, pending: 2 },
    { month: 'May', cases: 20, won: 14, lost: 4, pending: 2 },
    { month: 'Jun', cases: 22, won: 16, lost: 4, pending: 2 },
  ];

  const caseStatusData = [
    { name: 'Won', value: 70, color: '#10B981' },
    { name: 'Lost', value: 21, color: '#EF4444' },
    { name: 'Pending', value: 10, color: '#F59E0B' },
  ];

  const caseTypeDistribution = [
    { type: 'Anticipatory Bail', count: 35 },
    { type: 'Regular Bail', count: 48 },
    { type: 'Interim Bail', count: 12 },
    { type: 'Transit Bail', count: 6 },
  ];

  const monthlyEarnings = [
    { month: 'Jan', earnings: 45000 },
    { month: 'Feb', earnings: 52000 },
    { month: 'Mar', earnings: 61000 },
    { month: 'Apr', earnings: 48000 },
    { month: 'May', earnings: 68000 },
    { month: 'Jun', earnings: 72000 },
  ];

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

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-[#FF9B51] to-[#F59E0B] text-white border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80">Active Clients</p>
                      <h3 className="text-3xl font-bold mt-2">48</h3>
                      <p className="text-xs mt-2 text-white/70 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +6 this month
                      </p>
                    </div>
                    <Users className="h-12 w-12 text-white/30" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-[#10B981] to-[#059669] text-white border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80">Cases Won</p>
                      <h3 className="text-3xl font-bold mt-2">70</h3>
                      <p className="text-xs mt-2 text-white/70 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        69% success rate
                      </p>
                    </div>
                    <Scale className="h-12 w-12 text-white/30" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80">Pending Cases</p>
                      <h3 className="text-3xl font-bold mt-2">10</h3>
                      <p className="text-xs mt-2 text-white/70 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Awaiting decision
                      </p>
                    </div>
                    <FileText className="h-12 w-12 text-white/30" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-[#4F46E5] to-[#4338CA] text-white border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80">Total Cases</p>
                      <h3 className="text-3xl font-bold mt-2">101</h3>
                      <p className="text-xs mt-2 text-white/70 flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        All time
                      </p>
                    </div>
                    <Briefcase className="h-12 w-12 text-white/30" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Case Performance Trend */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#25343F] dark:text-white">Case Performance Trend</CardTitle>
                <CardDescription>Monthly breakdown of case outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={clientCasesData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Line type="monotone" dataKey="won" stroke="#10B981" strokeWidth={2} name="Won" />
                    <Line type="monotone" dataKey="lost" stroke="#EF4444" strokeWidth={2} name="Lost" />
                    <Line type="monotone" dataKey="pending" stroke="#F59E0B" strokeWidth={2} name="Pending" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Case Status Distribution */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#25343F] dark:text-white">Overall Case Status</CardTitle>
                <CardDescription>Distribution of case outcomes</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={caseStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {caseStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* More Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Case Type Distribution */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#25343F] dark:text-white">Case Type Distribution</CardTitle>
                <CardDescription>Breakdown by bail application type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={caseTypeDistribution}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
                    <XAxis dataKey="type" className="text-xs" angle={-15} textAnchor="end" height={80} />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="count" fill="#FF9B51" name="Cases" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Earnings */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#25343F] dark:text-white">Monthly Revenue Trend</CardTitle>
                <CardDescription>Professional fees earned over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyEarnings}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number | undefined) => value ? `₹${value.toLocaleString()}` : '₹0'}
                    />
                    <Area type="monotone" dataKey="earnings" stroke="#4F46E5" fill="#818CF8" name="Revenue (₹)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-[#25343F] dark:text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Add New Client Card */}
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#FF9B51] bg-white dark:bg-[#2A3F52]">
                  <CardContent className="p-6 flex flex-col items-center gap-3 justify-between">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center shadow-lg">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">Add New Client</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                        Register a new client
                      </p>
                    </div>
                    <Button className="w-full bg-[#FF9B51] hover:bg-[#FF8A3D] text-white rounded-full">
                      Add Client
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* File Bail Application Card */}
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#FF9B51] bg-white dark:bg-[#2A3F52]">
                  <CardContent className="p-6 flex flex-col items-center gap-3 justify-between">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#FF9B51] flex items-center justify-center shadow-lg">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">File Application</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                        Submit a bail application
                      </p>
                    </div>
                    <Button className="w-full bg-[#FF9B51] hover:bg-[#FF8A3D] text-white rounded-full">
                      File Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* View Case Calendar Card */}
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#FF9B51] bg-white dark:bg-[#2A3F52]">
                  <CardContent className="p-6 flex flex-col items-center gap-3 justify-between">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center shadow-lg">
                      <Scale className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">View Calendar</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                        Track upcoming hearings
                      </p>
                    </div>
                    <Button className="w-full bg-[#FF9B51] hover:bg-[#FF8A3D] text-white rounded-full">
                      View Calendar
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
