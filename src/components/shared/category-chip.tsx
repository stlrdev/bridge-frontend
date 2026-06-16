type CompanyCategory = "Food & Bev" | "Retail" | "Lifestyle" | "Tech";

interface CategoryConfig {
  color: string;
  bgColor: string;
  label: string;
}

const categoryConfigs: Record<CompanyCategory, CategoryConfig> = {
  "Food & Bev": {
    color: "text-green-400",
    bgColor: "bg-green-400/20",
    label: "Food & Bev",
  },
  Retail: {
    color: "text-blue-400",
    bgColor: "bg-blue-400/20",
    label: "Retail",
  },
  Lifestyle: {
    color: "text-pink-400",
    bgColor: "bg-pink-400/20",
    label: "Lifestyle",
  },
  Tech: {
    color: "text-purple-400",
    bgColor: "bg-purple-400/20",
    label: "Tech",
  },
};

export default function CategoryChip({
  category,
}: {
  category: CompanyCategory;
}) {
  const config = categoryConfigs[category];

  if (!config) {
    return (
      <span
        className={`inline-flex items-center text-sm gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-600`}
      >
        {category}
      </span>
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
