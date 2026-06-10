import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { formatINR } from "@/lib/products";

interface LastOrder {
  orderId: string;
  email: string;
  total: number;
  items: number;
}

export const Route = createFileRoute("/_app/order/$orderId")({
  head: ({ params }) => ({
    meta: [
      { title: `Order ${params.orderId} — Ashaway` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderConfirmation,
});

function OrderConfirmation() {
  const { orderId } = Route.useParams();
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("ashaway:last-order");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.orderId === orderId) {
          setOrder(parsed);
        }
      } catch {
        /* ignore */
      }
    }
  }, [orderId]);

  return (
    <div className="mx-auto max-w-2xl px-5 py-20 text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-500/15 text-green-500">
        <CheckCircle className="h-12 w-12" />
      </div>
      
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
        Order placed successfully!
      </h1>
      
      <p className="mt-4 text-lg text-muted-foreground">
        Order <span className="font-mono font-bold text-foreground">{orderId}</span> has been sent to our team.
      </p>

      <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-8">
        <h2 className="text-2xl font-bold text-foreground">What happens next?</h2>
        <p className="mt-3 text-muted-foreground">
          We have officially received your automated order! Our team will review your order immediately and contact you via email or phone to finalize shipping and payment details.
        </p>
      </div>

      {order && (
        <div className="mt-12 rounded-2xl border border-border bg-card p-6 text-left">
          <h3 className="font-bold">Order Summary</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Order ID</dt>
              <dd className="font-mono font-semibold">{orderId}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Items</dt>
              <dd className="font-semibold">{order.items}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Total Value</dt>
              <dd className="font-extrabold">{formatINR(order.total)}</dd>
            </div>
          </dl>
        </div>
      )}

      <div className="mt-8">
        <Link
          to="/shop"
          className="inline-flex items-center justify-center rounded-full border border-border bg-card px-8 py-3.5 text-sm font-bold hover:bg-secondary"
        >
          Back to shop
        </Link>
      </div>
    </div>
  );
}