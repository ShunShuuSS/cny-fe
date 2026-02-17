"use client";

import { useState, useEffect } from "react";
import CategoryRating from "./CategoryRating";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

interface ForecastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ForecastFormData) => void;
  zodiacName: string;
  zodiacImage: string;
  initialData?: ForecastFormData;
  loading?: boolean;
}

export interface ForecastFormData {
  general_forecast: string;
  ranking?: number;
  career: { text: string; rating?: number };
  wealth: { text: string; rating?: number };
  health: { text: string; rating?: number };
  romance: { text: string; rating?: number };
  lucky_number: string;
  source_link: string;
}

export default function ForecastModal({
  isOpen,
  onClose,
  onSave,
  zodiacName,
  zodiacImage,
  initialData,
  loading = false,
}: ForecastModalProps) {
  const [formData, setFormData] = useState<ForecastFormData>({
    general_forecast: "",
    ranking: undefined,
    career: { text: "", rating: undefined },
    wealth: { text: "", rating: undefined },
    health: { text: "", rating: undefined },
    romance: { text: "", rating: undefined },
    lucky_number: "",
    source_link: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        general_forecast: "",
        ranking: undefined,
        career: { text: "", rating: undefined },
        wealth: { text: "", rating: undefined },
        health: { text: "", rating: undefined },
        romance: { text: "", rating: undefined },
        lucky_number: "",
        source_link: "",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-cny-red to-cny-crimson p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={zodiacImage}
                alt={zodiacName}
                className="w-12 h-12 object-contain"
              />
              <div>
                <h2 className="text-2xl font-bold capitalize">{zodiacName}</h2>
                <p className="text-sm opacity-90">Forecast Management</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* General Forecast */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
              <Textarea
                label="GENERAL FORECAST"
                icon="📋"
                value={formData.general_forecast}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    general_forecast: e.target.value,
                  })
                }
                rows={5}
                className="border-blue-300 focus:ring-blue-500"
                placeholder="Overall forecast for this zodiac sign..."
              />
            </div>

            {/* Career */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200">
              <label className="flex items-center gap-2 text-lg font-semibold text-orange-900 mb-3">
                <span className="text-2xl">💼</span>
                <span>CAREER</span>
              </label>
              <textarea
                value={formData.career.text}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    career: { ...formData.career, text: e.target.value },
                  })
                }
                rows={4}
                required
                className="w-full px-3 py-2 border border-orange-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-black placeholder:text-gray-400"
                placeholder="Career forecast..."
              />
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (0.5 - 5.0)
                </label>
                <div className="flex items-center gap-3">
                  <CategoryRating
                    value={formData.career.rating}
                    onChange={(rating) =>
                      setFormData({
                        ...formData,
                        career: { ...formData.career, rating },
                      })
                    }
                    icon="💼"
                    category="career"
                  />
                  <input
                    type="number"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={formData.career.rating || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        career: {
                          ...formData.career,
                          rating: e.target.value
                            ? parseFloat(e.target.value)
                            : undefined,
                        },
                      })
                    }
                    className="w-24 px-3 py-2 border border-orange-300 rounded text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black placeholder:text-gray-400"
                    placeholder="2.5"
                  />
                </div>
              </div>
            </div>

            {/* Wealth */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg border border-yellow-300">
              <label className="flex items-center gap-2 text-lg font-semibold text-yellow-900 mb-3">
                <span className="text-2xl">💰</span>
                <span>WEALTH</span>
              </label>
              <textarea
                value={formData.wealth.text}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    wealth: { ...formData.wealth, text: e.target.value },
                  })
                }
                rows={4}
                required
                className="w-full px-3 py-2 border border-yellow-300 rounded-lg text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white text-black placeholder:text-gray-400"
                placeholder="Wealth forecast..."
              />
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (0.5 - 5.0)
                </label>
                <div className="flex items-center gap-3">
                  <CategoryRating
                    value={formData.wealth.rating}
                    onChange={(rating) =>
                      setFormData({
                        ...formData,
                        wealth: { ...formData.wealth, rating },
                      })
                    }
                    icon="💰"
                    category="wealth"
                  />
                  <input
                    type="number"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={formData.wealth.rating || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        wealth: {
                          ...formData.wealth,
                          rating: e.target.value
                            ? parseFloat(e.target.value)
                            : undefined,
                        },
                      })
                    }
                    className="w-24 px-3 py-2 border border-yellow-300 rounded text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-black placeholder:text-gray-400"
                    placeholder="2.5"
                  />
                </div>
              </div>
            </div>

            {/* Health */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border border-red-200">
              <label className="flex items-center gap-2 text-lg font-semibold text-red-900 mb-3">
                <span className="text-2xl">❤️</span>
                <span>HEALTH</span>
              </label>
              <textarea
                value={formData.health.text}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    health: { ...formData.health, text: e.target.value },
                  })
                }
                rows={4}
                required
                className="w-full px-3 py-2 border border-red-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-black placeholder:text-gray-400"
                placeholder="Health forecast..."
              />
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (0.5 - 5.0)
                </label>
                <div className="flex items-center gap-3">
                  <CategoryRating
                    value={formData.health.rating}
                    onChange={(rating) =>
                      setFormData({
                        ...formData,
                        health: { ...formData.health, rating },
                      })
                    }
                    icon="❤️"
                    category="health"
                  />
                  <input
                    type="number"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={formData.health.rating || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        health: {
                          ...formData.health,
                          rating: e.target.value
                            ? parseFloat(e.target.value)
                            : undefined,
                        },
                      })
                    }
                    className="w-24 px-3 py-2 border border-red-300 rounded text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent text-black placeholder:text-gray-400"
                    placeholder="2.5"
                  />
                </div>
              </div>
            </div>

            {/* Romance */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-300">
              <label className="flex items-center gap-2 text-lg font-semibold text-pink-900 mb-3">
                <span className="text-2xl">💕</span>
                <span>ROMANCE</span>
              </label>
              <textarea
                value={formData.romance.text}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    romance: { ...formData.romance, text: e.target.value },
                  })
                }
                rows={4}
                required
                className="w-full px-3 py-2 border border-pink-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white text-black placeholder:text-gray-400"
                placeholder="Romance forecast..."
              />
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (0.5 - 5.0)
                </label>
                <div className="flex items-center gap-3">
                  <CategoryRating
                    value={formData.romance.rating}
                    onChange={(rating) =>
                      setFormData({
                        ...formData,
                        romance: { ...formData.romance, rating },
                      })
                    }
                    icon="💕"
                    category="romance"
                  />
                  <input
                    type="number"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={formData.romance.rating || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        romance: {
                          ...formData.romance,
                          rating: e.target.value
                            ? parseFloat(e.target.value)
                            : undefined,
                        },
                      })
                    }
                    className="w-24 px-3 py-2 border border-pink-300 rounded text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="2.5"
                  />
                </div>
              </div>
            </div>

            {/* Additional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="number"
                label="Ranking (1-12)"
                icon="🏆"
                min="1"
                max="12"
                value={formData.ranking || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ranking: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
                placeholder="1-12"
              />
              <Input
                type="text"
                label="Lucky Number (optional)"
                icon="🍀"
                value={formData.lucky_number}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lucky_number: e.target.value,
                  })
                }
                placeholder="e.g., 8, 88, 3-7-9"
              />
              <Input
                type="url"
                label="Source Link (optional)"
                icon="🔗"
                value={formData.source_link}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    source_link: e.target.value,
                  })
                }
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-cny-red text-white rounded-lg hover:bg-cny-crimson transition-colors disabled:opacity-50 text-sm font-medium"
            >
              {loading ? "Saving..." : "Save Forecast"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
