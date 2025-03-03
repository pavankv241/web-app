"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import { Sun, Moon } from "lucide-react"; // Icons for toggle button

const fetchCryptoPrices = async () => {
  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano,solana&vs_currencies=usd"
  );
  return data;
};

export default function Page() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["crypto"],
    queryFn: fetchCryptoPrices,
  });

  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  // Persist theme preference in local storage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setDarkMode(storedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  if (isLoading)
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-black" : "bg-white"}`}>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className={`mt-4 text-lg ${darkMode ? "text-white" : "text-black"}`}>
            Fetching latest prices...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <p className={`text-center mt-10 text-lg ${darkMode ? "text-red-500" : "text-red-700"}`}>
        Error fetching data
      </p>
    );

  const filteredData = Object.entries(data).filter(([key]) =>
    key.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-black dark:to-gray-900 flex flex-col items-center p-6 transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between w-full max-w-lg mb-6">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 dark:text-white">
            Crypto Price Tracker
          </h1>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition hover:opacity-80"
          >
            {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-800" />}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-80 mb-6">
          <input
            type="text"
            placeholder="Search cryptocurrency..."
            className="w-full p-3 bg-gray-200 text-black dark:bg-gray-800 dark:text-white rounded-md focus:ring-2 focus:ring-purple-500 outline-none transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Refresh Button */}
{/* Refresh Button */}
        <button
          onClick={() => window.location.reload()} // Refresh the whole page
          className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-lg text-white font-semibold mb-6 hover:opacity-80 transition duration-300"
        >
          Refresh Prices
        </button>


        {/* Card Container */}
        <div className="w-full max-w-md bg-gray-100 dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-300 dark:border-gray-800 transition">
          {filteredData.length > 0 ? (
            filteredData.map(([crypto, { usd }]) => (
              <div
                key={crypto}
                className="flex justify-between p-4 border-b border-gray-300 dark:border-gray-700 last:border-0 hover:bg-gray-200 dark:hover:bg-gray-800 transition rounded-lg"
              >
                <span className="capitalize text-lg text-gray-900 dark:text-gray-300">{crypto}</span>
                <span className="text-lg font-semibold text-black dark:text-white">
                  ${usd.toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
}
