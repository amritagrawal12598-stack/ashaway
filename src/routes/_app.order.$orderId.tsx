import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, FileText, ArrowRight } from "lucide-react";
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

  const subject = encodeURIComponent(`New Order Request - ${orderId}`);
  const body = encodeURIComponent(`Hi Ashaway team,\n\nI have attached my order PDF (${orderId}) to this email. Please review it and let me know the next steps.\n\nThank you!`);
  const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=ashaway3001@gmail.com&su=${subject}&body=${body}`;

  return (
    <div className="mx-auto max-w-2xl px-5 py-20 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-primary">
        <FileText className="h-10 w-10" />
      </div>
      
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
        Your Order PDF is Ready!
      </h1>
      
      <p className="mt-4 text-lg text-muted-foreground">
        Order <span className="font-mono font-bold text-foreground">{orderId}</span> has been generated and downloaded to your device.
      </p>

      <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-8">
        <h2 className="text-2xl font-bold text-foreground">Next Step: Email us your order</h2>
        <p className="mt-3 text-muted-foreground">
          To complete your purchase, please email us the PDF you just downloaded. We will review your design choices and get back to you immediately to finalize everything.
        </p>

        <a
          href={mailtoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-[var(--shadow-ember)] transition-transform hover:scale-[1.02] sm:w-auto sm:inline-flex"
        >
          <Mail className="h-5 w-5" /> Send Order Email <ArrowRight className="h-4 w-4" />
        </a>
        
        <p className="mt-4 text-sm font-bold text-destructive">
          ⚠️ Don't forget to attach the downloaded PDF to the email!
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