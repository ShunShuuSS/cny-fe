"use client";

import { useState, useEffect } from "react";
import RequireAuth from "@/components/auth/RequireAuth";
import AdminLayout from "@/components/layout/AdminLayout";
import CategoryRating from "@/components/admin/CategoryRating";
import ForecastModal, {
  ForecastFormData,
} from "@/components/admin/ForecastModal";
import * as api from "@/lib/api";

interface Zodiac {
  id: number;
  name: string;
  name_en: string;
  image?: string;
  year?: number;
  ranking?: number;
  created_at: string;
}

interface Forecast {
  id: number;
  zodiac_id: number;
  year: number;
  general_forecast?: string;
  ranking?: number;
  career_data: string;
  wealth_data: string;
  health_data: string;
  romance_data: string;
  lucky_number?: string;
  source_link?: string;
  created_at: string;
  updated_at: string;
}

// Generate zodiac year ranges (e.g., 1948, 1960, 1972, 1984, 1996, 2008)
function getZodiacYears(baseYear: number, count: number = 6): string {
  const years: number[] = [];

  // Generate years going backwards from base year (count-1) times
  // This creates a range like: baseYear-60, baseYear-48, baseYear-36, baseYear-24, baseYear-12, baseYear
  for (let i = count - 1; i >= 0; i--) {
    years.push(baseYear - i * 12);
  }

  return years.join(", ");
}

