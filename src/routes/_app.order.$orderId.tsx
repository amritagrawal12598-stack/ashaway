import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Package } from "lucide-react";
import { formatINR } from "@/lib/products";

interface LastOrder {
  orderId: string;
  email: string;
  total: number;
  items: number;
}

export const Route = createFileRoute("/_app/order/$orderId")({
  head: () => ({ meta: [{ title: "Order confirmed — Ashaway" }, { name: "robots", content: "noindex" }] }),
  component: OrderConfirmation,
});

function OrderConfirmation() {
  const { orderId } = Route.useParams();
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("ashaway:last-order");
    if (raw) {
      try {
        setOrder(JSON.parse(raw));
      } catch {
        /* ignore */
      }
    }
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-5 py-20 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">Thank you.</h1>
      <p className="mt-3 text-muted-foreground">
        Your order <span className="font-mono font-bold text-foreground">{orderId}</span> is confirmed.
        {order?.email && (
          <>
            <br />A receipt has been sent to <span className="font-semibold text-foreground">{order.email}</span>.
          </>
        )}
      </p>

      <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-left">
        <div className="flex items-center gap-3">
          <Package className="h-5 w-5 text-primary" />
          <h2 className="font-bold">Order details</h2>
        </div>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-muted-foreground">Order ID</dt><dd className="font-mono font-semibold">{orderId}</dd></div>
          {order && (
            <>
              <div className="flex justify-between"><dt className="text-muted-foreground">Items</dt><dd className="font-semibold">{order.items}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Total paid</dt><dd className="font-extrabold">{formatINR(order.total)}</dd></div>
            </>
          )}
          <div className="flex justify-between"><dt className="text-muted-foreground">Status</dt><dd className="font-semibold text-primary">Processing</dd></div>
        </dl>
      </div>

      <Link to="/shop" className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:opacity-90">
        Continue shopping
      </Link>
    </div>
  );
}