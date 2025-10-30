import { useState, useEffect } from "react";
import { getDistrictByLocation } from "../utils/api";

export const useGeolocation = () => {
  const [district, setDistrict] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | GeolocationPositionError | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(new Error("Geolocation is not supported by your browser"));
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const districtName = await getDistrictByLocation(latitude, longitude);
          setDistrict(districtName);
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
  }, []);

  return { district, loading, error };
};
