"use client";

import React, { useState, useRef, useEffect, FC } from "react";
import { Input } from "@/components/ui/input";
import { extractAddressComponents } from "@/lib/utils/formateData";
import {type PropertyFormSchemaT } from "@/types";
import useMapLoader from "@/hooks/useMapLoader";

// Type for the Address object
type Address = PropertyFormSchemaT["address"] & {};

interface AutoCompletePlaceSearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onChange?: (address: Address) => void;
  isApiNeedToLoad: boolean;
}

// Main component for the autocomplete search input
const AutoCompletePlaceSearchInput: FC<AutoCompletePlaceSearchInputProps> = ({
  isApiNeedToLoad,
  value,
  onChange,
  ...rest
}) => {
  return isApiNeedToLoad ? (
    <ApiLoader>
      <PlaceAutocomplete value={value} onPlaceSelect={onChange} {...rest} />
    </ApiLoader>
  ) : (
    <PlaceAutocomplete value={value} onPlaceSelect={onChange} {...rest} />
  );
};

interface PlaceAutocompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onPlaceSelect?: (address: Address) => void;
}

// PlaceAutocomplete component that handles the Google Maps Autocomplete
const PlaceAutocomplete: FC<PlaceAutocompleteProps> = ({
  value,
  onPlaceSelect,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  // Initialize autocomplete when the component mounts
  useEffect(() => {
    if (!inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address", "address_components"],
    };

    const autoCompleteInstance = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options,
    );
    setAutocomplete(autoCompleteInstance);

    // Cleanup listener on unmount
    return () => {
      if (autoCompleteInstance) {
        autoCompleteInstance.unbindAll();
      }
    };
  }, []);

  // Add listener for place selection and pass selected place to onPlaceSelect
  useEffect(() => {
    if (!autocomplete) return;

    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      // Check if the place has a valid geometry and extract the address components
      if (!place.geometry?.location) return;

      // Extract the address components from the place object
      const latLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      // Transform the PlaceResult into your custom address structure
      const address: Address = extractAddressComponents(place, latLng);

      // Call the onChange handler with the transformed address
      if (onPlaceSelect) onPlaceSelect(address);
    });

    // Cleanup listener when the effect runs again or component unmounts
    return () => {
      listener.remove();
    };
  }, [autocomplete, onPlaceSelect]);

  return (
    <Input
      {...rest}
      ref={inputRef}
      placeholder="Search for a location..."
      defaultValue={value}
    />
  );
};

// ApiLoader component that waits for the map API to load before rendering children
const ApiLoader: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded } = useMapLoader();

  return isLoaded ? <>{children}</> : null;
};

export default AutoCompletePlaceSearchInput;
