import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  Shield, 
  Users, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Building2,
  Activity,
  DollarSign,
  Lock
} from 'lucide-react'

export default async function Home() {
  const user = await currentUser()
  
  if (user) {
    redirect('/dashboard')
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <a href="/sign-in">Sign In</a>
              </Button>
              <Button asChild>
                <a href="/sign-up">Get Started</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <Activity className="w-3 h-3 mr-1" />
              Now Available
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-6">
              Powerful B2B
              <span className="text-primary"> Admin Dashboard</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
              Monitor, manage, and optimize your SaaS platform with our comprehensive admin dashboard. 
              Built for modern teams who need real-time insights and control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/sign-up">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/sign-in">Sign In</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Everything you need to manage your platform
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Comprehensive tools and insights to help you monitor, analyze, and optimize your B2B SaaS platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Real-time insights and comprehensive reporting to track your platform's performance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Complete user lifecycle management with roles, permissions, and organization controls.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Real-time Monitoring</CardTitle>
                <CardDescription>
                  Monitor system health, performance metrics, and alerts in real-time.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle>Organization Management</CardTitle>
                <CardDescription>
                  Manage multiple organizations, teams, and their respective settings and permissions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle>Billing & Revenue</CardTitle>
                <CardDescription>
                  Track revenue, manage billing, and analyze financial performance across your platform.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle>Security & Compliance</CardTitle>
                <CardDescription>
                  Enterprise-grade security with audit logs, compliance tools, and access controls.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-slate-600 dark:text-slate-400">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-slate-600 dark:text-slate-400">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-slate-600 dark:text-slate-400">Organizations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-slate-600 dark:text-slate-400">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Join thousands of teams already using our admin dashboard to manage their B2B SaaS platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/sign-up">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/sign-in">Sign In</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-slate-600 dark:text-slate-400">
            <p>&copy; 2024 Admin Dashboard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
