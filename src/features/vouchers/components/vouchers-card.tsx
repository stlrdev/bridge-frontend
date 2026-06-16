import { Button } from "@/components/shared/button";
import { Voucher } from "@/data/my-vouchers";
import Image from "next/image";

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

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "shopping":
        return "bg-blue-100 text-blue-600";
      case "food & beverages":
        return "bg-orange-100 text-orange-600";
      case "retail":
        return "bg-purple-100 text-purple-600";
      case "wellness":
        return "bg-green-100 text-green-600";
      case "entertainment":
        return "bg-pink-100 text-pink-600";
      case "lifestyle":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="rounded-xl border border-gray-100 p-4 flex items-center gap-4 hover:bg-white/50 transition-colors">
      {/* Brand Logo */}
      <div className="shrink-0">
        <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
          <Image
            src={voucher.logo}
            alt={voucher.brand}
            width={64}
            height={64}
            className="w-12 h-12 object-contain"
          />
        </div>
      </div>

      {/* Middle Section - Title, Category, Expiry, Value */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 truncate">
            {voucher.title}
          </h3>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
              voucher.category,
            )}`}
          >
            {voucher.category.toUpperCase()}
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500">
            EXPIRES ON {formatDate(voucher.expiresAt)}
          </p>
          {voucher.value > 0 && (
            <p className="text-sm text-gray-500">
              VALUE ${voucher.value.toFixed(2)} Credit
            </p>
          )}
        </div>
      </div>

      {/* Right Section - Discount and Button */}
      <div className="shrink-0 text-right">
        {voucher.discount > 0 && (
          <div className="text-2xl font-bold text-primary mb-2">
            {voucher.discount}% OFF
          </div>
        )}
        {voucher.value > 0 && voucher.discount === 0 && (
          <div className="text-2xl font-bold text-primary mb-2">
            ${voucher.value}
          </div>
        )}
        <Button href={`/my-vouchers/${voucher.id}`}>View Code</Button>
      </div>
    </div>
  );
}
