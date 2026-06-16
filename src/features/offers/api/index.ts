import { del, get, patch, post } from "@/core/api/client";
import { CreateOfferPayload, Offer } from "../types";
import { ApiResponse } from "@/core/types";

export const offersApi = {
  listByMerchant: (merchantId: string) =>
    get<Offer[]>(`/merchants/${merchantId}/offers`),
  create: (data: CreateOfferPayload) =>
    post<ApiResponse<Offer>, CreateOfferPayload>("/offers", data),
  update: (id: string, payload: Partial<CreateOfferPayload>) =>
    patch<ApiResponse<Offer>, typeof payload>(`/offers/${id}`, payload),
  delete: (id: string) => del<ApiResponse<null>>(`/offers/${id}`),
};
