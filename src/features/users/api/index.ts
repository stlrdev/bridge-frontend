import { get, put, post } from "@/core/api/client";
import {
  ChangePasswordPayload,
  CustomerProfile,
  UpdateProfilePayload,
  UserProfile,
} from "../types";

export const usersApi = {
  getMe: () =>
    get<UserProfile>("/users/me/"),

  getMyProfile: () =>
    get<UserProfile>("/users/me/profile/"),

  updateProfile: (payload: UpdateProfilePayload) =>
    put<UserProfile>("/users/me/profile/", payload),

  getCustomerProfile: () =>
    get<CustomerProfile>("/users/customer/profile/"),

  changePassword: (payload: ChangePasswordPayload) =>
    post<void>("/auth/password/change/", payload),
};
