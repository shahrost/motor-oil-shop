import { useEffect, useEffectEvent, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  PICKED_ZOOM,
  TILE_URL,
  TILE_ATTRIBUTION,
  GEO_OPTIONS,
  toLocation,
  geoErrorKey,
} from "../helpers/locationMap";

// نقشه با پین ثابت وسط: موقعیت انتخابی = مرکز نقشه.
// تا وقتی مشتری خودش نقشه رو نکشیده / روش نزده / «موقعیت من» رو نزده، چیزی ثبت نمی‌شه
// (وگرنه مرکز پیش‌فرض به‌اشتباه به‌عنوان آدرس می‌رفت)
function useLocationMap(location, onPick) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const armedRef = useRef(Boolean(location));
  const accuracyRef = useRef(null);

  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState("");

  const pick = useEffectEvent((latLng) => onPick(toLocation(latLng)));

  // موقعیت اولیه فقط موقع ساخت نقشه لازمه؛ عوض شدنش نباید نقشه رو از نو بسازه
  const initialView = useEffectEvent(() =>
    location
      ? { center: [location.lat, location.lng], zoom: PICKED_ZOOM }
      : { center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM },
  );

  useEffect(() => {
    const { center, zoom } = initialView();

    const map = L.map(containerRef.current, {
      center,
      zoom,
      scrollWheelZoom: false,
      touchZoom: "center",
      doubleClickZoom: "center",
    });

    L.tileLayer(TILE_URL, {
      maxZoom: 19,
      attribution: TILE_ATTRIBUTION,
    }).addTo(map);

    map.on("dragstart", () => {
      armedRef.current = true;
    });

    map.on("click", (e) => {
      armedRef.current = true;
      map.panTo(e.latlng);
    });

    map.on("moveend", () => {
      if (armedRef.current) pick(map.getCenter());
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      accuracyRef.current = null;
    };
  }, []);

  function locate() {
    if (!navigator.geolocation || !window.isSecureContext) {
      setGeoError(geoErrorKey());
      return;
    }

    setLocating(true);
    setGeoError("");

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocating(false);

        const map = mapRef.current;
        if (!map) return;

        const latLng = L.latLng(coords.latitude, coords.longitude);

        // دایره‌ی دقت GPS تا مشتری بدونه چقدر باید پین رو دستی جابه‌جا کنه
        accuracyRef.current?.remove();
        accuracyRef.current = L.circle(latLng, {
          radius: coords.accuracy,
          color: "#2563eb",
          weight: 1,
          fillOpacity: 0.12,
          interactive: false,
        }).addTo(map);

        armedRef.current = true;
        onPick(toLocation(latLng));
        map.flyTo(latLng, PICKED_ZOOM, { duration: 0.8 });
      },
      (error) => {
        setLocating(false);
        setGeoError(geoErrorKey(error));
      },
      GEO_OPTIONS,
    );
  }

  return { containerRef, locate, locating, geoError };
}

export default useLocationMap;
