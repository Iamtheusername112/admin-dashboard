"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Database, 
  Globe,
  Mail,
  Key,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  AlertTriangle
} from "lucide-react"
import { useEffect, useState } from 'react'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Database },
    { id: 'billing', label: 'Billing', icon: Globe },
  ];

  const fetchSettings = async () => {
    try {
      setLoading(true);
      // Mock settings data
      setSettings({
        general: {
          siteName: 'Admin Dashboard',
          siteDescription: 'Enterprise management platform',
          timezone: 'UTC',
          language: 'en',
          theme: 'system',
          maintenanceMode: false,
        },
        profile: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@company.com',
          phone: '+1 (555) 123-4567',
          bio: 'System Administrator',
          avatar: null,
        },
        security: {
          twoFactorEnabled: true,
          sessionTimeout: 30,
          passwordExpiry: 90,
          loginNotifications: true,
          apiKey: 'sk_live_1234567890abcdef',
          lastPasswordChange: '2024-01-15',
        },
        notifications: {
          emailNotifications: true,
          pushNotifications: true,
          smsNotifications: false,
          weeklyReports: true,
          systemAlerts: true,
          marketingEmails: false,
        },
        integrations: {
          slackWebhook: '',
          discordWebhook: '',
          webhookSecret: '',
          apiRateLimit: 1000,
        },
        billing: {
          plan: 'Enterprise',
          status: 'active',
          nextBillingDate: '2024-02-15',
          paymentMethod: '**** 4242',
          billingEmail: 'billing@company.com',
        }
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (section) => {
    try {
      setSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Saving ${section} settings:`, settings[section]);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="siteName">Site Name</Label>
          <Input
            id="siteName"
            value={settings.general?.siteName || ''}
            onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="timezone">Timezone</Label>
          <select
            id="timezone"
            value={settings.general?.timezone || 'UTC'}
            onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="siteDescription">Site Description</Label>
        <Textarea
          id="siteDescription"
          value={settings.general?.siteDescription || ''}
          onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
          className="mt-1"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="language">Language</Label>
          <select
            id="language"
            value={settings.general?.language || 'en'}
            onChange={(e) => handleInputChange('general', 'language', e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
        <div>
          <Label htmlFor="theme">Theme</Label>
          <select
            id="theme"
            value={settings.general?.theme || 'system'}
            onChange={(e) => handleInputChange('general', 'theme', e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
        <div>
          <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
          <p className="text-sm text-slate-600 dark:text-slate-400">Enable maintenance mode to restrict access</p>
        </div>
        <Switch
          id="maintenanceMode"
          checked={settings.general?.maintenanceMode || false}
          onCheckedChange={(checked) => handleInputChange('general', 'maintenanceMode', checked)}
        />
      </div>
    </div>
  );

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <User className="w-10 h-10 text-white" />
        </div>
        <div>
          <Button variant="outline" size="sm" className="mb-2">
            Change Avatar
          </Button>
          <p className="text-sm text-slate-600 dark:text-slate-400">JPG, PNG or GIF. Max size 2MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={settings.profile?.firstName || ''}
            onChange={(e) => handleInputChange('profile', 'firstName', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={settings.profile?.lastName || ''}
            onChange={(e) => handleInputChange('profile', 'lastName', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={settings.profile?.email || ''}
            onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={settings.profile?.phone || ''}
            onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={settings.profile?.bio || ''}
          onChange={(e) => handleInputChange('profile', 'bio', e.target.value)}
          className="mt-1"
          rows={3}
        />
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
        <div>
          <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
          <p className="text-sm text-slate-600 dark:text-slate-400">Add an extra layer of security</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={settings.security?.twoFactorEnabled ? 'default' : 'secondary'}>
            {settings.security?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
          </Badge>
          <Switch
            id="twoFactor"
            checked={settings.security?.twoFactorEnabled || false}
            onCheckedChange={(checked) => handleInputChange('security', 'twoFactorEnabled', checked)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
          <Input
            id="sessionTimeout"
            type="number"
            value={settings.security?.sessionTimeout || 30}
            onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
          <Input
            id="passwordExpiry"
            type="number"
            value={settings.security?.passwordExpiry || 90}
            onChange={(e) => handleInputChange('security', 'passwordExpiry', parseInt(e.target.value))}
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
        <div>
          <Label htmlFor="loginNotifications">Login Notifications</Label>
          <p className="text-sm text-slate-600 dark:text-slate-400">Get notified of new login attempts</p>
        </div>
        <Switch
          id="loginNotifications"
          checked={settings.security?.loginNotifications || false}
          onCheckedChange={(checked) => handleInputChange('security', 'loginNotifications', checked)}
        />
      </div>

      <div>
        <Label htmlFor="apiKey">API Key</Label>
        <div className="flex items-center gap-2 mt-1">
          <Input
            id="apiKey"
            type={showApiKey ? 'text' : 'password'}
            value={settings.security?.apiKey || ''}
            readOnly
            className="font-mono"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowApiKey(!showApiKey)}
          >
            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
          <Button variant="outline" size="sm">
            <Key className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Last changed: {settings.security?.lastPasswordChange || 'Never'}
        </p>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {Object.entries(settings.notifications || {}).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
          <div>
            <Label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {key === 'emailNotifications' && 'Receive notifications via email'}
              {key === 'pushNotifications' && 'Receive push notifications in browser'}
              {key === 'smsNotifications' && 'Receive notifications via SMS'}
              {key === 'weeklyReports' && 'Get weekly summary reports'}
              {key === 'systemAlerts' && 'Get notified of system alerts'}
              {key === 'marketingEmails' && 'Receive marketing and promotional emails'}
            </p>
          </div>
          <Switch
            id={key}
            checked={value}
            onCheckedChange={(checked) => handleInputChange('notifications', key, checked)}
          />
        </div>
      ))}
    </div>
  );

  const renderBillingSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{settings.billing?.plan || 'Enterprise'}</span>
                <Badge variant="default">{settings.billing?.status || 'Active'}</Badge>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Next billing: {settings.billing?.nextBillingDate || '2024-02-15'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{settings.billing?.paymentMethod || '**** 4242'}</span>
                <Button variant="outline" size="sm">Change</Button>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {settings.billing?.billingEmail || 'billing@company.com'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button variant="outline">Upgrade Plan</Button>
        <Button variant="outline">Billing History</Button>
        <Button variant="outline">Download Invoice</Button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'profile': return renderProfileSettings();
      case 'security': return renderSecuritySettings();
      case 'notifications': return renderNotificationSettings();
      case 'billing': return renderBillingSettings();
      default: return renderGeneralSettings();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Settings</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your account settings and preferences</p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Button 
              onClick={() => handleSave(activeTab)}
              disabled={saving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100 capitalize">
                  {activeTab} Settings
                </CardTitle>
                <CardDescription>
                  {activeTab === 'general' && 'Configure general application settings'}
                  {activeTab === 'profile' && 'Update your personal information'}
                  {activeTab === 'security' && 'Manage security and authentication settings'}
                  {activeTab === 'notifications' && 'Control notification preferences'}
                  {activeTab === 'billing' && 'Manage billing and subscription settings'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderTabContent()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}