import "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://learnovate-server.onrender.com/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

type TStatus = "success" | "failed";

const globalResponseFormat = (res: unknown) => {
  let resStatus: TStatus;

  if (res instanceof AxiosError) {
    resStatus = "failed";
    return {
      status: resStatus,
      code: res.response?.status,
      data: res.response?.data,
    };
  }

  if (res instanceof Error) {
    resStatus = "failed";
    return {
      status: resStatus,
      code: 500,
      data: res.message,
    };
  }

  const { status, data } = res as AxiosResponse;
  resStatus = "success";
  return {
    status: resStatus,
    code: status,
    data,
  };
};

// GET request
export async function getRequest(endpoint: string) {
  try {
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    return error;
  }
}
export function useGetData(endpoint: string) {
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const res = await getRequest(endpoint);
      return globalResponseFormat(res);
    },
  });
}

// POST request
export async function postRequest<T>(endpoint: string, data: T) {
  try {
    const response = await api.post(endpoint, data);
    return response;
  } catch (error) {
    return error;
  }
}
export function usePostData<T>(endpoint: string) {
  const mutation = useMutation({
    mutationKey: [endpoint],
    mutationFn: async (data: T) => {
      const res = await postRequest(endpoint, data);
      return globalResponseFormat(res);
    },
  });
  return mutation;
}

// PATCH request
export async function patchRequest<T>(endpoint: string, data: T) {
  try {
    const response = await api.patch(endpoint, data);
    return response;
  } catch (error) {
    return error;
  }
}
export function usePatchData<T>(endpoint: string) {
  const mutation = useMutation({
    mutationKey: [endpoint],
    mutationFn: async (data: T) => {
      const res = await patchRequest(endpoint, data);
      return globalResponseFormat(res);
    },
  });
  return mutation;
}

// DELETE request
export async function deleteRequest(endpoint: string) {
  try {
    const response = await api.delete(endpoint);
    return response;
  } catch (error) {
    return error;
  }
}
export function useDeleteData(endpoint: string) {
  const mutation = useMutation({
    mutationKey: [endpoint],
    mutationFn: async () => {
      const res = await deleteRequest(endpoint);
      return globalResponseFormat(res);
    },
  });
  return mutation;
}
