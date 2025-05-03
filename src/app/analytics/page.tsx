"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useNavbar } from "../context/NavbarContext";

export default function AnalyticsPage() {

  const {isOpen} = useNavbar();
  const [analytics, setAnalytics] = useState<any>(null);
  const lookup = require('country-code-lookup')
  const [showCounts, setShowCounts] = useState(false);

  const [countryViewMode, setCountryViewMode] = useState("table"); // "table" or "pie"
  const [showCountryCounts, setShowCountryCounts] = useState(false);



  const [cityViewMode, setCityViewMode] = useState<"table" | "pie">("table");
  const COLORS = ["#6366F1", "#60A5FA", "#34D399", "#F59E0B", "#F87171", "#A78BFA", "#FBBF24", "#4ADE80", "#F472B6", "#38BDF8"];

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/analytics");
        const data = await res.json();
        setAnalytics(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      }
    }
    fetchAnalytics();
  }, []);

  if (!analytics) {
    return (
      <div className={`min-h-dvh flex flex-col pt-32 ${isOpen ? "blur-md" : ""}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">

          {/* Skeleton looaddding card */}
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}

          {/* Total Searches Skeleton at theee bottom */}
          <div className="col-span-1 md:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-6"></div>
              <div className="h-12 bg-gray-200 rounded w-1/4 mx-auto"></div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-dvh flex flex-col pt-20 md:pt-30 ${isOpen ? "blur-md" : ""}`}>
      <div>
        <div className="px-4 md:px-8">
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center">Analytics Dashboard 📈</h1>
            <p className="text-gray-500 text-sm mt-2 text-center">Insights from all the searches</p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 text-center gap-6 p-4">

          {/* Top Cities */}
          <div className="bg-white rounded-2xl shadow-md p-6 relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 ">Top 10 Cities</h2>
              <div className="space-x-2">
                <button
                  onClick={() => setCityViewMode("table")}
                  className={`px-3 py-1 text-sm rounded-full ${cityViewMode === "table" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                  Table
                </button>
                <button
                  onClick={() => setCityViewMode("pie")}
                  className={`px-3 py-1 text-sm rounded-full ${cityViewMode === "pie" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                  Pie
                </button>
              </div>
            </div>

            {/* Content */}
            {cityViewMode === "table" ? (
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-gray-500 uppercase text-sm border-b border-black text-center">
                    <th className="pb-2">City</th>
                    <th className="pb-2">Country</th>
                    <th className="pb-2">Searches</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.topCities.map((city: any, index: number) => (
                    <tr
                      key={index}
                      className={`${index !== analytics.topCities.length - 1 ? "border-b border-black" : ""} hover:bg-gray-100 transition`}
                    >
                      <td className="py-2 text-center font-medium">{city.city}</td>
                      <td className="py-2 text-center">{lookup.byIso(city.countryCode)?.country}</td>
                      <td className="py-2 text-center">{city.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics.topCities}
                      dataKey="count"
                      nameKey="city"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                      onClick={() => setShowCounts((prev) => !prev)}
                      label={({ name, count }: any) => showCounts ? count : name}
                    >
                      {analytics.topCities.map((_: any, index: number) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Top Countries */}
          <div className="bg-white rounded-2xl shadow-md p-6 relative">
            {/* Header with buttons */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Top 10 Countries</h2>
              <div className="space-x-2">
                <button
                  onClick={() => setCountryViewMode("table")}
                  className={`px-3 py-1 text-sm rounded-full ${countryViewMode === "table" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                  Table
                </button>
                <button
                  onClick={() => setCountryViewMode("pie")}
                  className={`px-3 py-1 text-sm rounded-full ${countryViewMode === "pie" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                  Pie
                </button>
              </div>
            </div>

            {/* Content */}
            {countryViewMode === "table" ? (
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-gray-500 uppercase text-sm border-b border-black text-center">
                    <th className="pb-2">Country</th>
                    <th className="pb-2">Searches</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.topCountries.map((country: any, index: number) => (
                    <tr
                      key={index}
                      className={`${index !== analytics.topCountries.length - 1 ? "border-b border-black" : ""} hover:bg-gray-100 transition`}
                    >
                      <td className="py-2 text-center font-medium">{lookup.byIso(country.countryCode)?.country}</td>
                      <td className="py-2 text-center">{country.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics.topCountries}
                      dataKey="count"
                      nameKey="countryCode"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                      onClick={() => setShowCountryCounts((prev) => !prev)}
                      label={({ countryCode, count }: any) =>
                        showCountryCounts
                          ? count
                          : lookup.byIso(countryCode)?.country || countryCode
                      }
                    >
                      {analytics.topCountries.map((_: any, index: number) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Hottest Location */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Hottest Location 🔥</h2>
            <div className="text-center text-lg font-medium text-gray-700">
              {analytics.hottestLocation.city}, {lookup.byIso(analytics.hottestLocation.countryCode)?.country}
            </div>
            <div className="text-center mt-2 text-3xl font-bold text-red-500">
              {analytics.hottestLocation.temperature}°C
            </div>
            <div className="text-center mt-2 text-sm text-gray-500">
              {new Date(analytics.hottestLocation.searchedAt).toLocaleString()}
            </div>
          </div>

          {/* Coldest Location */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Coldest Location ❄️</h2>
            <div className="text-center text-lg font-medium text-gray-700">
              {analytics.coldestLocation.city}, {lookup.byIso(analytics.coldestLocation.countryCode)?.country}
            </div>
            <div className="text-center mt-2 text-3xl font-bold text-blue-500">
              {analytics.coldestLocation.temperature}°C
            </div>
            <div className="text-center mt-2 text-sm text-gray-500">
              {new Date(analytics.coldestLocation.searchedAt).toLocaleString()}
            </div>
          </div>

          {/* Windiest Location */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Windiest Location 💨</h2>
            <div className="text-center text-lg font-medium text-gray-700">
              {analytics.windiestLocation.city}, {lookup.byIso(analytics.windiestLocation.countryCode)?.country}
            </div>
            <div className="text-center mt-2 text-3xl font-bold text-gray-500">
              {analytics.windiestLocation.windSpeed} m/s
            </div>
            <div className="text-center mt-2 text-sm text-gray-500">
              {new Date(analytics.windiestLocation.searchedAt).toLocaleString()}
            </div>
          </div>

          {/* Most Searched Time of Day */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Most Searched Time of Day </h2>
            <div className="text-center text-3xl font-bold text-gray-700">
              {analytics.timeOfDay.pod === "d" ? "Daytime ☀️" : "Nighttime 🌑"}
            </div>
            <div className="text-center mt-2 text-lg">
              {analytics.timeOfDay.count} searches
            </div>
          </div>

        </div> 

        {/* Total Searches (Full Width) */}
        <div className="p-4">
          <div className="bg-white rounded-2xl shadow-md p-6 w-full">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">Total Searches</h2>
            <div className="text-center mt-2 text-5xl font-extrabold">
              {analytics.totalSearches}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
