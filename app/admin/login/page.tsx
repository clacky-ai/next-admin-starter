'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { signIn } from '@/app/(login)/actions';
import Link from 'next/link';
import { Shield, Loader2, AlertCircle } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <Shield className="h-6 w-6" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access the administrative dashboard
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Sign in to continue</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1"
                  placeholder="admin@admin.com"
                  defaultValue={state?.email || ''}
                  disabled={isPending}
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1"
                  placeholder="Enter your password"
                  disabled={isPending}
                />
              </div>

              {state?.error && (
                <div className="flex items-center p-3 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{state.error}</span>
                </div>
              )}

              {state?.success && (
                <div className="flex items-center p-3 text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg">
                  <span>{state.success}</span>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                ← Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}