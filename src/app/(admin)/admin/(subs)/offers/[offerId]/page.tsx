export default function OfferDetailsPage({
  params,
}: {
  params: { offerId: string };
}) {
  return <div>{params.offerId}</div>;
}
