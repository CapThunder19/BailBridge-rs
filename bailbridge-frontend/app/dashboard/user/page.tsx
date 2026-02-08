'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import AISuggestionModal from '@/components/AISuggestionModal';
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
import { User, FileText, Scale, LogOut, Bell, Settings, UserCircle2, Mail, Shield, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function UserDashboard() {
  const router = useRouter();
  const [username, setUsername] = useState<string>('User');
  const [email, setEmail] = useState<string>('user@example.com');
  const [role, setRole] = useState<string>('user');
  const [showAIModal, setShowAIModal] = useState(false);

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

  // Mock data for charts
  const applicationStatusData = [
    { name: 'Submitted', value: 3, color: '#3B82F6' },
    { name: 'Under Review', value: 1, color: '#F59E0B' },
    { name: 'Approved', value: 2, color: '#10B981' },
    { name: 'Denied', value: 1, color: '#EF4444' },
  ];

  const applicationTimeline = [
    { week: 'Week 1', submitted: 1, decided: 0 },
    { week: 'Week 2', submitted: 2, decided: 1 },
    { week: 'Week 3', submitted: 1, decided: 1 },
    { week: 'Week 4', submitted: 3, decided: 2 },
  ];

  const eligibilityFactors = [
    { factor: 'Nature of Crime', score: 75 },
    { factor: 'Criminal History', score: 90 },
    { factor: 'Community Ties', score: 85 },
    { factor: 'Flight Risk', score: 80 },
    { factor: 'Financial Status', score: 70 },
  ];

  const documentStatus = [
    { type: 'ID Proof', status: 'Complete', count: 100 },
    { type: 'Address Proof', status: 'Complete', count: 100 },
    { type: 'Court Orders', status: 'Pending', count: 66 },
    { type: 'Affidavits', status: 'Complete', count: 100 },
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

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80">Total Applications</p>
                      <h3 className="text-3xl font-bold mt-2">7</h3>
                      <p className="text-xs mt-2 text-white/70 flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        All time
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
              <Card className="bg-gradient-to-br from-[#10B981] to-[#059669] text-white border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80">Approved</p>
                      <h3 className="text-3xl font-bold mt-2">2</h3>
                      <p className="text-xs mt-2 text-white/70 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        29% success rate
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
              <Card className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80">Under Review</p>
                      <h3 className="text-3xl font-bold mt-2">1</h3>
                      <p className="text-xs mt-2 text-white/70 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        In progress
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
              <Card className="bg-gradient-to-br from-[#EF4444] to-[#DC2626] text-white border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80">Denied</p>
                      <h3 className="text-3xl font-bold mt-2">1</h3>
                      <p className="text-xs mt-2 text-white/70 flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        14% of total
                      </p>
                    </div>
                    <XCircle className="h-12 w-12 text-white/30" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Application Status Distribution */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#25343F] dark:text-white">Application Status Overview</CardTitle>
                <CardDescription>Current status of all your applications</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={applicationStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {applicationStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Application Timeline */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#25343F] dark:text-white">Application Timeline</CardTitle>
                <CardDescription>Your application submission and decision trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={applicationTimeline}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
                    <XAxis dataKey="week" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="submitted" fill="#3B82F6" name="Submitted" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="decided" fill="#10B981" name="Decided" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* More Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Eligibility Factors */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#25343F] dark:text-white">Bail Eligibility Analysis</CardTitle>
                <CardDescription>AI-assessed factors affecting your eligibility</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={eligibilityFactors} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
                    <XAxis type="number" domain={[0, 100]} className="text-xs" />
                    <YAxis dataKey="factor" type="category" className="text-xs" width={120} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number | undefined) => value ? `${value}%` : '0%'}
                    />
                    <Bar dataKey="score" fill="#FF9B51" name="Score (%)" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Document Status */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#25343F] dark:text-white">Document Submission Status</CardTitle>
                <CardDescription>Track your document upload progress</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={documentStatus}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
                    <XAxis dataKey="type" className="text-xs" angle={-15} textAnchor="end" height={80} />
                    <YAxis domain={[0, 100]} className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number | undefined) => value ? `${value}%` : '0%'}
                    />
                    <Bar dataKey="count" fill="#4F46E5" name="Completion (%)" radius={[8, 8, 0, 0]}>
                      {documentStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.count === 100 ? '#10B981' : '#F59E0B'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-[#25343F] dark:text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* AI Suggestion Card */}
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#FF9B51] bg-white dark:bg-[#2A3F52]">
                  <CardContent className="p-6 flex flex-col items-center gap-3 justify-between">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center shadow-lg">
                      <Scale className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-sm mb-2 text-gray-900 dark:text-white">AI Suggestion</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                        Get AI analysis
                      </p>
                    </div>
                    <Button 
                      onClick={() => setShowAIModal(true)}
                      className="w-full bg-[#FF9B51] hover:bg-[#FF8A3D] text-white rounded-full text-xs"
                    >
                      Check Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Bail Form Card */}
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
                      <h4 className="font-bold text-sm mb-2 text-gray-900 dark:text-white">Bail Form</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                        Submit application
                      </p>
                    </div>
                    <Button className="w-full bg-[#FF9B51] hover:bg-[#FF8A3D] text-white rounded-full text-xs">
                      Fill Form
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* View Status Card */}
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#FF9B51] bg-white dark:bg-[#2A3F52]">
                  <CardContent className="p-6 flex flex-col items-center gap-3 justify-between">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center shadow-lg">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-sm mb-2 text-gray-900 dark:text-white">View Status</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                        Track progress
                      </p>
                    </div>
                    <Button className="w-full bg-[#FF9B51] hover:bg-[#FF8A3D] text-white rounded-full text-xs">
                      View Status
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Documents Card */}
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#FF9B51] bg-white dark:bg-[#2A3F52]">
                  <CardContent className="p-6 flex flex-col items-center gap-3 justify-between">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-lg">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-sm mb-2 text-gray-900 dark:text-white">Documents</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                        Upload files
                      </p>
                    </div>
                    <Button className="w-full bg-[#FF9B51] hover:bg-[#FF8A3D] text-white rounded-full text-xs">
                      Upload
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Support Card */}
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#FF9B51] bg-white dark:bg-[#2A3F52]">
                  <CardContent className="p-6 flex flex-col items-center gap-3 justify-between">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#DC2626] to-[#B91C1C] flex items-center justify-center shadow-lg">
                      <Bell className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-sm mb-2 text-gray-900 dark:text-white">Contact Us</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                        Get support
                      </p>
                    </div>
                    <Button className="w-full bg-[#FF9B51] hover:bg-[#FF8A3D] text-white rounded-full text-xs">
                      Contact
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Suggestion Modal */}
      <AISuggestionModal 
        isOpen={showAIModal} 
        onClose={() => setShowAIModal(false)} 
      />

      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
}
