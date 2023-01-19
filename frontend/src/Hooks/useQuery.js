import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function useQuery() {
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const searchFind = query.get("q");
  return searchFind;
}
