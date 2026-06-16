import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiError, PaginatedResponse } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

let tokenAccessor: (() => string | null) | null = null;

export function setTokenAccessor(fn: () => string | null) {
  tokenAccessor = fn;
}

interface BackendEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  errors?: string[];
}

function isPaginatedResult<T>(
  envelope: BackendEnvelope<T[]>,
): envelope is BackendEnvelope<T[]> & { meta: NonNullable<BackendEnvelope<T[]>["meta"]> } {
  return envelope.meta !== undefined && Array.isArray(envelope.data);
}

function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = tokenAccessor?.();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  client.interceptors.response.use(
    (response) => {
      const envelope = response.data as BackendEnvelope<unknown>;

      if (envelope && typeof envelope === "object" && "success" in envelope) {
        if (isPaginatedResult(envelope as BackendEnvelope<unknown[]>)) {
          const paginatedEnvelope = envelope as BackendEnvelope<unknown[]>;
          const paginated: PaginatedResponse<unknown> = {
            data: paginatedEnvelope.data,
            total: paginatedEnvelope.meta!.total,
            page: paginatedEnvelope.meta!.page,
            pageSize: paginatedEnvelope.meta!.pageSize,
            totalPages: paginatedEnvelope.meta!.totalPages,
          };
          response.data = paginated;
        } else {
          response.data = envelope.data;
        }
      }

      return response;
    },
    (
      error: AxiosError<BackendEnvelope<null>>,
    ) => {
      const status = error.response?.status;
      if (status === 401 && typeof window !== "undefined") {
        window.location.href = "/login?reason=session_expired";
        return Promise.reject(error);
      }

      const responseData = error.response?.data;
      const apiError: ApiError = {
        statusCode: status ?? 0,
        message: responseData?.message ?? "An unexpected error occurred.",
        code: "",
        details: responseData?.errors
          ? { errors: responseData.errors }
          : undefined,
      };

      return Promise.reject(apiError);
    },
  );

  return client;
}

export const apiClient = createApiClient();

export async function get<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const res = await apiClient.get<T>(url, config);
  return res.data;
}

export async function post<TRes, TPayload = unknown>(
  url: string,
  payload?: TPayload,
  config?: AxiosRequestConfig,
): Promise<TRes> {
  const res = await apiClient.post<TRes>(url, payload, config);
  return res.data;
}

export async function put<TRes, TPayload = unknown>(
  url: string,
  payload?: TPayload,
  config?: AxiosRequestConfig,
): Promise<TRes> {
  const res = await apiClient.put<TRes>(url, payload, config);
  return res.data;
}

export async function patch<TRes, TPayload = unknown>(
  url: string,
  payload?: TPayload,
  config?: AxiosRequestConfig,
): Promise<TRes> {
  const res = await apiClient.patch<TRes>(url, payload, config);
  return res.data;
}

export async function del<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const res = await apiClient.delete<T>(url, config);
  return res.data;
}
