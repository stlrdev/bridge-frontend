import Container from "@/components/layout/container";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Input } from "@/components/shared/input";
import { merchants } from "@/data/merchants";
import MerchantCard from "@/features/merchants/components/merchant-card";

export default function HomePage() {
  return (
    <Container className="my-20">
      <h1 className="text-4xl font-extrabold">Exclusive Merchant Directory</h1>
      <p className="text-muted-foreground mt-5">
        Discover your corporate perks and savings across hundred of premium
        brands.
      </p>

      <div className="my-8">
        <Input placeholder="Search for a merchant" className="h-12" />
      </div>

      <div className="flex gap-4 flex-wrap">
        <span className="cursor-pointer font-medium text-white bg-primary text-sm px-4 py-2 rounded-full">
          All Rewards
        </span>
        <span className="cursor-pointer font-medium text-foreground text-sm px-4 py-2 rounded-full border border-gray-200">
          Food & Beverage
        </span>
        <span className="cursor-pointer font-medium text-foreground text-sm px-4 py-2 rounded-full border border-gray-200">
          Retail
        </span>
        <span className="cursor-pointer font-medium text-foreground text-sm px-4 py-2 rounded-full border border-gray-200">
          Wellness
        </span>
        <span className="cursor-pointer font-medium text-foreground text-sm px-4 py-2 rounded-full border border-gray-200">
          Lifestyle
        </span>
        <span className="cursor-pointer font-medium text-foreground text-sm px-4 py-2 rounded-full border border-gray-200">
          Entertainment
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-10 mt-8">
        {merchants.map((merchant) => (
          <div key={merchant.id} className="flex justify-center">
            <MerchantCard merchant={merchant} />
          </div>
        ))}
      </div>
    </Container>
  );
}
