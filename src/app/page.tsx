"use client";

import { useEffect, useState } from "react";
import { useNavbar } from "./context/NavbarContext";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isOpen } = useNavbar();
  const [inputValue, setInputValue] = useState("");

  const locations = ["London", "Madrid", "Nairobi", "Singapore", "Orlando", "Kuala Lumpur", "Lisbon"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % locations.length);
    }, 2000); // every 2 seconds

    return () => clearInterval(interval);
  }, []);

  async function onEnter() {
    try {
      const res = await fetch("https://api.weatherbit.io/v2.0/current?%26&key=a19e363042d6442da36eb48d0fd68e1c&%26&city=" + `${inputValue}`);
      const data = await res.json();
      const weather = data.data[0];
      const temp = weather.temp;
      const appTemp = weather.app_temp;
      const timezone = weather.datetime;
      const precipitation = weather.precip;
      const windSpeed = weather.wind_spd;
      const windDirection = weather.wind_dir;
      const windDirFull = weather.wind_cdir_full;
      const windCdir = weather.wind_cdir;
      const gust = weather.gust;
      const city = weather.city_name;
      const countryCode = weather.country_code;
      const visibility = weather.vis;
      const clouds = weather.clouds;
      const sunrise = weather.sunrise;
      const sunset = weather.sunset;
      const uv = weather.uv;
      const aqi = weather.aqi;
      const rh = weather.rh;
      const dewPoint = weather.dewpt;
      const lat = weather.lat;
      const lon = weather.lon;
      const solarRad = weather.solar_rad;
      const weatherDescription = weather.weather.description;
      const weatherCode = weather.weather.code;
      const weatherIcon = weather.weather.icon;
      const ob_time = weather.ob_time;

      let canWearShorts: "true" | "false" | "maybe";

      if (temp >= 16 && windSpeed < 8 && precipitation < 4) {
        canWearShorts = "true";
      } else if (temp >= 11 && windSpeed < 7 && precipitation < 2) {
        canWearShorts = "maybe";
      } else {
        canWearShorts = "false";
      }

      router.push(
        `/result?temp=${temp}&appTemp=${appTemp}&wind=${windSpeed}&dir=${windDirection}&windCdir=${windCdir}&windDirFull=${windDirFull}&gust=${gust}&sunrise=${sunrise}&sunset=${sunset}&time=${timezone}&precip=${precipitation}&country=${countryCode}&city=${encodeURIComponent(
          city
        )}&visibility=${visibility}&clouds=${clouds}&uv=${uv}&aqi=${aqi}&rh=${rh}&dewPoint=${dewPoint}&lat=${lat}&lon=${lon}&solarRad=${solarRad}&weatherDesc=${encodeURIComponent(
          weatherDescription
        )}&weatherCode=${weatherCode}&weatherIcon=${weatherIcon}&canWearShorts=${canWearShorts}&ob_time=${ob_time}`
      );

    } catch (error) {
      router.push("/errorPage");
      console.error("Fetch failed:", error);
    }
  }

  return (
    <main
      className={`min-h-dvh flex flex-col items-center justify-center px-4 overflow-hidden transition-all duration-300 ${isOpen ? "blur-md" : ""
        }`}
    >
      <h1 className="text-4xl font-semibold mb-2 text-center">
        Can I Wear Shorts?
      </h1>

      {/* 👇 Rolling Locations */}
      <div className="text-center h-12 mb-4 relative overflow-hidden">
        <p
          key={locations[currentIndex]} // triggers animation on change
          className="text-2xl font-semibold text-black transition-transform duration-500 ease-in-out animate-slide-down"
        >
          in {locations[currentIndex]}?
        </p>
      </div>



      {/* Message */}
      <div className="text-center flex justify-center mb-4">
        {inputValue === "" ? (
          <p>Enter a location to see if you can wear shorts!</p>
        ) : (
          <p>
            Enter a location to see if you can wear shorts in {inputValue}
          </p>
        )}
      </div>

      {/* Input + Button */}
      <div className="flex w-full max-w-md items-center space-x-2">
        <input
          type="text"
          placeholder="Enter a location"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.trimStart())}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onEnter();
            }
          }}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={onEnter}>
          Search
        </button>
      </div>
    </main>
  );
}
