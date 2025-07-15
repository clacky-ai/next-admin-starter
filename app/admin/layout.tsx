'use client';

import Link from 'next/link';
import { use, useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { CircleIcon, Home, LogOut, Settings, Activity, Shield } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/db/schema';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: user } = useSWR<User>('/api/user', fetcher);
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    mutate('/api/user');
    router.push('/');
  }

  if (!user) {
    return (
      <>
        <Button asChild className="rounded-full">
          <Link href="/admin/login">Admin Login</Link>
        </Button>
      </>
    );
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer size-9">
          <AvatarImage alt={user.name || ''} />
          <AvatarFallback>
            {user.email
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/admin/dashboard" className="flex w-full items-center">
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <form action={handleSignOut} className="w-full">
          <button type="submit" className="flex w-full">
            <DropdownMenuItem className="w-full flex-1 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Sidebar() {
  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
      <div className="p-6">
        <Link href="/admin/dashboard" className="flex items-center">
          <Shield className="h-8 w-8 text-blue-400" />
          <span className="ml-3 text-xl font-semibold">Admin Panel</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 pb-4">
        <div className="space-y-2">
          <Link 
            href="/admin/dashboard" 
            className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
          >
            <Home className="mr-3 h-5 w-5" />
            Overview
          </Link>
          
          <Link 
            href="/admin/dashboard/activity" 
            className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
          >
            <Activity className="mr-3 h-5 w-5" />
            Activity
          </Link>
          
          <Link 
            href="/admin/dashboard/security" 
            className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
          >
            <Shield className="mr-3 h-5 w-5" />
            Security
          </Link>
          
          <Link 
            href="/admin/dashboard/general" 
            className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
          >
            <Settings className="mr-3 h-5 w-5" />
            General
          </Link>
        </div>
      </nav>
    </div>
  );
}

function Header() {
  return (
    <header className="bg-white border-b border-purple-200">
      <div className="px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Administration</h1>
        <div className="flex items-center space-x-4">
          <Suspense fallback={<div className="h-9" />}>
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}