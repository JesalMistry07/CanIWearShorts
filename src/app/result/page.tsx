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
  const city: string = params.get("city")?.toString() || "";



  return (
    <div className="text-center mt-10">

      <h1 className="text-4xl font-semibold mb-2 text-center pt-15">
      {canWearShorts === "true" ? "Yes! You Can Wear Shorts! ✅" : "No You Can't Wear Shorts ❌"}
      </h1>
      <div>
          <h2>Current Weather:</h2>
          <span>{temp}  </span>
      </div>

      <p>{timeZone}</p>
      <p>{wind}</p>
      <p>{dir}</p>
      <p>{sunrise}</p>
      <p>{sunset}</p>
      <p>{precip}</p>
      <ReactCountryFlag countryCode={country} svg className="text-9xl"/>

  

    </div>
  );
};

export default Result;
