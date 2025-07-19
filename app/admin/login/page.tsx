'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { signIn } from '@/app/(login)/actions';
import Link from 'next/link';
import { Shield, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type ActionState = {
  error?: string;
  success?: string;
  email?: string;
  password?: string;
  [key: string]: any;
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    signIn,
    {}
  );

  // Handle redirect after successful login
  useEffect(() => {
    if (state?.shouldRedirect || state?.success) {
      const timer = setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/20 to-indigo-100/30"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
              <Shield className="h-8 w-8" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access the administrative dashboard
          </p>
        </div>

        {/* Login Card */}
        <div className="mt-8">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-center text-xl text-gray-900">
                Sign in to continue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form action={formAction} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="admin@admin.com"
                    defaultValue={state?.email || ''}
                    disabled={isPending}
                  />
                </div>
                
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password" 
                    type="password"
                    autoComplete="current-password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your password"
                    disabled={isPending}
                  />
                </div>

                {/* Error Message */}
                {state?.error && (
                  <div className="flex items-center p-4 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>{state.error}</span>
                  </div>
                )}

                {/* Success Message */}
                {state?.success && (
                  <div className="flex items-center p-4 text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg">
                    <div className="h-4 w-4 mr-3 flex-shrink-0 rounded-full bg-green-500"></div>
                    <span>{state.success}</span>
                  </div>
                )}
                
                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <Shield className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
              
              {/* Back to Home Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <Link 
                  href="/" 
                  className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors group"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to home
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Secure admin access • Protected by advanced authentication
          </p>
        </div>
      </div>
    </div>
  );
}