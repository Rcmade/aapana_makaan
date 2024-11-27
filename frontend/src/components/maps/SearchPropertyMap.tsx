"use client";

import useMapLoader from "@/hooks/useMapLoader";
import { SearchPropertyResponseT } from "@/types/apiResponse";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import React, { useCallback, useEffect, useState } from "react";
import PropertyCard from "../card/PropertyCard";
import { formatPrice } from "@/lib/utils/formateData";
import { locationPinImgUrl } from "@/content/webContent";
import GoogleMapSkeleton from "../skeleton/GoogleMapSkeleton";

const center = {
  lat: 22.719568,
  lng: 75.857727,
};

const containerStyle = {
  width: "100%",
  height: "50rem",
};

interface SearchPropertyMapProps extends SearchPropertyResponseT {}

const SearchPropertyMap = ({ properties }: SearchPropertyMapProps) => {
  const [selectedProperty, setSelectedProperty] = useState<
    SearchPropertyResponseT["properties"][number] | null
  >(null);

  const { isLoaded } = useMapLoader();
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Map load handler
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  // Map unload handler
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Update map bounds when properties change
  useEffect(() => {
    if (map && properties.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      properties.forEach(({ location }) => {
        bounds.extend({ lat: location.y, lng: location.x });
      });
      map.fitBounds(bounds);

      // Set a maximum zoom level
      const listener = google.maps.event.addListener(map, "idle", () => {
        if (map.getZoom()! > 15) {
          map.setZoom(15);
        }
        google.maps.event.removeListener(listener);
      });
    }
  }, [map, properties]);

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          center={center}
          zoom={12}
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            zoomControl: true,
            scrollwheel: true,
            mapTypeId: "roadmap",
          }}
        >
          {properties.map((property) => (
            <Marker
              key={property.id}
              position={{
                lat: property.location.y,
                lng: property.location.x,
              }}
              onClick={() => setSelectedProperty(property)}
              icon={{
                url: locationPinImgUrl,
                fillOpacity: 1,
                scaledSize: new window.google.maps.Size(37, 37),
                anchor: new window.google.maps.Point(18.5, 37),
                labelOrigin: new window.google.maps.Point(18.5, 48),
              }}
              label={{
                text: `₹${formatPrice(+property.price)}`,
                className:
                  "font-weight dark:bg-primary bg-primary-foreground p-2 mt-4 dark:text-primary-foreground shadow-md rounded-md text-primary",
              }}
            />
          ))}

          {selectedProperty && (
            <InfoWindow
              position={{
                lat: selectedProperty.location.y,
                lng: selectedProperty.location.x,
              }}
              onCloseClick={() => setSelectedProperty(null)}
              options={{
                pixelOffset: new window.google.maps.Size(0, -27),
              }}
            >
              <PropertyCard
                className="max-w-80 border-none"
                property={selectedProperty}
              />
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        <GoogleMapSkeleton />
      )}
    </>
  );
};

export default SearchPropertyMap;
