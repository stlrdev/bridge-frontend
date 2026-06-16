type CompanyTier = "bronze" | "silver" | "gold" | "platinum";

interface TierConfig {
  color: string;
  bgColor: string;
  label: string;
}

const tierConfigs: Record<CompanyTier, TierConfig> = {
  bronze: {
    color: "text-orange-400",
    bgColor: "bg-orange-400/20",
    label: "Bronze",
  },
  silver: {
    color: "text-slate-400",
    bgColor: "bg-slate-400/20",
    label: "Silver",
  },
  gold: {
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/20",
    label: "Gold",
  },
  platinum: {
    color: "text-purple-400",
    bgColor: "bg-purple-400/20",
    label: "Platinum",
  },
};

export default function TierChip({
  tier,
  compact = false,
}: {
  tier: CompanyTier;
  compact?: boolean;
}) {
  const config = tierConfigs[tier];

  if (!config) {
    return (
      <span
        className={`text-xs ${compact ? "w-6 h-6" : "px-2 py-1"} bg-gray-100 text-gray-600 ${compact ? "rounded-full flex items-center justify-center" : "rounded-md"}`}
      >
        {compact ? tier.charAt(0).toUpperCase() : tier}
      </span>
    );
  }

  if (compact) {
    return (
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-full ${config.bgColor} ${config.color}`}
      >
        <span className="text-xs font-medium">
          {config.label.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center text-sm gap-1 px-3 py-1 rounded-full ${config.bgColor} ${config.color}`}
    >
      <span className="text-xs font-medium">{config.label}</span>
    </div>
  );
}
