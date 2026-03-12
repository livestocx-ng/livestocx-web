'use client';
import { AppShell } from '@mantine/core';
import DashboardShellHeader from '@/core/components/navigation/dashboard-shell-header';
import DashboardSideNavigation from '@/core/components/navigation/dashboard_side_navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      header={{ height: 50 }}
      styles={{ main: { margin: 0 } }}
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: true } }}
    >
      <DashboardShellHeader />
      <AppShell.Navbar>
        <DashboardSideNavigation />
      </AppShell.Navbar>
      <AppShell.Main bg="gray.0">{children}</AppShell.Main>
    </AppShell>
  );
}
