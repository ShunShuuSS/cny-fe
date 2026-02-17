"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LogOut,
  LayoutDashboard,
  ScrollText,
  Calendar,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    id: "invitations",
    icon: ScrollText,
    label: "Invitations",
    path: "/admin/invitations",
  },
  {
    id: "forecasts",
    icon: Calendar,
    label: "Forecasts",
    path: "/admin/forecasts",
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // Closed by default on mobile

  return (
    <div className="flex flex-row-reverse h-screen bg-gray-50 relative">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-40">
        <h1 className="text-xl font-bold text-cny-red">🏮 CNY Admin</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
      </header>

      {/* Backdrop Overlay for Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          bg-white border-l border-gray-200 flex flex-col transition-all duration-300
          fixed lg:relative h-full z-50 right-0
          ${
            isOpen
              ? "translate-x-0 w-64"
              : "translate-x-full lg:translate-x-0 lg:w-16"
          }
        `}
      >
        {/* Logo/Brand - Desktop Only */}
        <div className="hidden lg:flex h-16 items-center justify-between px-4 border-b border-gray-200">
          {isOpen && (
            <h1 className="text-xl font-bold text-cny-red">🏮 CNY Admin</h1>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Header in Sidebar */}
        <div className="lg:hidden h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-cny-red">🏮 CNY Admin</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <button
                key={item.id}
                onClick={() => {
                  router.push(item.path);
                  setIsOpen(false); // Close sidebar on mobile after navigation
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-cny-red text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                title={!isOpen ? item.label : undefined}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className={isOpen ? "" : "lg:hidden"}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            title={!isOpen ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className={isOpen ? "" : "lg:hidden"}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-16 lg:pt-0">{children}</main>
    </div>
  );
}
