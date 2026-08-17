import { useEffect, useState } from "react";

import { getAppInfo, type AppInfoResponse } from "@/lib/api/health";

type AppInfoState = {
  data: AppInfoResponse | null;
  isLoading: boolean;
  isError: boolean;
};

export function useAppInfo(): AppInfoState {
  const [data, setData] = useState<AppInfoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadAppInfo() {
      try {
        const response = await getAppInfo();

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

    void loadAppInfo();

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
