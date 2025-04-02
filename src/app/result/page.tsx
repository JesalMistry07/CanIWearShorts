"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import  ReactCountryFlag  from "react-country-flag";

const Result = () => {
  const params = useSearchParams();

  const temp = params.get("temp"); 
  const timeZone = params.get("time");
  const wind = params.get("wind");
  const dir = params.get("dir");
  const sunrise = params.get("sunrise");
  const sunset = params.get("sunset");
  const precip = params.get("precip");
  const canWearShorts = params.get("canWearShorts");
  const country: string = params.get("country")?.toString() || "";



  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Query Parameters</h1>
      <p className="text-lg mt-2">Temperature: {temp}°C</p>

      <p>{timeZone}</p>
      <p>{wind}</p>
      <p>{dir}</p>
      <p>{sunrise}</p>
      <p>{sunset}</p>
      <p>{precip}</p>
      <ReactCountryFlag countryCode={country} svg />

      <p>{canWearShorts === "true" ? "Yes you can wear shorts" : "No you can't wear shorts"}</p>

    </div>
  );
};

export default Result;
