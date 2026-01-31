'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Shield, Scale, FileText, Briefcase } from 'lucide-react';
import Link from 'next/link';

const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  role: z.enum(['user', 'admin']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: 'user',
    },
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      const response = await api.register(
        data.username,
        data.email,
        data.password,
        data.role
      );
      
      localStorage.setItem('token', response.token);
      
      toast.success('Account created!', {
        description: 'Welcome to BailBridge. Redirecting...',
      });
      
      setTimeout(() => router.push('/'), 500);
    } catch (err) {
      let errorMessage = 'Registration failed';
      
      if (err instanceof Error) {
        if (err.message.includes('duplicate key') && err.message.includes('username')) {
          errorMessage = 'This username is already taken.';
        } else if (err.message.includes('duplicate key') && err.message.includes('email')) {
          errorMessage = 'This email is already registered.';
        } else {
          errorMessage = err.message;
        }
      }
      
      toast.error('Registration failed', {
        description: errorMessage,
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      <ThemeToggle />
      
      {/* Left Side - Welcome Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#BFC9D1] via-[#D4DDE3] to-[#BFC9D1] relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-[#25343F]">
          {/* Decorative Elements */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-20"
          >
            <FileText className="w-16 h-16 text-[#25343F]/20" />
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, 10, 0],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-32 right-24"
          >
            <Shield className="w-20 h-20 text-[#25343F]/20" />
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-32 left-32"
          >
            <Briefcase className="w-14 h-14 text-[#25343F]/20" />
          </motion.div>

          <motion.div
            animate={{ 
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 right-32"
          >
            <User className="w-16 h-16 text-[#25343F]/20" />
          </motion.div>

          {/* Main Content */}
          <div className="text-center space-y-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="flex justify-center"
            >
              <Scale className="w-32 h-32 text-[#25343F]" strokeWidth={1.5} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl font-bold text-[#25343F]"
            >
              Join Us!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-lg text-[#25343F] max-w-md mx-auto leading-relaxed"
            >
              Create your account to access our comprehensive legal platform. 
              Streamline your workflow, manage documents efficiently, and 
              enhance your legal practice with our powerful tools.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Signup Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex items-center justify-center bg-[#25343F] p-8 overflow-y-auto"
      >
        <div className="w-full max-w-md space-y-8 py-8">
          {/* Logo/Brand */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Scale className="w-8 h-8 text-[#FF9B51]" />
              <h2 className="text-2xl font-bold text-white">BailBridge</h2>
            </div>
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-gray-400">Sign up to get started with BailBridge</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-300">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                {...register('username')}
                className={`bg-[#0F2A44] border-[#1F3A52] text-white placeholder:text-gray-400 focus:border-[#C9A227] focus:ring-[#C9A227] ${
                  errors.username ? 'border-[#C62828]' : ''
                }`}
              />
              {errors.username && (
                <p className="text-sm text-[#EF5350]">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register('email')}
                className={`bg-[#0F2A44] border-[#1F3A52] text-white placeholder:text-gray-400 focus:border-[#C9A227] focus:ring-[#C9A227] ${
                  errors.email ? 'border-[#C62828]' : ''
                }`}
              />
              {errors.email && (
                <p className="text-sm text-[#EF5350]">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Minimum 6 characters"
                {...register('password')}
                className={`bg-[#0F2A44] border-[#1F3A52] text-white placeholder:text-gray-400 focus:border-[#C9A227] focus:ring-[#C9A227] ${
                  errors.password ? 'border-[#C62828]' : ''
                }`}
              />
              {errors.password && (
                <p className="text-sm text-[#EF5350]">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repeat your password"
                {...register('confirmPassword')}
                className={`bg-[#0F2A44] border-[#1F3A52] text-white placeholder:text-gray-400 focus:border-[#C9A227] focus:ring-[#C9A227] ${
                  errors.confirmPassword ? 'border-[#C62828]' : ''
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-[#EF5350]">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-gray-300">Role</Label>
              <Select
                defaultValue="user"
                onValueChange={(value) => setValue('role', value as 'user' | 'admin')}
              >
                <SelectTrigger className="bg-[#2E3F4D] border-[#3A4B59] text-white focus:border-[#FF9B51] focus:ring-[#FF9B51]">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="bg-[#2E3F4D] border-[#3A4B59]">
                  <SelectItem value="user" className="text-white focus:bg-[#3A4B59]">User</SelectItem>
                  <SelectItem value="admin" className="text-white focus:bg-[#3A4B59]">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FF9B51] hover:bg-[#FFB173] text-[#25343F] font-semibold h-11"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating account...' : 'Sign Up'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#25343F] text-gray-400">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full border-[#3A4B59] bg-[#2E3F4D] hover:bg-[#3A4B59] text-white"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </Button>
          </form>

          <div className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-[#FF9B51] hover:text-[#FFB173] font-semibold">
              Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
