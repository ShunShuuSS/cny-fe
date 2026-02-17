"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RequireAuth from "@/components/auth/RequireAuth";
import AdminLayout from "@/components/layout/AdminLayout";
import * as api from "@/lib/api";
import { Plus, Copy, Check, ExternalLink, Trash2 } from "lucide-react";
import Input from "@/components/ui/Input";

interface Invitation {
  id: string;
  name: string;
  slug: string;
  year?: number;
  is_active: number;
  reward_code?: string | null;
  created_at: string;
  url?: string;
}

export default function AdminDashboard() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newInvitationName, setNewInvitationName] = useState("");
  const [newRewardCode, setNewRewardCode] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchName, setSearchName] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const router = useRouter();

  const loadInvitations = async () => {
    try {
      const response = await api.get<{ success: boolean; data: Invitation[] }>(
        "/api/admin/invitations",
      );
      const invitationsData = response.data.map((inv) => ({
        ...inv,
        url: `${window.location.origin}/${inv.year || new Date().getFullYear()}/${inv.slug}`,
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

  const createInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvitationName.trim()) return;

    try {
      await api.post("/api/admin/invitations", {
        name: newInvitationName,
        reward_code: newRewardCode.trim() || undefined,
      });
      setNewInvitationName("");
      setNewRewardCode("");
      setShowCreateModal(false);
      await loadInvitations();
    } catch (error) {
      alert("Failed to create invitation");
    }
  };

  const toggleInvitation = async (id: string) => {
    try {
      await api.patch(`/api/admin/invitations/${id}/toggle`);
      await loadInvitations();
    } catch (error) {
      alert("Failed to toggle invitation");
    }
  };

  const copyToClipboard = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      alert("Failed to copy URL");
    }
  };

  const deleteInvitation = async (id: string) => {
    try {
      await api.del(`/api/admin/invitations/${id}`);
      setDeleteConfirmId(null);
      await loadInvitations();
    } catch (error) {
      alert("Failed to delete invitation");
    }
  };

  const filteredInvitations = invitations.filter((inv) => {
    const matchesName = inv.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const matchesCode = inv.slug
      .toLowerCase()
      .includes(searchCode.toLowerCase());
    return matchesName && matchesCode;
  });

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
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Invitations</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-cny-red text-white rounded-lg hover:bg-cny-red-dark transition-all"
              >
                <Plus size={20} />
                Create Invitation
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  label="Search by Name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Search invitation name..."
                />
                <Input
                  type="text"
                  label="Search by Code"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="Search invitation code/slug..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invitation URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvitations.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No invitations found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredInvitations.map((invitation) => (
                    <tr
                      key={invitation.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {invitation.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {invitation.url}
                          </code>
                          <button
                            onClick={() =>
                              copyToClipboard(invitation.url!, invitation.id)
                            }
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Copy URL"
                          >
                            {copiedId === invitation.id ? (
                              <Check size={16} className="text-green-600" />
                            ) : (
                              <Copy size={16} className="text-gray-600" />
                            )}
                          </button>
                          <a
                            href={invitation.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Open in new tab"
                          >
                            <ExternalLink size={16} className="text-gray-600" />
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            invitation.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {invitation.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleInvitation(invitation.id)}
                            className="text-cny-red hover:text-cny-red-dark font-medium"
                          >
                            {invitation.is_active ? "Deactivate" : "Activate"}
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(invitation.id)}
                            className="p-1 hover:bg-red-50 rounded transition-colors"
                            title="Delete invitation"
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {deleteConfirmId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <Trash2 className="text-red-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Delete Invitation?
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this invitation? This action
                cannot be undone and will also delete all associated user
                sessions and data.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteInvitation(deleteConfirmId)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Create New Invitation
              </h3>
              <form onSubmit={createInvitation}>
                <div className="mb-4">
                  <Input
                    type="text"
                    id="name"
                    label="Invitation Name"
                    value={newInvitationName}
                    onChange={(e) => setNewInvitationName(e.target.value)}
                    required
                    placeholder="e.g., John's CNY Party"
                  />
                </div>
                <div className="mb-4">
                  <Input
                    type="text"
                    id="reward_code"
                    label="Reward Code (Optional)"
                    value={newRewardCode}
                    onChange={(e) => setNewRewardCode(e.target.value)}
                    placeholder="e.g., BAGIBAGI2026"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This code will be shown to users after they view their
                    fortune
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-cny-red text-white rounded-lg hover:bg-cny-red-dark transition-colors"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AdminLayout>
    </RequireAuth>
  );
}
