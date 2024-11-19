import { GoogleMap, type GoogleMapProps } from "@react-google-maps/api";
import React, { ReactNode } from "react";

// GoogleMapProps, GoogleMapState;
interface DefaultMapsProps extends GoogleMapProps {
  children?: ReactNode;
}
const DefaultMaps = ({ children, ...rest }: DefaultMapsProps) => {
  return (
    <GoogleMap
      zoom={15}
      mapContainerStyle={{ width: "100%", height: "30rem" }}
      options={{
        streetViewControl: true,
        fullscreenControl: true,
        scrollwheel: true,
        zoomControl: true,
        mapTypeControl: true,
        mapTypeId: "hybrid",
        mapTypeControlOptions: {
          style: window.google.maps.MapTypeControlStyle.DEFAULT,
          position: window.google.maps.ControlPosition.TOP_RIGHT,
          mapTypeIds: ["satellite", "roadmap", "hybrid", "terrain"],
        },
        styles: [
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [{ weight: "2.00" }],
          },
          {
            featureType: "all",
            elementType: "labels.text",
            stylers: [{ visibility: "on" }],
          },
        ],
      }}
      {...rest}
    >
      {children}
    </GoogleMap>
  );
};

export default DefaultMaps;
