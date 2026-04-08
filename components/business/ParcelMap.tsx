"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import { Parcel, Region } from "@/lib/types";
import { REGION_VIEWS } from "@/lib/mock-data";

// Fix Leaflet default icon issue with bundlers
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

function getMarkerColor(score: number): string {
  if (score >= 80) return "#16794D"; // success green
  if (score >= 50) return "#E07B2A"; // accent burnt-orange
  return "#B91C1C"; // danger red
}

interface ParcelMapProps {
  parcels: Parcel[];
  selectedParcelId: string | null;
  onSelectParcel: (parcel: Parcel) => void;
  region: Region | "All";
}

// Internal controller component — uses useMap() to fly to regions / parcels
function MapController({
  region,
  selectedParcel,
}: {
  region: Region | "All";
  selectedParcel: Parcel | null;
}) {
  const map = useMap();

  // Fly to region when it changes
  useEffect(() => {
    const view = REGION_VIEWS[region];
    map.flyTo(view.center, view.zoom, { duration: 0.9 });
  }, [region, map]);

  // Fly to selected parcel
  useEffect(() => {
    if (selectedParcel) {
      map.flyTo([selectedParcel.lat, selectedParcel.lng], 9, { duration: 0.8 });
    }
  }, [selectedParcel, map]);

  // Force resize after mount
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100);
  }, [map]);

  return null;
}

export default function ParcelMap({
  parcels,
  selectedParcelId,
  onSelectParcel,
  region,
}: ParcelMapProps) {
  const selectedParcel = parcels.find((p) => p.id === selectedParcelId) || null;
  const initialView = REGION_VIEWS[region];

  return (
    <div className="h-[560px] w-full rounded-md overflow-hidden border border-border relative">
      <MapContainer
        center={initialView.center}
        zoom={initialView.zoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapController region={region} selectedParcel={selectedParcel} />
        {parcels.map((p) => {
          const isSelected = p.id === selectedParcelId;
          const color = getMarkerColor(p.score);
          return (
            <CircleMarker
              key={p.id}
              center={[p.lat, p.lng]}
              radius={isSelected ? 13 : p.score >= 80 ? 9 : p.score >= 50 ? 7 : 6}
              pathOptions={{
                fillColor: color,
                color: isSelected ? "#E07B2A" : "#fff",
                weight: isSelected ? 4 : 2,
                opacity: 1,
                fillOpacity: isSelected ? 1 : 0.85,
              }}
              eventHandlers={{
                click: () => onSelectParcel(p),
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -8]}
                opacity={1}
                className="parcel-tooltip"
              >
                <div className="font-sans">
                  <div className="font-semibold font-data text-text-primary">{p.id}</div>
                  <div className="text-xs text-text-secondary">{p.locationName}</div>
                  <div className="text-xs mt-1">
                    <span style={{ color }} className="font-semibold">Score {p.score}</span>
                    <span className="text-text-secondary"> · {p.mineralType}</span>
                  </div>
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Floating legend overlay */}
      <div className="absolute bottom-3 left-3 bg-background/95 backdrop-blur border border-border rounded-md px-3 py-2 shadow-warm z-[400]">
        <div className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold mb-1.5">
          Acquisition Score
        </div>
        <div className="space-y-1 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#16794D" }} />
            <span className="text-text-primary">High (80–100)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#E07B2A" }} />
            <span className="text-text-primary">Medium (50–79)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#B91C1C" }} />
            <span className="text-text-primary">Low (0–49)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
