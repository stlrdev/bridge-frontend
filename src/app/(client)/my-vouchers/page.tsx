import Container from "@/components/layout/container";
import { TabsDemo } from "@/components/shared/tabs-demo";
import { vouchers } from "@/data/my-vouchers";
import VoucherCard from "@/features/vouchers/components/vouchers-card";

export default function MyVouchersPage() {
  return (
    <Container className="my-20">
      <h1 className="text-4xl font-extrabold">My Vouchers History</h1>
      <p className="text-muted-foreground mt-5">
        Manage your active benefits and track your historical savings.
      </p>
      <div className="grid grid-cols-[1fr_300px] gap-4">
        <div className="mt-6 space-y-4 p-5 rounded-lg bg-card">
          {vouchers.map((voucher) => (
            <VoucherCard key={voucher.id} voucher={voucher} />
          ))}
        </div>
      </div>
    </Container>
  );
}
