import { Button } from "@/components/shared/button";
import { Voucher } from "@/features/vouchers/types";

export default function VoucherCard({ voucher }: { voucher: Voucher }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const day = date.getDate();
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${month} ${day}, ${year} (${time.toUpperCase()})`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "percentage":
        return "bg-blue-100 text-blue-600";
      case "fixed_amount":
        return "bg-orange-100 text-orange-600";
      case "free_item":
        return "bg-green-100 text-green-600";
      case "bogo":
        return "bg-purple-100 text-purple-600";
      case "points_multiplier":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const numericValue = parseFloat(voucher.value);
  const discountPercent = voucher.type === "percentage" ? numericValue : 0;
  const fixedValue = voucher.type === "fixed_amount" ? numericValue : 0;
  const title = voucher.campaignName ?? voucher.description ?? voucher.code;
  const brand = voucher.merchantName ?? "Unknown Merchant";
  const typeLabel = voucher.type.replace(/_/g, " ").toUpperCase();

  return (
    <div className="rounded-xl border border-gray-100 p-4 flex items-center gap-4 hover:bg-white/50 transition-colors">
      {/* Brand Logo */}
      <div className="shrink-0">
        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
          <span className="text-2xl font-bold text-primary">
            {brand[0].toUpperCase()}
          </span>
        </div>
      </div>

      {/* Middle Section - Title, Type, Expiry */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 truncate">{title}</h3>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(voucher.type)}`}
          >
            {typeLabel}
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500">
            EXPIRES ON {formatDate(voucher.validUntil)}
          </p>
          <p className="text-sm text-gray-500">{brand}</p>
        </div>
      </div>

      {/* Right Section - Value and Button */}
      <div className="shrink-0 text-right">
        {discountPercent > 0 && (
          <div className="text-2xl font-bold text-primary mb-2">
            {discountPercent}% OFF
          </div>
        )}
        {fixedValue > 0 && (
          <div className="text-2xl font-bold text-primary mb-2">
            ${fixedValue.toFixed(2)}
          </div>
        )}
        {discountPercent === 0 && fixedValue === 0 && (
          <div className="text-lg font-bold text-primary mb-2">{typeLabel}</div>
        )}
        <Button href={`/my-vouchers/${voucher.id}`}>View Code</Button>
      </div>
    </div>
  );
}
