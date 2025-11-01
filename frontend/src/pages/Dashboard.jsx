import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Scan A', conflicts: 12, repairs: 8 },
  { name: 'Scan B', conflicts: 19, repairs: 16 },
  { name: 'Scan C', conflicts: 3, repairs: 3 },
  { name: 'Scan D', conflicts: 27, repairs: 20 },
  { name: 'Scan E', conflicts: 23, repairs: 18 },
];

const Dashboard = () => {
  return (
    <main className="flex-1 p-8 bg-background">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-textPrimary mb-8">Dashboard</h1>

        <section id="health-overview" className="mb-12">
          <h2 className="text-2xl font-semibold text-textPrimary mb-4">Health Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Conflicts Detected</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">42</p>
                <p className="text-textSecondary">in the last 7 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Repairs Made</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">34</p>
                <p className="text-textSecondary">automatically</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-secondary">99%</p>
                <p className="text-textSecondary">Excellent</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="conflict-viewer" className="mb-12">
          <h2 className="text-2xl font-semibold text-textPrimary mb-4">Conflict Viewer</h2>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File</TableHead>
                  <TableHead>Conflict Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>preferences.json</TableCell>
                  <TableCell>Duplicate Key</TableCell>
                  <TableCell>2025-10-31</TableCell>
                  <TableCell>Resolved</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>settings.xml</TableCell>
                  <TableCell>Invalid Value</TableCell>
                  <TableCell>2025-10-30</TableCell>
                  <TableCell>Pending</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </section>

        <section id="repair-actions" className="mb-12">
          <h2 className="text-2xl font-semibold text-textPrimary mb-4">Repair Actions</h2>
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <p className="text-textSecondary">Recommended action for pending conflicts.</p>
              <Button>One-Click Fix</Button>
            </CardContent>
          </Card>
        </section>

        <section id="logs-reports" className="mb-12">
          <h2 className="text-2xl font-semibold text-textPrimary mb-4">Logs & Reports</h2>
          <Tabs defaultValue="logs">
            <TabsList>
              <TabsTrigger value="logs">Real-time Logs</TabsTrigger>
              <TabsTrigger value="reports">Scan Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="logs">
              <Card>
                <CardContent className="p-6">
                  <pre className="text-sm bg-gray-100 p-4 rounded-lg">
                    [INFO] Scan started at 2025-10-31 17:15:00
                    [WARN] Duplicate key found in preferences.json
                    [INFO] Repair applied successfully
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reports">
              <Card>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="conflicts" fill="#007AFF" />
                      <Bar dataKey="repairs" fill="#00B894" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