export default function ForecastsPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedZodiac, setSelectedZodiac] = useState<string>("all");
  const [zodiacs, setZodiacs] = useState<Zodiac[]>([]);
  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingZodiacId, setEditingZodiacId] = useState<number | null>(null);
  const [modalData, setModalData] = useState<ForecastFormData | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    loadZodiacs();
    loadForecasts();
  }, [selectedYear]);

  const loadZodiacs = async () => {
    try {
      const response = await api.get<{
        success: boolean;
        data: { zodiacs: Zodiac[] };
      }>("/api/admin/forecasts/zodiacs");
      setZodiacs(response.data.zodiacs);
    } catch (error) {
      console.error("Failed to load zodiacs:", error);
    }
  };

  const loadForecasts = async () => {
    try {
      const response = await api.get<{
        success: boolean;
        data: { forecasts: Forecast[]; zodiacs: Zodiac[] };
      }>(`/api/admin/forecasts/year/${selectedYear}`);
      setForecasts(response.data.forecasts);
    } catch (error) {
      console.error("Failed to load forecasts:", error);
    }
  };

  const handleEdit = (zodiacId: number) => {
    const forecast = forecasts.find((f) => f.zodiac_id === zodiacId);
    if (forecast) {
      const career = JSON.parse(
        forecast.career_data || '{"text":"","rating":undefined}',
      );
      const wealth = JSON.parse(
        forecast.wealth_data || '{"text":"","rating":undefined}',
      );
      const health = JSON.parse(
        forecast.health_data || '{"text":"","rating":undefined}',
      );
      const romance = JSON.parse(
        forecast.romance_data || '{"text":"","rating":undefined}',
      );

      setModalData({
        general_forecast: forecast.general_forecast || "",
        ranking: forecast.ranking,
        career: { text: career.text || "", rating: career.rating },
        wealth: { text: wealth.text || "", rating: wealth.rating },
        health: { text: health.text || "", rating: health.rating },
        romance: { text: romance.text || "", rating: romance.rating },
        lucky_number: forecast.lucky_number || "",
        source_link: forecast.source_link || "",
      });
    } else {
      setModalData(undefined);
    }
    setEditingZodiacId(zodiacId);
    setIsModalOpen(true);
    setMessage(null);
  };

  const handleModalSave = async (data: ForecastFormData) => {
    if (!editingZodiacId) return;

    setLoading(true);
    setMessage(null);

    try {
      await api.post("/api/admin/forecasts", {
        zodiac_id: editingZodiacId,
        year: selectedYear,
        ...data,
      });

      setMessage({ type: "success", text: "Forecast saved successfully!" });
      await loadForecasts();
      setIsModalOpen(false);
      setEditingZodiacId(null);
      setModalData(undefined);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error ? error.message : "Failed to save forecast",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingZodiacId(null);
    setModalData(undefined);
  };

  const handleDelete = async (zodiacId: number) => {
    if (!confirm("Are you sure you want to delete this forecast?")) return;

    setLoading(true);
    setMessage(null);

    try {
      await api.del(`/api/admin/forecasts/${zodiacId}/${selectedYear}`);
      setMessage({ type: "success", text: "Forecast deleted successfully!" });
      await loadForecasts();
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error ? error.message : "Failed to delete forecast",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredZodiacs =
    selectedZodiac === "all"
      ? zodiacs
      : zodiacs.filter((z) => z.name_en === selectedZodiac);

  const editingZodiac = editingZodiacId
    ? zodiacs.find((z) => z.id === editingZodiacId)
    : null;

  return (
    <RequireAuth>
      <AdminLayout>
        <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Zodiac Forecasts Management
            </h1>
            <p className="text-gray-600">
              Manage fortune forecasts for each zodiac sign by year
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  style={{ color: "#000000" }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cny-red focus:border-transparent"
                >
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() + i - 2;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zodiac
                </label>
                <select
                  value={selectedZodiac}
                  onChange={(e) => setSelectedZodiac(e.target.value)}
                  style={{ color: "#000000" }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cny-red focus:border-transparent"
                >
                  <option value="all">All Zodiacs</option>
                  {zodiacs.map((zodiac) => (
                    <option key={zodiac.id} value={zodiac.name_en}>
                      {zodiac.name_en.charAt(0).toUpperCase() +
                        zodiac.name_en.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Zodiac Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredZodiacs.map((zodiac) => {
              const forecast = forecasts.find((f) => f.zodiac_id === zodiac.id);

              return (
                <div
                  key={zodiac.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="bg-gradient-to-r from-cny-red to-cny-crimson p-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-3">
                        {zodiac.image && (
                          <img
                            src={zodiac.image}
                            alt={zodiac.name_en}
                            className="w-12 h-12 object-contain"
                          />
                        )}
                        <div>
                          <h3 className="text-xl font-bold capitalize">
                            {zodiac.name_en}
                          </h3>
                          <p className="text-sm opacity-90">{zodiac.name}</p>
                        </div>
                      </div>
                      {zodiac.year && (
                        <div className="text-right">
                          <div className="text-xs opacity-75">Years</div>
                          <div className="text-xs font-semibold leading-tight">
                            {getZodiacYears(zodiac.year)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 min-h-[300px] flex flex-col">
                    {forecast ? (
                      <>
                        <div className="flex-1 space-y-2 mb-4">
                          {(() => {
                            const career = JSON.parse(
                              forecast.career_data || '{"text":""}',
                            );
                            const wealth = JSON.parse(
                              forecast.wealth_data || '{"text":""}',
                            );
                            const health = JSON.parse(
                              forecast.health_data || '{"text":""}',
                            );
                            const romance = JSON.parse(
                              forecast.romance_data || '{"text":""}',
                            );

                            return (
                              <>
                                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-2 rounded border border-orange-200">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-orange-900 flex items-center gap-1">
                                      <span>💼</span> CAREER
                                    </span>
                                    {career.rating && (
                                      <CategoryRating
                                        value={career.rating}
                                        readonly
                                        icon="💼"
                                        category="career"
                                      />
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-700 mt-1 line-clamp-2">
                                    {career.text}
                                  </p>
                                </div>

                                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-2 rounded border border-yellow-300">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-yellow-900 flex items-center gap-1">
                                      <span>💰</span> WEALTH
                                    </span>
                                    {wealth.rating && (
                                      <CategoryRating
                                        value={wealth.rating}
                                        readonly
                                        icon="💰"
                                        category="wealth"
                                      />
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-700 mt-1 line-clamp-2">
                                    {wealth.text}
                                  </p>
                                </div>

                                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-2 rounded border border-red-200">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-red-900 flex items-center gap-1">
                                      <span>❤️</span> HEALTH
                                    </span>
                                    {health.rating && (
                                      <CategoryRating
                                        value={health.rating}
                                        readonly
                                        icon="❤️"
                                        category="health"
                                      />
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-700 mt-1 line-clamp-2">
                                    {health.text}
                                  </p>
                                </div>

                                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-2 rounded border border-pink-300">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-pink-900 flex items-center gap-1">
                                      <span>💕</span> ROMANCE
                                    </span>
                                    {romance.rating && (
                                      <CategoryRating
                                        value={romance.rating}
                                        readonly
                                        icon="💕"
                                        category="romance"
                                      />
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-700 mt-1 line-clamp-2">
                                    {romance.text}
                                  </p>
                                </div>
                              </>
                            );
                          })()}
                        </div>

                        <div className="flex gap-2 mt-auto">
                          <button
                            onClick={() => handleEdit(zodiac.id)}
                            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(zodiac.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <p className="text-gray-500 text-sm mb-4">
                          No forecast for {selectedYear}
                        </p>
                        <button
                          onClick={() => handleEdit(zodiac.id)}
                          className="bg-cny-red text-white px-6 py-2 rounded-lg hover:bg-cny-crimson transition-colors text-sm font-medium"
                        >
                          Add Forecast
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Forecast Modal */}
        {editingZodiac && (
          <ForecastModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSave={handleModalSave}
            zodiacName={editingZodiac.name_en}
            zodiacImage={editingZodiac.image || ""}
            initialData={modalData}
            loading={loading}
          />
        )}
      </AdminLayout>
    </RequireAuth>
  );
}
