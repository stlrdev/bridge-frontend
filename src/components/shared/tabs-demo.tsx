"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import { Button } from "./button";
import { Card } from "@/components/ui/card";
import { Home, Settings, User, Bell, Shield, CreditCard, HelpCircle, Star } from "lucide-react";

export function TabsDemo() {
  const [activeTab, setActiveTab] = React.useState("account");

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Tabs Component Examples</h2>
        
        {/* Default Tabs */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Default Tabs</h3>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card className="p-6">
                <h4 className="text-lg font-medium mb-2">Overview Content</h4>
                <p className="text-muted-foreground">
                  This is the overview tab content with default styling.
                </p>
              </Card>
            </TabsContent>
            <TabsContent value="analytics">
              <Card className="p-6">
                <h4 className="text-lg font-medium mb-2">Analytics Content</h4>
                <p className="text-muted-foreground">
                  Analytics data and charts would go here.
                </p>
              </Card>
            </TabsContent>
            <TabsContent value="reports">
              <Card className="p-6">
                <h4 className="text-lg font-medium mb-2">Reports Content</h4>
                <p className="text-muted-foreground">
                  Generated reports and exports would appear here.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Card Variant */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Card Variant</h3>
          <Tabs variant="card" defaultValue="profile" className="w-full">
            <TabsList variant="card">
              <TabsTrigger variant="card" value="profile" leftIcon={<User className="size-4" />}>
                Profile
              </TabsTrigger>
              <TabsTrigger variant="card" value="security" leftIcon={<Shield className="size-4" />}>
                Security
              </TabsTrigger>
              <TabsTrigger variant="card" value="billing" leftIcon={<CreditCard className="size-4" />}>
                Billing
              </TabsTrigger>
            </TabsList>
            <TabsContent variant="card" value="profile">
              <Card className="p-6">
                <h4 className="text-lg font-medium mb-2">Profile Settings</h4>
                <p className="text-muted-foreground">
                  Manage your profile information and preferences.
                </p>
              </Card>
            </TabsContent>
            <TabsContent variant="card" value="security">
              <Card className="p-6">
                <h4 className="text-lg font-medium mb-2">Security Settings</h4>
                <p className="text-muted-foreground">
                  Configure password, 2FA, and security preferences.
                </p>
              </Card>
            </TabsContent>
            <TabsContent variant="card" value="billing">
              <Card className="p-6">
                <h4 className="text-lg font-medium mb-2">Billing Information</h4>
                <p className="text-muted-foreground">
                  View and manage your subscription and payment methods.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Underline Variant */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Underline Variant</h3>
          <Tabs variant="underline" defaultValue="dashboard" className="w-full">
            <TabsList variant="underline">
              <TabsTrigger variant="underline" value="dashboard" leftIcon={<Home className="size-4" />}>
                Dashboard
              </TabsTrigger>
              <TabsTrigger variant="underline" value="notifications" leftIcon={<Bell className="size-4" />} badge="3">
                Notifications
              </TabsTrigger>
              <TabsTrigger variant="underline" value="settings" leftIcon={<Settings className="size-4" />}>
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent variant="underline" value="dashboard">
              <div className="p-6">
                <h4 className="text-lg font-medium mb-2">Dashboard</h4>
                <p className="text-muted-foreground">
                  Your main dashboard with key metrics and quick actions.
                </p>
              </div>
            </TabsContent>
            <TabsContent variant="underline" value="notifications">
              <div className="p-6">
                <h4 className="text-lg font-medium mb-2">Notifications</h4>
                <p className="text-muted-foreground">
                  You have 3 new notifications waiting for your attention.
                </p>
              </div>
            </TabsContent>
            <TabsContent variant="underline" value="settings">
              <div className="p-6">
                <h4 className="text-lg font-medium mb-2">Settings</h4>
                <p className="text-muted-foreground">
                  Application settings and configuration options.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Pills Variant */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Pills Variant</h3>
          <Tabs variant="pills" defaultValue="all" className="w-full">
            <TabsList variant="pills">
              <TabsTrigger variant="pills" value="all">
                All Items
              </TabsTrigger>
              <TabsTrigger variant="pills" value="active" badge="12">
                Active
              </TabsTrigger>
              <TabsTrigger variant="pills" value="completed" badge="48">
                Completed
              </TabsTrigger>
              <TabsTrigger variant="pills" value="archived">
                Archived
              </TabsTrigger>
            </TabsList>
            <TabsContent variant="pills" value="all">
              <Card className="p-6">
                <h4 className="text-lg font-medium mb-2">All Items</h4>
                <p className="text-muted-foreground">
                  Showing all items across all categories.
                </p>
              </Card>
            </TabsContent>
            <TabsContent variant="pills" value="active">
              <Card className="p-6">
                <h4 className="text-lg font-medium mb-2">Active Items</h4>
                <p className="text-muted-foreground">
                  Currently active items (12 total).
                </p>
              </Card>
            </TabsContent>
            <TabsContent variant="pills" value="completed">
              <Card className="p-6">
                <h4 className="text-lg font-medium mb-2">Completed Items</h4>
                <p className="text-muted-foreground">
                  Completed items (48 total).
                </p>
              </Card>
            </TabsContent>
            <TabsContent variant="pills" value="archived">
              <Card className="p-6">
                <h4 className="text-lg font-medium mb-2">Archived Items</h4>
                <p className="text-muted-foreground">
                  Archived and hidden items.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Size Variants */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Size Variants</h3>
          
          {/* Small */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Small Size</h4>
            <Tabs size="sm" defaultValue="tab1" className="w-full">
              <TabsList size="sm">
                <TabsTrigger size="sm" value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger size="sm" value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger size="sm" value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <Card className="p-4">
                  <p className="text-sm">Small tab content</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Large */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Large Size</h4>
            <Tabs size="lg" defaultValue="tab1" className="w-full">
              <TabsList size="lg">
                <TabsTrigger size="lg" value="tab1" leftIcon={<Star className="size-5" />}>
                  Featured
                </TabsTrigger>
                <TabsTrigger size="lg" value="tab2" leftIcon={<HelpCircle className="size-5" />}>
                  Help
                </TabsTrigger>
                <TabsTrigger size="lg" value="tab3" leftIcon={<Settings className="size-5" />}>
                  Settings
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <Card className="p-8">
                  <p className="text-base">Large tab content with more space</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Controlled Tabs */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Controlled Tabs</h3>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="danger">Danger Zone</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card className="p-6">
                <h4 className="text-lg font-medium mb-2">Account Settings</h4>
                <p className="text-muted-foreground mb-4">
                  Manage your account details and preferences.
                </p>
                <div className="space-y-2">
                  <p className="text-sm">Currently active tab: <strong>{activeTab}</strong></p>
                  <Button size="sm" onClick={() => setActiveTab("password")}>
                    Go to Password
                  </Button>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card className="p-6">
                <h4 className="text-lg font-medium mb-2">Password Settings</h4>
                <p className="text-muted-foreground mb-4">
                  Change your password and security settings.
                </p>
                <div className="space-y-2">
                  <p className="text-sm">Currently active tab: <strong>{activeTab}</strong></p>
                  <Button size="sm" onClick={() => setActiveTab("danger")}>
                    Go to Danger Zone
                  </Button>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="danger">
              <Card className="p-6 border-destructive">
                <h4 className="text-lg font-medium mb-2 text-destructive">Danger Zone</h4>
                <p className="text-muted-foreground mb-4">
                  Irreversible actions that affect your account.
                </p>
                <div className="space-y-2">
                  <p className="text-sm">Currently active tab: <strong>{activeTab}</strong></p>
                  <Button size="sm" variant="destructive" onClick={() => setActiveTab("account")}>
                    Back to Account
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
