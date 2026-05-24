import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_app/shipping")({
  head: () => ({ meta: [{ title: "Shipping Policy — Ashaway" }] }),
  component: () => (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-5xl font-extrabold tracking-tight">Shipping</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p><strong className="text-foreground">Standard:</strong> 3–5 business days. Free over ₹499, otherwise ₹49.</p>
        <p><strong className="text-foreground">Express:</strong> 1–2 business days for an additional ₹99.</p>
        <p>We currently ship across India only. International shipping is coming soon.</p>
        <p>You'll receive a tracking link by email once your order is dispatched.</p>
      </div>
    </article>
  ),
});