import { vouchersKeys } from "@/features/vouchers/hooks";
import { merchantsKeys } from "@/features/merchants/hooks";
import { companyKeys } from "@/features/companies/hooks";
import { campaignsKeys } from "@/features/offers/hooks";
import { analyticsKeys } from "@/features/analytics/hooks";
import { QueryClient } from "@tanstack/react-query";

export const invalidate = {
  // Vouchers
  voucherGenerated: (qc: QueryClient) => {
    qc.invalidateQueries({ queryKey: vouchersKeys.all });
  },
  voucherClaimed: (qc: QueryClient) => {
    qc.invalidateQueries({ queryKey: vouchersKeys.all });
  },
  voucherValidated: (qc: QueryClient) => {
    qc.invalidateQueries({ queryKey: vouchersKeys.all });
  },
  voucherRedeemed: (qc: QueryClient) => {
    qc.invalidateQueries({ queryKey: vouchersKeys.all });
    qc.invalidateQueries({ queryKey: analyticsKeys.all });
  },

  // Merchants
  merchantCreated: (qc: QueryClient) => {
    qc.invalidateQueries({ queryKey: merchantsKeys.lists() });
  },
  merchantActivated: (qc: QueryClient, merchantId: string) => {
    qc.invalidateQueries({ queryKey: merchantsKeys.detail(merchantId) });
    qc.invalidateQueries({ queryKey: merchantsKeys.lists() });
  },
  merchantSuspended: (qc: QueryClient, merchantId: string) => {
    qc.invalidateQueries({ queryKey: merchantsKeys.detail(merchantId) });
    qc.invalidateQueries({ queryKey: merchantsKeys.lists() });
  },
  orgMerchantEnabled: (qc: QueryClient) => {
    qc.invalidateQueries({ queryKey: merchantsKeys.orgList() });
  },
  orgMerchantDisabled: (qc: QueryClient) => {
    qc.invalidateQueries({ queryKey: merchantsKeys.orgList() });
  },

  // Campaigns
  campaignCreated: (qc: QueryClient, merchantId: string) => {
    qc.invalidateQueries({ queryKey: campaignsKeys.lists(merchantId) });
  },
  campaignStatusChanged: (qc: QueryClient, merchantId: string, campaignId: string) => {
    qc.invalidateQueries({ queryKey: campaignsKeys.lists(merchantId) });
    qc.invalidateQueries({ queryKey: campaignsKeys.detail(merchantId, campaignId) });
    qc.invalidateQueries({ queryKey: analyticsKeys.all });
  },
  orgOfferChanged: (qc: QueryClient) => {
    qc.invalidateQueries({ queryKey: campaignsKeys.orgOffers() });
  },

  // Companies
  companyCreated: (qc: QueryClient) => {
    qc.invalidateQueries({ queryKey: companyKeys.lists() });
  },
};
