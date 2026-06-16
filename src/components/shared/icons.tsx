import {
  Letter,
  LockKeyholeMinimalistic,
  Password,
  Copy,
  TicketSale,
  Banknote2,
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  UserCircle,
  Card,
  Bell,
  Logout,
  AddCircle,
  Widget,
  ClipboardList,
  Chart2,
  Folder,
  UsersGroupTwoRounded,
  Calendar,
  City,
  SettingsMinimalistic,
  AltArrowRight,
  Star,
  Eye,
  TrashBinTrash,
  PenNewSquare,
  GallerySend,
  Shop,
  DangerTriangle,
  TagPrice,
  InfoCircle,
  InboxLine,
} from "@solar-icons/react-perf/category/style/Outline";
import { IconProps } from "@solar-icons/react-perf/lib/types";
import { Gift } from "lucide-react";

const ICONS_DEFAULT_SIZE = 16;

export const Icons = {
  Lock: (props: IconProps) => (
    <LockKeyholeMinimalistic
      className="text-muted-foreground"
      size={ICONS_DEFAULT_SIZE}
      {...props}
    />
  ),
  Email: (props: IconProps) => (
    <Letter
      className="text-muted-foreground"
      size={ICONS_DEFAULT_SIZE}
      {...props}
    />
  ),
  Password: (props: IconProps) => (
    <Password
      className="text-muted-foreground"
      size={ICONS_DEFAULT_SIZE}
      {...props}
    />
  ),
  Copy: (props: IconProps) => <Copy size={ICONS_DEFAULT_SIZE} {...props} />,
  Coupon: (props: IconProps) => (
    <TicketSale size={ICONS_DEFAULT_SIZE} {...props} />
  ),
  Banknote: (props: IconProps) => (
    <Banknote2 size={ICONS_DEFAULT_SIZE} {...props} />
  ),
  ArrowLeft: (props: IconProps) => (
    <ArrowLeft size={ICONS_DEFAULT_SIZE} {...props} />
  ),
  ArrowRight: (props: IconProps) => (
    <ArrowRight size={ICONS_DEFAULT_SIZE} {...props} />
  ),
  ArrowDown: (props: IconProps) => (
    <ArrowDown size={ICONS_DEFAULT_SIZE} {...props} />
  ),
  ArrowUp: (props: IconProps) => (
    <ArrowUp size={ICONS_DEFAULT_SIZE} {...props} />
  ),

  ChevronLeft: (props: IconProps) => (
    <AltArrowRight size={ICONS_DEFAULT_SIZE} {...props} />
  ),

  UserCircle: (props: IconProps) => (
    <UserCircle size={ICONS_DEFAULT_SIZE} {...props} />
  ),

  Card: (props: IconProps) => <Card size={ICONS_DEFAULT_SIZE} {...props} />,
  Bell: (props: IconProps) => <Bell size={ICONS_DEFAULT_SIZE} {...props} />,
  Star: (props: IconProps) => <Star size={ICONS_DEFAULT_SIZE} {...props} />,
  Logout: (props: IconProps) => <Logout size={ICONS_DEFAULT_SIZE} {...props} />,

  Eye: (props: IconProps) => <Eye size={ICONS_DEFAULT_SIZE} {...props} />,
  Trash: (props: IconProps) => (
    <TrashBinTrash size={ICONS_DEFAULT_SIZE} {...props} />
  ),
  Edit: (props: IconProps) => (
    <PenNewSquare size={ICONS_DEFAULT_SIZE} {...props} />
  ),

  AddCircle: (props: IconProps) => (
    <AddCircle size={ICONS_DEFAULT_SIZE} {...props} />
  ),
  UploadImage: (props: IconProps) => (
    <GallerySend size={ICONS_DEFAULT_SIZE} {...props} />
  ),

  Dashboard: (props: IconProps) => (
    <Widget size={ICONS_DEFAULT_SIZE} {...props} />
  ),
  List: (props: IconProps) => (
    <ClipboardList size={ICONS_DEFAULT_SIZE} {...props} />
  ),
  ChartBar: (props: IconProps) => (
    <Chart2 size={ICONS_DEFAULT_SIZE} {...props} />
  ),
  Folder: (props: IconProps) => <Folder size={ICONS_DEFAULT_SIZE} {...props} />,
  Users: (props: IconProps) => (
    <UsersGroupTwoRounded size={ICONS_DEFAULT_SIZE} {...props} />
  ),
  Shop: (props: IconProps) => <Shop size={ICONS_DEFAULT_SIZE} {...props} />,
  Calendar: (props: IconProps) => (
    <Calendar size={ICONS_DEFAULT_SIZE} {...props} />
  ),
  Companies: (props: IconProps) => (
    <City size={ICONS_DEFAULT_SIZE} {...props} />
  ),
  Gift: (props: IconProps) => <Gift size={ICONS_DEFAULT_SIZE} {...props} />,
  TagPrice: (props: IconProps) => <TagPrice size={ICONS_DEFAULT_SIZE} />,
  Settings: (props: IconProps) => (
    <SettingsMinimalistic size={ICONS_DEFAULT_SIZE} {...props} />
  ),
  Alert: (props: IconProps) => (
    <DangerTriangle size={ICONS_DEFAULT_SIZE} {...props} />
  ),
  Info: (props: IconProps) => (
    <InfoCircle size={ICONS_DEFAULT_SIZE} {...props} />
  ),
  Content: (props: IconProps) => (
    <InboxLine size={ICONS_DEFAULT_SIZE} {...props} />
  ),
} as const;
