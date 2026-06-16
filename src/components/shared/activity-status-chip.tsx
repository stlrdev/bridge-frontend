export default function ActivityStatusChip({
  status,
}: {
  status: "active" | "inactive" | "suspended" | "expired";
}) {
  const getStatusBgColor = () => {
    switch (status) {
      case "active":
        return "bg-green-400/20";
      case "inactive":
        return "bg-red-400/20";
      case "suspended":
        return "bg-yellow-400/20";
      case "expired":
        return "bg-gray-400/20";
    }
  };
  const getStatusTextColor = () => {
    switch (status) {
      case "active":
        return "text-green-400";
      case "inactive":
        return "text-red-400";
      case "suspended":
        return "text-yellow-400";
      case "expired":
        return "text-gray-400";
    }
  };
  return (
    <span
      className={`${getStatusBgColor()} ${getStatusTextColor()} px-2 py-1 rounded-full text-xs capitalize`}
    >
      {status}
    </span>
  );
}
