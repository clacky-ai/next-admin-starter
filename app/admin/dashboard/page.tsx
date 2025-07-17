'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { User } from '@/lib/db/schema';
import useSWR from 'swr';
import { Users, Activity, Shield, Settings } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function AdminOverviewCards() {
  const { data: user } = useSWR<User>('/api/user', fetcher);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Current User</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <div className="text-2xl font-bold">{user ? '1' : '0'}</div>
              <p className="text-xs text-gray-600">Active user</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-green-600">Online</div>
              <p className="text-xs text-gray-600">All systems operational</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-orange-600 mr-3" />
            <div>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-gray-600">Actions today</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Settings className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-gray-600">Pending updates</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function WelcomeCard() {
  const { data: user } = useSWR<User>('/api/user', fetcher);
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Welcome to Admin Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Hello {user?.name || user?.email || 'Admin'}! Welcome to your administrative dashboard.
        </p>
        <p className="text-muted-foreground mt-2">
          Use the navigation menu to access different sections of the admin panel.
        </p>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Dashboard
      </h1>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <AdminOverviewCards />
            <WelcomeCard />
          </div>
        </div>
      </div>
    </section>
  );
}