import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangePasswordPayload, UpdateProfilePayload } from "../types";
import { usersApi } from "../api";

export const userKeys = {
  all: ["user"] as const,
  me: () => [...userKeys.all, "me"] as const,
  profile: () => [...userKeys.all, "profile"] as const,
  customerProfile: () => [...userKeys.all, "customer-profile"] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: () => usersApi.getMe(),
    staleTime: 300_000,
  });
}

export function useMyProfile() {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: () => usersApi.getMyProfile(),
    staleTime: 300_000,
  });
}

export function useCustomerProfile() {
  return useQuery({
    queryKey: userKeys.customerProfile(),
    queryFn: () => usersApi.getCustomerProfile(),
    staleTime: 300_000,
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => usersApi.updateProfile(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: userKeys.me() });
      qc.invalidateQueries({ queryKey: userKeys.profile() });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => usersApi.changePassword(payload),
  });
}
