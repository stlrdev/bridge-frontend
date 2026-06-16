import { Info } from "@/components/shared/info";

export default function InfoDemo() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Info Component Variants</h1>

      <div className="grid gap-6">
        {/* Default variant (like the screenshot) */}
        <Info variant="default">
          <span>
            Pro-tip: Increase your screen brightness for faster scanning at the
            checkout.
          </span>
        </Info>

        {/* With title */}
        <Info variant="default" title="Pro Tip">
          <span>
            Increase your screen brightness for faster scanning at the checkout.
          </span>
        </Info>

        {/* Success variant */}
        <Info variant="success" title="Success">
          <span>Your payment has been processed successfully.</span>
        </Info>

        {/* Warning variant */}
        <Info variant="warning" title="Warning">
          <span>Your session is about to expire. Please save your work.</span>
        </Info>

        {/* Error variant */}
        <Info variant="error" title="Error">
          <span>Failed to process your payment. Please try again.</span>
        </Info>

        {/* Info variant */}
        <Info variant="info" title="Information">
          <span>You can track your order status in the dashboard.</span>
        </Info>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Size Variants</h2>
        <div className="grid gap-4">
          <Info variant="default" size="sm" title="Small">
            <span>This is a small info component with compact spacing.</span>
          </Info>

          <Info variant="default" size="default" title="Default">
            <span>This is the default sized info component.</span>
          </Info>

          <Info variant="default" size="lg" title="Large">
            <span>
              This is a large info component with more spacing and larger text.
            </span>
          </Info>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Custom Icons</h2>
        <div className="grid gap-4">
          <Info
            variant="default"
            title="Custom Icon"
            icon={<span className="text-2xl">💡</span>}
          >
            <span>This info component uses a custom emoji icon.</span>
          </Info>

          <Info variant="success" title="No Icon" showIcon={false}>
            <span>This info component has no icon displayed.</span>
          </Info>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Multi-line Content</h2>
        <Info variant="default" title="Complex Information">
          <div className="space-y-2">
            <p>Here's a multi-line info component with multiple paragraphs:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>First important point to remember</li>
              <li>Second key consideration</li>
              <li>Third helpful tip</li>
            </ul>
            <p>Additional context can be provided here.</p>
          </div>
        </Info>
      </div>
    </div>
  );
}
