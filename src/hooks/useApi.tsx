import "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
  }
}

const api: AxiosInstance = axios.create({
  baseURL: "https://learnovate-server.onrender.com",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// GET request
export async function getRequest<T>(endpoint: string) {
  return await api
    .get<T>(endpoint)
    .then((res: AxiosResponse<T>) => res.data)
    .catch((err: AxiosError) => {
      console.log(err);
    });
}
export function useGetData<T>(endpoint: string) {
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => getRequest<T>(endpoint),
  });
}

// POST request
export async function postRequest<T>(endpoint: string, data: T) {
  const response = await api.post(endpoint, data).catch(() => {});
  return response;
}
export function usePostData<T>(endpoint: string) {
  const mutation = useMutation({
    mutationKey: [endpoint],
    mutationFn: (data: T) => postRequest(endpoint, data),
  });
  return mutation;
}

// PATCH request
export async function patchRequest<T>(endpoint: string, data: T) {
  const response = await api.patch(endpoint, data).catch(() => {});
  return response;
}
export function usePatchData<T>(endpoint: string) {
  const mutation = useMutation({
    mutationKey: [endpoint],
    mutationFn: (data: T) => patchRequest(endpoint, data),
  });
  return mutation;
}

// DELETE request
export async function deleteRequest(endpoint: string) {
  const response = await api.delete(endpoint).catch(() => {});
  return response;
}
export function useDeleteData(endpoint: string) {
  const mutation = useMutation({
    mutationKey: [endpoint],
    mutationFn: () => deleteRequest(endpoint),
  });
  return mutation;
}
