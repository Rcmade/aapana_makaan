"use client";
import { useJsApiLoader } from "@react-google-maps/api";
import React from "react";

const useMapLoader = () => {
  return useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places", "maps", "streetView"],
  });
};

export default useMapLoader;
