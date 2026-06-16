import { Icons } from "@/components/shared/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import AddNewOffer from "@/features/offers/forms/add-new-offer";

export default function AddOfferPage() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold">Create New Offer</h3>
      </div>
      <AddNewOffer />
    </>
  );
}
