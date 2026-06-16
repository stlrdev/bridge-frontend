import { vouchersKeys } from "@/features/vouchers/hooks";
import { QueryClient } from "@tanstack/react-query";

export const invalidate = {
  merchantCreated: (qc: QueryClient) => {},

  voucherGenerated: (qc: QueryClient) => {
    qc.invalidateQueries({ queryKey: vouchersKeys.all });
  },
  voucherValidated: (qc: QueryClient) => {
    qc.invalidateQueries({ queryKey: vouchersKeys.all });
  },
};
