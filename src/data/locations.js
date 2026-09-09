// Strictly sourced from "Village Deli — Website Content.pdf" Page 14
// Notice on Page 14: "Confirm which Gurgaon locations (Sector 114, Sector 83, K.D. Square, JMS Marine Square, 2Y Crossing) are approved for public display before publishing."

export const LOCATIONS_DATA = {
  title: "Find Your Village Deli",
  subtitle: "Your neighbourhood convenience store is getting closer. Explore Village Deli locations and discover a smarter, fresher and more convenient way to shop.",
  hoursNote: "24/7 — Always Open.",
  confirmationNotice: "Note: Confirm which Gurgaon locations (Sector 114, Sector 83, K.D. Square, JMS Marine Square, 2Y Crossing) are approved for public display before publishing.",
  
  stores: [
    {
      id: "sector-114",
      name: "Village Deli — Sector 114",
      area: "Sector 114, Dwarka Expressway Corridor",
      city: "Gurgaon",
      state: "Haryana",
      address: "Sector 114, Near Delhi-Gurgaon Border, Haryana",
      hours: "24/7 — Always Open",
      status: "preview", // marked for client confirmation
      statusLabel: "Location Preview / Coming Soon",
      coordinates: { lat: 28.5175, lng: 77.0125 },
      phone: "+91 124 000 0000",
      type: "Expressway & Urban Hub"
    },
    {
      id: "sector-83",
      name: "Village Deli — Sector 83",
      area: "Sector 83, New Gurgaon",
      city: "Gurgaon",
      state: "Haryana",
      address: "Sector 83, Main Arterial Road, New Gurgaon, Haryana",
      hours: "24/7 — Always Open",
      status: "preview",
      statusLabel: "Location Preview / Coming Soon",
      coordinates: { lat: 28.3972, lng: 76.9634 },
      phone: "+91 124 000 0000",
      type: "Residential & Township"
    },
    {
      id: "kd-square",
      name: "Village Deli — K.D. Square",
      area: "K.D. Square Commercial Complex",
      city: "Gurgaon",
      state: "Haryana",
      address: "K.D. Square, Sohna Road Corridor, Gurgaon, Haryana",
      hours: "24/7 — Always Open",
      status: "preview",
      statusLabel: "Location Preview / Coming Soon",
      coordinates: { lat: 28.4215, lng: 77.0392 },
      phone: "+91 124 000 0000",
      type: "Commercial & Mixed-Use"
    },
    {
      id: "jms-marine",
      name: "Village Deli — JMS Marine Square",
      area: "JMS Marine Square, Sector 102",
      city: "Gurgaon",
      state: "Haryana",
      address: "JMS Marine Square, Sector 102, Dwarka Expressway, Gurgaon",
      hours: "24/7 — Always Open",
      status: "preview",
      statusLabel: "Location Preview / Coming Soon",
      coordinates: { lat: 28.4891, lng: 76.9856 },
      phone: "+91 124 000 0000",
      type: "Mobility Hub & Retail"
    },
    {
      id: "2y-crossing",
      name: "Village Deli — 2Y Crossing",
      area: "2Y Crossing Transit Hub",
      city: "Gurgaon",
      state: "Haryana",
      address: "2Y Crossing, Highway Arterial Junction, Haryana",
      hours: "24/7 — Always Open",
      status: "preview",
      statusLabel: "Location Preview / Coming Soon",
      coordinates: { lat: 28.4410, lng: 77.0100 },
      phone: "+91 124 000 0000",
      type: "Highway Transit Hub"
    },
    {
      id: "punjab-flagship",
      name: "Village Deli — Punjab Highway Flagship",
      area: "National Highway Corridor",
      city: "Punjab",
      state: "Punjab",
      address: "Grand Trunk Corridor, Punjab",
      hours: "24/7 — Always Open",
      status: "active",
      statusLabel: "Open 24/7",
      coordinates: { lat: 30.7333, lng: 76.7794 },
      phone: "+91 172 000 0000",
      type: "Highway & Mobility Hub"
    }
  ]
};
