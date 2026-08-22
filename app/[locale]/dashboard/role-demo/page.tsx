/**
 * Role-Aware Dashboard Demo Page
 * Demonstrates role switching and per-role dashboard layouts
 */

'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/navigation/MainLayout';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { RoleAwareDashboard, RoleSwitcher, RoleInfo } from '@/components/dashboard/RoleAwareDashboard';
import { getAllRoleConfigs } from '@/config/roleConfig';
import type { Role } from '@/types/user';

export default function RoleDemoDashboardPage() {
  const [selectedRole, setSelectedRole] = useState<Role>('management');
  const roles = getAllRoleConfigs();

  const handleRoleChange = (role: Role) => {
    setSelectedRole(role);
  };

  return (
    <MainLayout>
      <RoleAwareDashboard onRoleChange={handleRoleChange}>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Role-Aware Dashboard Demo
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Test role switching and see how the dashboard adapts to different user roles
              </p>
            </div>
            <div className="flex-shrink-0">
              <RoleSwitcher />
            </div>
          </div>

          {/* Role Information Card */}
          <RoleInfo />

          {/* Test Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Test Flow */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Test Flow
              </h2>
              <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-3">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 flex-shrink-0">1.</span>
                  <span>Start with &quot;Management&quot; role (default)</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 flex-shrink-0">2.</span>
                  <span>Select &quot;CFO&quot; from the role dropdown</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 flex-shrink-0">3.</span>
                  <span>Dashboard updates with CFO-specific widgets</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 flex-shrink-0">4.</span>
                  <span>Try different roles and observe changes</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 flex-shrink-0">5.</span>
                  <span>Refresh the page - role is persisted!</span>
                </li>
              </ol>
            </div>

            {/* Expected Behavior */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Expected Behavior
              </h2>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-3">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Widget visibility filtered by role</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Smooth fade transition on role change</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Role persists across page refreshes</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Widget order resets to role defaults</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Custom layouts saved per role</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Role Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    Widget Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr
                    key={role.role}
                    className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${
                      selectedRole === role.role
                        ? 'bg-indigo-50 dark:bg-indigo-900/20'
                        : ''
                    }`}
                    onClick={() => handleRoleChange(role.role)}
                  >
                    <td className="py-3 px-4">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {role.name}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {role.description}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {role.widgets.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Dashboard Preview */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Dashboard Preview
            </h2>
            <div>
              <DashboardContent />
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
            <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-4">
              Features Implemented
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-indigo-900 dark:text-indigo-100 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">✓</span>
                <span>Role-based widget visibility</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">✓</span>
                <span>Per-role default layouts</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">✓</span>
                <span>Role persistence (localStorage)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">✓</span>
                <span>Zustand integration</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">✓</span>
                <span>Smooth transitions</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">✓</span>
                <span>Custom per-role layouts</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">✓</span>
                <span>Role switcher UI component</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">✓</span>
                <span>Role info display component</span>
              </div>
            </div>
          </div>
        </div>
      </RoleAwareDashboard>
    </MainLayout>
  );
}
