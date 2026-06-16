import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CampaignsListParams,
  CreateCampaignPayload,
  UpdateCampaignPayload,
} from "../types";
import { campaignsApi, orgOffersApi } from "../api";

export const campaignsKeys = {
  all: ["campaigns"] as const,
  lists: (merchantId: string) => [...campaignsKeys.all, "list", merchantId] as const,
  list: (merchantId: string, params?: CampaignsListParams) =>
    [...campaignsKeys.lists(merchantId), params] as const,
  detail: (merchantId: string, campaignId: string) =>
    [...campaignsKeys.all, "detail", merchantId, campaignId] as const,
  stats: (merchantId: string, campaignId: string) =>
    [...campaignsKeys.all, "stats", merchantId, campaignId] as const,
  orgOffers: () => [...campaignsKeys.all, "org-offers"] as const,
};

// ── MERCHANT MANAGER ──────────────────────────────────────────────────────────

export function useCampaigns(merchantId: string, params?: CampaignsListParams) {
  return useQuery({
    queryKey: campaignsKeys.list(merchantId, params),
    queryFn: () => campaignsApi.list(merchantId, params),
    enabled: !!merchantId,
    staleTime: 60_000,
  });
}

export function useCampaign(merchantId: string, campaignId: string) {
  return useQuery({
    queryKey: campaignsKeys.detail(merchantId, campaignId),
    queryFn: () => campaignsApi.getById(merchantId, campaignId),
    enabled: !!merchantId && !!campaignId,
    staleTime: 60_000,
  });
}

export function useCampaignStats(merchantId: string, campaignId: string) {
  return useQuery({
    queryKey: campaignsKeys.stats(merchantId, campaignId),
    queryFn: () => campaignsApi.getStats(merchantId, campaignId),
    enabled: !!merchantId && !!campaignId,
    staleTime: 30_000,
  });
}

export function useCreateCampaign(merchantId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCampaignPayload) =>
      campaignsApi.create(merchantId, payload),
    onSettled: () =>
      qc.invalidateQueries({ queryKey: campaignsKeys.lists(merchantId) }),
  });
}

export function useUpdateCampaign(merchantId: string, campaignId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateCampaignPayload) =>
      campaignsApi.update(merchantId, campaignId, payload),
    onSettled: () => {
      qc.invalidateQueries({ queryKey: campaignsKeys.lists(merchantId) });
      qc.invalidateQueries({ queryKey: campaignsKeys.detail(merchantId, campaignId) });
    },
  });
}

export function useActivateCampaign(merchantId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (campaignId: string) => campaignsApi.activate(merchantId, campaignId),
    onSettled: (_, __, campaignId) => {
      qc.invalidateQueries({ queryKey: campaignsKeys.lists(merchantId) });
      qc.invalidateQueries({ queryKey: campaignsKeys.detail(merchantId, campaignId) });
    },
  });
}

export function usePauseCampaign(merchantId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (campaignId: string) => campaignsApi.pause(merchantId, campaignId),
    onSettled: (_, __, campaignId) => {
      qc.invalidateQueries({ queryKey: campaignsKeys.lists(merchantId) });
      qc.invalidateQueries({ queryKey: campaignsKeys.detail(merchantId, campaignId) });
    },
  });
}

// ── COMPANY ADMIN (org offers) ────────────────────────────────────────────────

export function useOrgOffers() {
  return useQuery({
    queryKey: campaignsKeys.orgOffers(),
    queryFn: () => orgOffersApi.list(),
    staleTime: 60_000,
  });
}

export function useEnableOrgCampaign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (campaignId: string) => orgOffersApi.enableCampaign(campaignId),
    onSettled: () => qc.invalidateQueries({ queryKey: campaignsKeys.orgOffers() }),
  });
}

export function useDisableOrgCampaign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (campaignId: string) => orgOffersApi.disableCampaign(campaignId),
    onSettled: () => qc.invalidateQueries({ queryKey: campaignsKeys.orgOffers() }),
  });
}
