import { Button } from '@/components/ui/button';
import { ArrowRight, Database, Shield, Users, BarChart3, Settings, Lock } from 'lucide-react';

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/20 to-indigo-100/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                Smart Admin Console
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Data-Driven Management
                </span>
              </h1>
              <p className="mt-6 text-base text-gray-600 sm:mt-8 sm:text-xl lg:text-lg xl:text-xl">
                A comprehensive management platform built for modern enterprises. Integrating user management, 
                data analytics, and security monitoring to make complex administrative tasks simple and efficient.
              </p>
              <div className="mt-10 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <Button
                  size="lg"
                  className="text-lg rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Start Managing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Core Features
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Built on modern technology stack, providing administrators with powerful and intuitive operational experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg group-hover:shadow-xl transition-shadow">
                <Users className="h-8 w-8" />
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  User Management
                </h3>
                <p className="mt-3 text-base text-gray-600">
                  Complete user lifecycle management including registration approval, permission assignment, 
                  and activity monitoring to ensure secure system operation.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg group-hover:shadow-xl transition-shadow">
                <BarChart3 className="h-8 w-8" />
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Data Analytics
                </h3>
                <p className="mt-3 text-base text-gray-600">
                  Real-time data statistics and visualization analysis to help administrators quickly understand 
                  system status and make data-driven decisions.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg group-hover:shadow-xl transition-shadow">
                <Shield className="h-8 w-8" />
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Security Protection
                </h3>
                <p className="mt-3 text-base text-gray-600">
                  Multi-layer security protection mechanisms including authentication, access control, 
                  and operation auditing to ensure absolute platform security.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg group-hover:shadow-xl transition-shadow">
                <Database className="h-8 w-8" />
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Data Storage
                </h3>
                <p className="mt-3 text-base text-gray-600">
                  High-performance data storage solution based on PostgreSQL with Drizzle ORM, 
                  ensuring data security and access efficiency.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow-lg group-hover:shadow-xl transition-shadow">
                <Settings className="h-8 w-8" />
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  System Configuration
                </h3>
                <p className="mt-3 text-base text-gray-600">
                  Flexible system configuration options with personalized customization support 
                  to meet different business scenario management requirements.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg group-hover:shadow-xl transition-shadow">
                <Lock className="h-8 w-8" />
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Access Control
                </h3>
                <p className="mt-3 text-base text-gray-600">
                  Fine-grained access control mechanisms supporting role definition and permission inheritance, 
                  ensuring users can only access authorized functions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Experience Efficient Management
              </h2>
              <p className="mt-6 max-w-3xl text-xl text-blue-100">
                Modern management interface design with intuitive workflows and powerful feature modules 
                make your administrative work simpler and more efficient than ever before.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <div className="flex items-center text-blue-100">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 bg-blue-300 rounded-full"></div>
                  </div>
                  <p className="ml-3 text-sm">24/7 System Monitoring</p>
                </div>
                <div className="flex items-center text-blue-100">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 bg-purple-300 rounded-full"></div>
                  </div>
                  <p className="ml-3 text-sm">Enterprise-Grade Security</p>
                </div>
                <div className="flex items-center text-blue-100">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 bg-indigo-300 rounded-full"></div>
                  </div>
                  <p className="ml-3 text-sm">Professional Support</p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 flex justify-center lg:justify-end">
              <Button
                size="lg"
                className="text-lg rounded-full bg-white text-purple-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-3"
              >
                Get Started
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}