import { useEffect, useState } from "react";

import { getHealth, type HealthResponse } from "@/lib/api/health";

type ApiHealthState = {
  data: HealthResponse | null;
  isLoading: boolean;
  isError: boolean;
};

export function useApiHealth(): ApiHealthState {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkHealth() {
      try {
        const response = await getHealth();

        if (!isMounted) {
          return;
        }

        setData(response);
        setIsError(false);
      } catch {
        if (!isMounted) {
          return;
        }

        setData(null);
        setIsError(true);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void checkHealth();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
}
