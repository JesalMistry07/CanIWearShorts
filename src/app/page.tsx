"use client";

import { useEffect, useState } from "react";
import { useNavbar } from "./context/NavbarContext";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function Home() {

  const { isOpen } = useNavbar();
  const [inputValue, setInputValue] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(inputValue)}`);


      if (!res.ok) {
        setIsLoading(false);
        if (res.status === 400 || res.status === 500 ) {
          setInvalidInput(true);

        } else if (res.status === 429){
          alert("Rate limit exceeded. Please try again later.");
        } 
      }
      
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
      const pod = weather.pod;

      let canWearShorts: "true" | "false" | "maybe";

      if (temp >= 16 && windSpeed < 8 && precipitation < 4) {
        canWearShorts = "true";
      } else if (temp >= 11 && windSpeed < 4 && precipitation < 2) {
        canWearShorts = "maybe";
      } else {
        canWearShorts = "false";
      }

      router.push(
        `/result?temp=${temp}&appTemp=${appTemp}&wind=${windSpeed}&dir=${windDirection}&windCdir=${windCdir}&windDirFull=${windDirFull}&gust=${gust}&sunrise=${sunrise}&sunset=${sunset}&time=${timezone}&precip=${precipitation}&country=${countryCode}&city=${encodeURIComponent(
          city
        )}&visibility=${visibility}&clouds=${clouds}&uv=${uv}&aqi=${aqi}&rh=${rh}&dewPoint=${dewPoint}&lat=${lat}&lon=${lon}&solarRad=${solarRad}&weatherDesc=${encodeURIComponent(
          weatherDescription
        )}&weatherCode=${weatherCode}&weatherIcon=${weatherIcon}&canWearShorts=${canWearShorts}&ob_time=${ob_time}&pod=${pod}`
      );

    } catch (error) {
      console.error("Error fetching weather data:", error);

      if (error instanceof Error) {
        if (error.message.includes("400")) {
          alert("Location not found. Please try again.");
        }
      }
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
          <p>Enter your city to see if you can currently wear shorts!</p>
        ) : (
          <p>
            Enter your city to see if you can currently wear shorts in {inputValue}
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
            setInvalidInput(false);
            if (e.key === "Enter") {
              onEnter();
            }
          }}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> 
        <button
  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center justify-center min-w-[6rem]"
  onClick={onEnter}
  disabled={isLoading}
>
  {isLoading ? (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  ) : (
    "Search"
  )}
</button>

      </div>
      <div> {invalidInput && <p className="text-red-500 pt-4 text-center">Invalid Location - Please check the spelling of your location, or enter a new location </p>}</div>

    </main>
  );
}
