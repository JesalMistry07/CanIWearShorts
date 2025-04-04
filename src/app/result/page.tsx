"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import { useNavbar } from "../context/NavbarContext";

const getFloat = (value: string | null): number | undefined => {
  const num = parseFloat(value ?? "");
  return isNaN(num) ? undefined : num;
};

const getInt = (value: string | null): number | undefined => {
  const num = parseInt(value ?? "", 10);
  return isNaN(num) ? undefined : num;
};

const Result = () => {
  const { isOpen } = useNavbar();
  const params = useSearchParams();

  const temp = getFloat(params.get("temp"));
  const appTemp = getFloat(params.get("appTemp"));
  const wind = getFloat(params.get("wind"));
  const dir = getInt(params.get("dir"));
  const windCdir = params.get("windCdir") || "";
  const windDirFull = params.get("windDirFull") || "";
  const gust = getFloat(params.get("gust"));
  const sunrise = params.get("sunrise") || "";
  const sunset = params.get("sunset") || "";
  const timeZone = params.get("time") || "";
  const precip = getFloat(params.get("precip"));
  const canWearShorts = params.get("canWearShorts") || "";
  const country = params.get("country") || "";
  const city = params.get("city") || "";
  const visibility = getInt(params.get("visibility"));
  const clouds = getInt(params.get("clouds"));
  const uv = getFloat(params.get("uv"));
  const aqi = getInt(params.get("aqi"));
  const rh = getInt(params.get("rh"));
  const dewPoint = getFloat(params.get("dewPoint"));
  const lat = getFloat(params.get("lat"));
  const lon = getFloat(params.get("lon"));
  const solarRad = getFloat(params.get("solarRad"));
  const weatherDesc = params.get("weatherDesc") || "";
  const weatherIcon = params.get("weatherIcon") || "";
  const obTime = params.get("ob_time") || "";



  const shortsMessage =
    canWearShorts === "true"
      ? "Yes! You Can Wear Shorts! ✅"
      : canWearShorts === "false"
        ? "No You Can't Wear Shorts ❌"
        : "Maybe You Could Wear Shorts 🤔";

  const weatherEmoji =
    clouds !== undefined && clouds <= 40
      ? "☀️"
      : clouds !== undefined && clouds <= 70
        ? "🌤️"
        : "☁️";



  return (
    <div className={`text-center mt-10 transition-all duration-300 ${isOpen ? "blur-md" : ""}`} >

      <h1 className="text-4xl font-semibold mb-2 text-center pt-15 backdrop-blur-sm bg-white/1 p-4 rounded-lg max-w-xl mx-auto">
        {shortsMessage}
      </h1>

      <div className="text-xl font-light text-gray-500 italic">
        <span className="mr-4"><ReactCountryFlag countryCode={country} svg className="text-2xl" /></span>
        <span className="mr-4">{city} </span>
        <span className="mr-4">{temp} °C</span>
        <span className="mr-4">{weatherDesc}</span>
        <span>{weatherEmoji}</span>
      </div>
      <div className="h-10 md:h-20">

      </div>
      <div>
        <p className="text-md mb-8 max-w-2xl mx-auto text-gray-700 pl-2 pr-2" > {canWearShorts === "true" ? <strong>You Can Wear Shorts! </strong> : canWearShorts === "false" ? <strong>No You Can't Wear Shorts</strong> : <strong>"Maybe You Could Wear Shorts! "</strong>}
          The <strong>current temperature</strong> is <strong>{temp}°C</strong>, with a <strong>wind speed</strong> of <strong>{wind} m/s</strong> and a <strong>precipitation level</strong> of <strong>{precip} mm</strong>.
          {canWearShorts === "true" ? " Suitable for wearing shorts on this lovely day! ☀️" : canWearShorts === "false" ? " Not suitable for wearing shorts today" : " Might be suitable for wearing shorts, but currently its a bit of a grey area, so its down to personal preference!"}
        </p>
      </div>

      <div className="h-10 md:h-20">

      </div>

      <div className="border backdrop-blur-md border-gray-300 rounded-lg p-4 max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg mx-auto shadow-md h-fit grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="md:col-span-2 text-center font-semibold text-lg"> Weather Information at {city}: </div>
        {/* The rest */}

        {temp !== undefined && <p>🌡️ Temperature: {temp}°C</p>}
        {appTemp !== undefined && <p>🌡️ Feels Like: {appTemp}°C</p>}
        {sunrise && <p>🌅 Sunrise: {sunrise}</p>}
        {sunset && <p>🌇 Sunset: {sunset}</p>}
        {wind !== undefined && <p>🌬️ Wind Speed: {wind} m/s</p>}
        {windCdir && windDirFull && (
          <p>🧭 Wind Direction: {windCdir} / {windDirFull}</p>
        )}
        {gust !== undefined && <p>💨 Gust Speed: {gust} m/s</p>}
        {visibility !== undefined && <p>👓 Visibility: {visibility} km</p>}
        {clouds !== undefined && <p>☁️ Cloud Cover: {clouds}%</p>}
        {uv !== undefined && <p>🧴 UV Index: {uv}</p>}
        {aqi !== undefined && <p>🫧 AQI: {aqi}</p>}
        {rh !== undefined && <p>💦 Humidity: {rh}%</p>}
        {dewPoint !== undefined && <p>💧 Dew Point: {dewPoint}°C</p>}
        {solarRad !== undefined && <p>☀️ Solar Radiation: {solarRad} W/m²</p>}
        {precip !== undefined && <p>☔️ Precipitation: {precip} mm</p>}
        {lat !== undefined && <p>📍 Latitude: {lat}</p>}
        {lon !== undefined && <p>📍 Longitude: {lon}</p>}
      </div>

      <p className="text-sm text-gray-500 mt-6">Last updated at {obTime} UTC</p>

      <div className="p-4">

      </div>



    </div>


  );
};

export default Result;
