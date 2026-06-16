export interface RedemptionSummary {
  totalRedemptions: number;
  totalDiscountGiven: string;
  averageDiscount: string;
  totalOrderValue: string;
  uniqueCustomers: number;
}

export interface RedemptionTrendPoint {
  date: string;
  redemptions: number;
  discountGiven: string;
}

export interface RedemptionsByType {
  type: string;
  count: number;
  totalDiscount: string;
}

export interface TopVoucher {
  id: string;
  code: string;
  type: string;
  value: string;
  redemptions: number;
  maxRedemptions: number | null;
}

export interface TopMerchant {
  id: string;
  name: string;
  slug: string;
  redemptions: number;
  totalDiscountGiven: string;
  uniqueCustomers: number;
}

export interface PeakTime {
  hour: number;
  dayOfWeek: string;
  redemptions: number;
}

export interface CustomerInsights {
  activeCustomers: number;
  newCustomers: number;
  totalRedemptions: number;
  totalSavings: string;
  customersBySegment: Record<string, number>;
}

export interface CampaignPerformance {
  campaignId: string;
  campaignName: string;
  vouchersGenerated: number;
  vouchersRedeemed: number;
  totalDiscountGiven: string;
  uniqueCustomers: number;
  redemptionRate: number;
  averageDiscount: string;
}

export interface AnalyticsDateParams {
  startDate?: string;
  endDate?: string;
}
