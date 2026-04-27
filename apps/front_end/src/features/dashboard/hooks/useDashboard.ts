import { useEffect, useState } from "react";
import { dashboardMockData } from "../api/dashboard.mock";

export function useDashboard() {
  const [data, setData] = useState<typeof dashboardMockData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(dashboardMockData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
}