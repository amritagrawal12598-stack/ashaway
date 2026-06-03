import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Package, Truck, Box, CheckCircle } from "lucide-react";
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
  const [isNewOrder, setIsNewOrder] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("ashaway:last-order");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.orderId === orderId) {
          setOrder(parsed);
          setIsNewOrder(true);
        }
      } catch {
        /* ignore */
      }
    }
  }, [orderId]);

  const steps = [
    { label: "Confirmed", icon: CheckCircle, status: "completed" },
    { label: "Processing", icon: Box, status: "current" },
    { label: "Shipped", icon: Truck, status: "pending" },
    { label: "Delivered", icon: CheckCircle2, status: "pending" },
  ];

  return (
    <div className="mx-auto max-w-2xl px-5 py-20">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
          {isNewOrder ? "Thank you." : "Order Status"}
        </h1>
        <p className="mt-3 text-muted-foreground">
          Your order <span className="font-mono font-bold text-foreground">{orderId}</span> is {isNewOrder ? "confirmed" : "being processed"}.
          {order?.email && (
            <>
              <br />A receipt was sent to <span className="font-semibold text-foreground">{order.email}</span>.
            </>
          )}
        </p>
      </div>

      {/* Tracking Stepper */}
      <div className="mt-12">
        <div className="relative flex justify-between">
          <div className="absolute top-5 left-0 h-0.5 w-full bg-border" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500"
            style={{ width: "33%" }}
          />
          {steps.map((step, i) => (
            <div key={step.label} className="relative flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background transition-colors ${
                  step.status === "completed"
                    ? "border-primary text-primary"
                    : step.status === "current"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                }`}
              >
                <step.icon className="h-5 w-5" />
              </div>
              <span
                className={`mt-2 text-xs font-bold uppercase tracking-wider ${
                  step.status !== "pending" ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Package className="h-5 w-5 text-primary" />
          <h2 className="font-bold">Order details</h2>
        </div>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Order ID</dt>
            <dd className="font-mono font-semibold">{orderId}</dd>
          </div>
          {order && (
            <>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Items</dt>
                <dd className="font-semibold">{order.items}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Total paid</dt>
                <dd className="font-extrabold">{formatINR(order.total)}</dd>
              </div>
            </>
          )}
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Current Status</dt>
            <dd className="font-bold text-primary">Processing</dd>
          </div>
          <div className="flex justify-between border-t border-border pt-3">
            <dt className="text-muted-foreground">Estimated Delivery</dt>
            <dd className="font-semibold">3–5 business days</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          to="/shop"
          className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground hover:opacity-90"
        >
          Continue shopping
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-full border border-border bg-card px-8 py-3.5 text-sm font-bold hover:bg-secondary"
        >
          Need help?
        </Link>
      </div>
    </div>
  );
}