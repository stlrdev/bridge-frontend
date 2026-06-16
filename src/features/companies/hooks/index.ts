import { useQuery } from "@tanstack/react-query";
import { CompanyListParams } from "../types";
import { companiesApi } from "../api";

export const companyKeys = {
  all: ["companies"] as const,
  lists: () => [...companyKeys.all, "list"] as const,
  list: (params?: CompanyListParams) => [...companyKeys.all, params] as const,
  detail: (id: string) => [...companyKeys.all, "details", id] as const,
  branding: (id: string) => [...companyKeys.all, "branding", id] as const,
};
