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
import { Gavel, FileText, Clock, LogOut, Bell, Settings, Scale, CheckCircle, UserCircle2, Mail, Shield, TrendingUp, AlertCircle, XCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function JudgeDashboard() {
  const router = useRouter();
  const [username, setUsername] = useState<string>('Judge');
  const [email, setEmail] = useState<string>('judge@example.com');
  const [role, setRole] = useState<string>('judge');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    
    if (!token) {
      router.push('/login');
      return;
    }
    
    if (storedRole !== 'judge') {
      // Redirect to appropriate dashboard
      router.push(`/dashboard/${storedRole}`);
      return;
    }

    setRole(storedRole || 'judge');
    // TODO: Fetch actual user data from API using token
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/');
  };

  // Mock data for charts
  const monthlyData = [
    { month: 'Jan', approved: 42, denied: 18, pending: 12 },
    { month: 'Feb', approved: 38, denied: 22, pending: 15 },
    { month: 'Mar', approved: 45, denied: 15, pending: 10 },
    { month: 'Apr', approved: 51, denied: 19, pending: 14 },
    { month: 'May', approved: 48, denied: 21, pending: 18 },
    { month: 'Jun', approved: 55, denied: 17, pending: 12 },
  ];

  const statusData = [
    { name: 'Approved', value: 279, color: '#10B981' },
    { name: 'Denied', value: 112, color: '#EF4444' },
    { name: 'Pending', value: 81, color: '#F59E0B' },
  ];

  const caseTypeData = [
    { type: 'Bailable', count: 145 },
    { type: 'Non-Bailable', count: 89 },
    { type: 'Anticipatory', count: 67 },
    { type: 'Regular', count: 171 },
  ];

  const weeklyTrend = [
    { day: 'Mon', cases: 12 },
    { day: 'Tue', cases: 19 },
    { day: 'Wed', cases: 15 },
    { day: 'Thu', cases: 22 },
    { day: 'Fri', cases: 18 },
    { day: 'Sat', cases: 8 },
    { day: 'Sun', cases: 5 },
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
              <span className="text-sm px-3 py-1 bg-[#25343F] dark:bg-[#FF9B51] text-white rounded-full font-semibold">
                Judge
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
                      <p className="text-sm font-medium leading-none">Hon'ble {username}</p>
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
              Welcome, Hon'ble {username}!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Judge Dashboard - Review and adjudicate bail applications
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-[#10B981] to-[#059669] text-white border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80">Total Approved</p>
                      <h3 className="text-3xl font-bold mt-2">279</h3>
                      <p className="text-xs mt-2 text-white/70 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +12% from last month
                      </p>
                    </div>
                    <CheckCircle className="h-12 w-12 text-white/30" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-[#EF4444] to-[#DC2626] text-white border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80">Total Denied</p>
                      <h3 className="text-3xl font-bold mt-2">112</h3>
                      <p className="text-xs mt-2 text-white/70 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        -5% from last month
                      </p>
                    </div>
                    <XCircle className="h-12 w-12 text-white/30" />
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
                      <p className="text-sm font-medium text-white/80">Pending Review</p>
                      <h3 className="text-3xl font-bold mt-2">81</h3>
                      <p className="text-xs mt-2 text-white/70 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Requires attention
                      </p>
                    </div>
                    <Clock className="h-12 w-12 text-white/30" />
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
                      <h3 className="text-3xl font-bold mt-2">472</h3>
                      <p className="text-xs mt-2 text-white/70 flex items-center gap-1">
                        <Scale className="h-3 w-3" />
                        All time
                      </p>
                    </div>
                    <Gavel className="h-12 w-12 text-white/30" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Monthly Decisions Chart */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#25343F] dark:text-white">Monthly Decisions Overview</CardTitle>
                <CardDescription>Approved, denied, and pending cases over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
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
                    <Bar dataKey="approved" fill="#10B981" name="Approved" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="denied" fill="#EF4444" name="Denied" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="pending" fill="#F59E0B" name="Pending" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Case Status Distribution */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#25343F] dark:text-white">Case Status Distribution</CardTitle>
                <CardDescription>Overall breakdown of case decisions</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
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
            {/* Case Types */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#25343F] dark:text-white">Case Types Analysis</CardTitle>
                <CardDescription>Distribution by bail application type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={caseTypeData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
                    <XAxis type="number" className="text-xs" />
                    <YAxis dataKey="type" type="category" className="text-xs" width={100} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="count" fill="#FF9B51" name="Cases" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weekly Trend */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#25343F] dark:text-white">This Week's Activity</CardTitle>
                <CardDescription>Daily case review trends for current week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={weeklyTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
                    <XAxis dataKey="day" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }} 
                    />
                    <Area type="monotone" dataKey="cases" stroke="#4F46E5" fill="#818CF8" name="Cases Reviewed" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-[#25343F] dark:text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Review Pending Applications Card */}
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#FF9B51] bg-white dark:bg-[#2A3F52]">
                  <CardContent className="p-6 flex flex-col items-center gap-3 justify-between">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center shadow-lg">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">Review Applications</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                        81 pending applications
                      </p>
                    </div>
                    <Button className="w-full bg-[#FF9B51] hover:bg-[#FF8A3D] text-white rounded-full">
                      Review Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Today's Hearing Schedule Card */}
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#FF9B51] bg-white dark:bg-[#2A3F52]">
                  <CardContent className="p-6 flex flex-col items-center gap-3 justify-between">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#FF9B51] flex items-center justify-center shadow-lg">
                      <Gavel className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">Hearing Schedule</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                        18 hearings today
                      </p>
                    </div>
                    <Button className="w-full bg-[#FF9B51] hover:bg-[#FF8A3D] text-white rounded-full">
                      View Schedule
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Case History Card */}
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
                      <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">Case History</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                        472 total cases
                      </p>
                    </div>
                    <Button className="w-full bg-[#FF9B51] hover:bg-[#FF8A3D] text-white rounded-full">
                      View History
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
