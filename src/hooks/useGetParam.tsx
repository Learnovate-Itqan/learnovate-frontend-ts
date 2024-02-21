import { useLocation } from "react-router-dom";

export const useGetParam = (param: string) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get(param);
};
