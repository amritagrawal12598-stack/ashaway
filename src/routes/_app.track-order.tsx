import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PackageSearch, Search } from "lucide-react";

export const Route = createFileRoute("/_app/track-order")({
  head: () => ({ meta: [{ title: "Track Order — Ashaway" }] }),
  component: TrackOrderPage,
});

function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      navigate({ to: "/order/$orderId", params: { orderId: orderId.trim() } });
    }
  };

  return (
    <div className="mx-auto max-w-xl px-5 py-24">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <PackageSearch className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight">Track your order</h1>
        <p className="mt-3 text-muted-foreground">
          Enter your order ID to see its current status and estimated delivery.
        </p>
      </div>

      <form onSubmit={handleTrack} className="mt-10">
        <div className="relative">
          <label htmlFor="orderId" className="sr-only">Order ID</label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            id="orderId"
            type="text"
            required
            placeholder="AW-XXXXXXXX"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="block w-full rounded-2xl border border-border bg-card py-4 pl-11 pr-4 text-base font-medium ring-primary transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <button
          type="submit"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground shadow-[0_8px_16px_-6px_rgba(249,115,22,0.3)] transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Track order
        </button>
      </form>

      <div className="mt-12 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Where is my order ID?</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          You can find your order ID in the confirmation email we sent you right after your purchase. It usually starts with <span className="font-mono font-bold text-foreground">AW-</span>.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          If you can't find it, please check your spam folder or <a href="/contact" className="font-semibold text-primary underline">contact support</a>.
        </p>
      </div>
    </div>
  );
}
