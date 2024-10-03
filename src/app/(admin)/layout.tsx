import SidebarComponentAdmin from "@/components/sidebar-component";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className='w-full flex h-screen'>
      {/* Sidebar */}
      <SidebarComponentAdmin />

      {/* Content */}
      {children}
    </div>
  );
}
