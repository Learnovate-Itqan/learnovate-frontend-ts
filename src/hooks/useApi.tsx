import "@tanstack/react-query";
import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
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
      throw err;
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
  return await api
    .post<T>(endpoint, data)
    .then((res: AxiosResponse<T>) => res.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
export function usePostData<T>(endpoint: string, data: T, options?: UseMutationOptions<T, AxiosError, T>) {
  const mutation = useMutation({
    mutationKey: [endpoint],
    mutationFn: () => postRequest<T>(endpoint, data),
    ...options,
  });
  return mutation;
}

// PATCH request
export async function patchRequest<T>(endpoint: string, data: T) {
  return await api
    .patch<T>(endpoint, data)
    .then((res: AxiosResponse<T>) => res.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
export function usePatchData<T>(endpoint: string, data: T, options?: UseMutationOptions<T, AxiosError, T>) {
  const mutation = useMutation({
    mutationKey: [endpoint],
    mutationFn: () => patchRequest<T>(endpoint, data),
    ...options,
  });
  return mutation;
}

// DELETE request
export async function deleteRequest<T>(endpoint: string) {
  return await api
    .delete<T>(endpoint)
    .then((res: AxiosResponse<T>) => res.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
export function useDeleteData<T>(endpoint: string, options?: UseMutationOptions<T, AxiosError, T>) {
  const mutation = useMutation({
    mutationKey: [endpoint],
    mutationFn: () => deleteRequest<T>(endpoint),
    ...options,
  });
  return mutation;
}
