"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Settings, 
  Save,
  Shield,
  Bell,
  Globe,
  Database,
  Mail,
  Key,
  User,
  Building2,
  Zap,
  AlertTriangle
} from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "Admin Dashboard",
    siteDescription: "Powerful B2B SaaS monitoring platform",
    timezone: "UTC",
    language: "en",
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordPolicy: "strong",
    ipWhitelist: false,
    
    // Notification Settings
    emailNotifications: true,
    slackNotifications: false,
    webhookUrl: "",
    
    // System Settings
    maintenanceMode: false,
    debugMode: false,
    logLevel: "info",
    backupFrequency: "daily",
    
    // API Settings
    rateLimit: 1000,
    apiVersion: "v1",
    corsEnabled: true,
  })

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    // Here you would typically save to your database
    console.log("Saving settings:", settings)
    // Show success message
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure your platform settings and preferences
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>
              Basic platform configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">Eastern Time</SelectItem>
                  <SelectItem value="PST">Pacific Time</SelectItem>
                  <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Configure security and authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Require 2FA for all users
                </p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="passwordPolicy">Password Policy</Label>
              <Select value={settings.passwordPolicy} onValueChange={(value) => handleSettingChange('passwordPolicy', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                  <SelectItem value="strong">Strong (12+ chars, mixed case, numbers)</SelectItem>
                  <SelectItem value="strict">Strict (16+ chars, special chars)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>IP Whitelist</Label>
                <p className="text-sm text-muted-foreground">
                  Restrict access to specific IP addresses
                </p>
              </div>
              <Switch
                checked={settings.ipWhitelist}
                onCheckedChange={(checked) => handleSettingChange('ipWhitelist', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send notifications via email
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Slack Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send notifications to Slack
                </p>
              </div>
              <Switch
                checked={settings.slackNotifications}
                onCheckedChange={(checked) => handleSettingChange('slackNotifications', checked)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                placeholder="https://hooks.slack.com/services/..."
                value={settings.webhookUrl}
                onChange={(e) => handleSettingChange('webhookUrl', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              System Settings
            </CardTitle>
            <CardDescription>
              System configuration and maintenance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable maintenance mode
                </p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Debug Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable debug logging
                </p>
              </div>
              <Switch
                checked={settings.debugMode}
                onCheckedChange={(checked) => handleSettingChange('debugMode', checked)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="logLevel">Log Level</Label>
              <Select value={settings.logLevel} onValueChange={(value) => handleSettingChange('logLevel', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debug">Debug</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warn">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <Select value={settings.backupFrequency} onValueChange={(value) => handleSettingChange('backupFrequency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* API Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              API Settings
            </CardTitle>
            <CardDescription>
              Configure API endpoints and limits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rateLimit">Rate Limit (requests/hour)</Label>
              <Input
                id="rateLimit"
                type="number"
                value={settings.rateLimit}
                onChange={(e) => handleSettingChange('rateLimit', parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiVersion">API Version</Label>
              <Select value={settings.apiVersion} onValueChange={(value) => handleSettingChange('apiVersion', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="v1">v1 (Current)</SelectItem>
                  <SelectItem value="v2">v2 (Beta)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>CORS Enabled</Label>
                <p className="text-sm text-muted-foreground">
                  Enable Cross-Origin Resource Sharing
                </p>
              </div>
              <Switch
                checked={settings.corsEnabled}
                onCheckedChange={(checked) => handleSettingChange('corsEnabled', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Settings
            </CardTitle>
            <CardDescription>
              Database configuration and monitoring
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Connection Status</Label>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Connected</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Database Size</Label>
              <p className="text-sm text-muted-foreground">2.3 GB</p>
            </div>
            
            <div className="space-y-2">
              <Label>Last Backup</Label>
              <p className="text-sm text-muted-foreground">2 hours ago</p>
            </div>
            
            <Button variant="outline" className="w-full">
              <Database className="h-4 w-4 mr-2" />
              Run Database Maintenance
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
