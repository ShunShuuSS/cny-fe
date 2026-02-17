"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RequireAuth from "@/components/auth/RequireAuth";
import AdminLayout from "@/components/layout/AdminLayout";
import * as api from "@/lib/api";
import { Users, Calendar, CheckCircle, XCircle } from "lucide-react";

interface Invitation {
  id: string;
  name: string;
  slug: string;
  is_active: number;
  created_at: string;
  url?: string;
}

export default function AdminDashboard() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadInvitations = async () => {
    try {
      const response = await api.get<{ success: boolean; data: Invitation[] }>(
        "/api/admin/invitations",
      );
      const invitationsData = response.data.map((inv) => ({
        ...inv,
        url: `${window.location.origin}/${inv.slug}`,
      }));
      setInvitations(invitationsData);
      setLoading(false);
    } catch {
      router.push("/admin/login");
    }
  };

  useEffect(() => {
    loadInvitations();
  }, []);

  const totalInvitations = invitations.length;
  const activeInvitations = invitations.filter((inv) => inv.is_active).length;
  const inactiveInvitations = totalInvitations - activeInvitations;

  if (loading) {
    return (
      <RequireAuth>
        <AdminLayout>
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-xl text-gray-600">Loading...</div>
          </div>
        </AdminLayout>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <AdminLayout>
        <div className="p-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🏮 Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome to the CNY Admin Dashboard - Manage your invitations and
              forecasts
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 uppercase">
                    Total Invitations
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {totalInvitations}
                  </p>
                </div>
                <Users className="w-12 h-12 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 uppercase">
                    Active
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {activeInvitations}
                  </p>
                </div>
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 uppercase">
                    Inactive
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {inactiveInvitations}
                  </p>
                </div>
                <XCircle className="w-12 h-12 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => router.push("/admin/invitations")}
                className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-cny-red hover:bg-red-50 transition-all"
              >
                <Users className="w-8 h-8 text-cny-red" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    Manage Invitations
                  </div>
                  <div className="text-sm text-gray-600">
                    Create and manage invitation links
                  </div>
                </div>
              </button>

              <button
                onClick={() => router.push("/admin/forecasts")}
                className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-cny-red hover:bg-red-50 transition-all"
              >
                <Calendar className="w-8 h-8 text-cny-red" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    Manage Forecasts
                  </div>
                  <div className="text-sm text-gray-600">
                    Update zodiac fortune predictions
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    </RequireAuth>
  );
}
