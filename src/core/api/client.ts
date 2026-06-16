import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiError } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

let tokenAccessor: (() => string | null) | null = null;

/**
 * Sets the token accessor function for authentication.
 * This function will be called to retrieve the auth token for each API request.
 *
 * @param fn - Function that returns the auth token or null if not authenticated
 */
export function setTokenAccessor(fn: () => string | null) {
  tokenAccessor = fn;
}

/**
 * Creates and configures an Axios API client with authentication and error handling.
 *
 * Features:
 * - Automatic JWT token injection via Authorization header
 * - Global error handling with 401 redirect to login
 * - Standardized API error format
 * - JSON content type headers
 *
 * @returns Configured Axios instance for API requests
 */
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
    (response) => response,
    (
      error: AxiosError<{
        message?: string;
        code?: string;
        details?: Record<string, string[]>;
      }>,
    ) => {
      const status = error.response?.status;
      if (status === 401 && typeof window !== "undefined") {
        window.location.href = "/login?reason=session_expired";
        return Promise.reject(error);
      }

      const apiError: ApiError = {
        statusCode: status ?? 0,
        message:
          error.response?.data?.message ?? "An unexpected error occurred.",
        code: error.response?.data?.code ?? "",
        details: error.response?.data?.details,
      };

      return Promise.reject(apiError);
    },
  );

  return client;
}

export const apiClient = createApiClient();

/**
 * Makes a GET request to the specified URL.
 *
 * @template T - Expected response data type
 * @param url - The endpoint URL to request
 * @param config - Optional Axios request configuration
 * @returns Promise resolving to the response data
 *
 * @example
 * const user = await get<User>('/api/users/123');
 */
export async function get<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const res = await apiClient.get<T>(url, config);
  return res.data;
}

/**
 * Makes a POST request to the specified URL with optional payload.
 *
 * @template TRes - Expected response data type
 * @template TPayload - Request payload type (defaults to unknown)
 * @param url - The endpoint URL to request
 * @param payload - Optional request body data
 * @param config - Optional Axios request configuration
 * @returns Promise resolving to the response data
 *
 * @example
 * const newUser = await post<User, CreateUserDto>('/api/users', userData);
 */
export async function post<TRes, TPayload = unknown>(
  url: string,
  payload?: TPayload,
  config?: AxiosRequestConfig,
): Promise<TRes> {
  const res = await apiClient.post<TRes>(url, payload, config);
  return res.data;
}

/**
 * Makes a PUT request to the specified URL with optional payload.
 * Typically used for full resource updates.
 *
 * @template TRes - Expected response data type
 * @template TPayload - Request payload type (defaults to unknown)
 * @param url - The endpoint URL to request
 * @param payload - Optional request body data
 * @param config - Optional Axios request configuration
 * @returns Promise resolving to the response data
 *
 * @example
 * const updatedUser = await put<User, UpdateUserDto>('/api/users/123', userData);
 */
export async function put<TRes, TPayload = unknown>(
  url: string,
  payload?: TPayload,
  config?: AxiosRequestConfig,
): Promise<TRes> {
  const res = await apiClient.put<TRes>(url, payload, config);
  return res.data;
}

/**
 * Makes a PATCH request to the specified URL with optional payload.
 * Typically used for partial resource updates.
 *
 * @template TRes - Expected response data type
 * @template TPayload - Request payload type (defaults to unknown)
 * @param url - The endpoint URL to request
 * @param payload - Optional request body data
 * @param config - Optional Axios request configuration
 * @returns Promise resolving to the response data
 *
 * @example
 * const updatedUser = await patch<User, PartialUserDto>('/api/users/123', partialData);
 */
export async function patch<TRes, TPayload = unknown>(
  url: string,
  payload?: TPayload,
  config?: AxiosRequestConfig,
): Promise<TRes> {
  const res = await apiClient.patch<TRes>(url, payload, config);
  return res.data;
}

/**
 * Makes a DELETE request to the specified URL.
 *
 * @template T - Expected response data type (often void or a confirmation message)
 * @param url - The endpoint URL to request
 * @param config - Optional Axios request configuration
 * @returns Promise resolving to the response data
 *
 * @example
 * await delete<void>('/api/users/123');
 */
export async function del<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const res = await apiClient.delete<T>(url, config);
  return res.data;
}
