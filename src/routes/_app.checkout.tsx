import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FileText, Lock } from "lucide-react";
import { cartTotals, useCart } from "@/lib/cart-store";
import { formatINR } from "@/lib/products";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoUrl from "@/assets/logo.png";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  fullName: z.string().min(2, "Required").max(100),
  phone: z.string().min(10, "Enter a valid phone").max(15),
  address: z.string().min(5, "Required").max(200),
  city: z.string().min(2, "Required").max(60),
  state: z.string().min(2, "Required").max(60),
  pincode: z.string().regex(/^\d{6}$/, "Enter a 6-digit pincode"),
  shipping: z.enum(["standard", "express"]),
});
type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/_app/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Ashaway" }, { name: "robots", content: "noindex" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const { resolved, subtotal, shipping, tax, total } = cartTotals(lines);

  const { register, handleSubmit, formState, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { shipping: "standard" },
  });
  const shipMethod = watch("shipping");
  const shipExtra = shipMethod === "express" ? 99 : 0;
  const finalTotal = total + shipExtra;

  const onSubmit = async (data: FormValues) => {
    const orderId = `AW-${Date.now().toString(36).toUpperCase()}`;
    const formatPDFPrice = (n: number) => "Rs. " + n.toLocaleString("en-IN");
    const d = new Date();
    const dateStr = `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`;

    // Generate PDF
    const doc = new jsPDF();
    
    // Modern accents: Top colored border
    doc.setFillColor(234, 88, 12); // Tailwind orange-600
    doc.rect(0, 0, 210, 8, 'F'); // 210 is A4 width
    
    // Attempt to load and add logo on the right side
    try {
      const img = new Image();
      img.src = logoUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imgData = canvas.toDataURL("image/png");
        let pdfWidth = 35;
        let pdfHeight = (img.height * pdfWidth) / img.width;
        if (pdfHeight > 15) {
          pdfHeight = 15;
          pdfWidth = (img.width * pdfHeight) / img.height;
        }
        doc.addImage(imgData, 'PNG', 210 - 14 - pdfWidth, 16, pdfWidth, pdfHeight);
      }
    } catch (err) {
      console.warn("Could not load logo for PDF", err);
    }

    // Header Left
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(234, 88, 12);
    doc.text("INVOICE", 14, 25);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(`Order Ref: ${orderId}`, 14, 32);
    doc.text(`Generated: ${dateStr}`, 14, 37);

    // Separator line
    doc.setDrawColor(220);
    doc.line(14, 45, 196, 45);

    // Billed To
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(50);
    doc.text("BILLED TO:", 14, 55);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0);
    doc.text(data.fullName, 14, 61);
    doc.setTextColor(80);
    doc.text(data.address, 14, 66);
    doc.text(`${data.city}, ${data.state} - ${data.pincode}`, 14, 71);
    doc.text(data.email, 14, 76);
    doc.text(data.phone, 14, 81);

    // From
    doc.setFont("helvetica", "bold");
    doc.setTextColor(50);
    doc.text("FROM:", 120, 55);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0);
    doc.text("Ashaway Co.", 120, 61);
    doc.setTextColor(80);
    doc.text("Premium Disposable Ashtrays", 120, 66);
    doc.text("ashaway3001@gmail.com", 120, 71);

    const tableData = resolved.map(l => [
      l.product.name,
      l.design,
      l.qty.toString(),
      formatPDFPrice(l.product.price),
      formatPDFPrice(l.subtotal)
    ]);

    autoTable(doc, {
      startY: 95,
      head: [['Product', 'Design', 'Qty', 'Price', 'Total']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [234, 88, 12], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { font: 'helvetica', fontSize: 10, cellPadding: 6 },
      alternateRowStyles: { fillColor: [249, 250, 251] }, // tailwind gray-50
      columnStyles: {
        0: { cellWidth: 50 },
        4: { halign: 'right' }
      }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;
    
    // Totals section
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Subtotal:", 140, finalY);
    doc.setTextColor(0);
    doc.text(formatPDFPrice(subtotal), 196, finalY, { align: 'right' });

    doc.setTextColor(100);
    doc.text("Shipping:", 140, finalY + 7);
    doc.setTextColor(0);
    doc.text(formatPDFPrice(shipping), 196, finalY + 7, { align: 'right' });

    doc.setTextColor(100);
    doc.text("Tax (18%):", 140, finalY + 14);
    doc.setTextColor(0);
    doc.text(formatPDFPrice(tax), 196, finalY + 14, { align: 'right' });

    doc.setDrawColor(220);
    doc.line(140, finalY + 18, 196, finalY + 18);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(234, 88, 12);
    doc.text("Grand Total:", 140, finalY + 25);
    doc.text(formatPDFPrice(finalTotal), 196, finalY + 25, { align: 'right' });
    
    // Footer message
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text("Thank you for your business. Please attach this invoice to your order email.", 105, 280, { align: 'center' });

    doc.save(`Ashaway_Order_${orderId}.pdf`);

    sessionStorage.setItem(
      "ashaway:last-order",
      JSON.stringify({ orderId, email: data.email, total: finalTotal, items: resolved.length }),
    );
    clear();
    navigate({ to: "/order/$orderId", params: { orderId } });
  };

  if (resolved.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="text-4xl font-extrabold">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Add a product to get started.</p>
        <Link to="/shop" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground">
          Shop products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
      <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Checkout</h1>
      <p className="mt-2 text-muted-foreground">Almost there. Securely complete your order.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 grid gap-10 lg:grid-cols-[1fr,400px]">
        <div className="space-y-8">
          <Section title="Contact">
            <Field label="Email" error={formState.errors.email?.message}>
              <input type="email" autoComplete="email" {...register("email")} className={input} />
            </Field>
            <Field label="Phone" error={formState.errors.phone?.message}>
              <input inputMode="tel" autoComplete="tel" {...register("phone")} className={input} />
            </Field>
          </Section>

          <Section title="Shipping address">
            <Field label="Full name" error={formState.errors.fullName?.message}>
              <input autoComplete="name" {...register("fullName")} className={input} />
            </Field>
            <Field label="Address" error={formState.errors.address?.message}>
              <input autoComplete="street-address" {...register("address")} className={input} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="City" error={formState.errors.city?.message}>
                <input autoComplete="address-level2" {...register("city")} className={input} />
              </Field>
              <Field label="State" error={formState.errors.state?.message}>
                <input autoComplete="address-level1" {...register("state")} className={input} />
              </Field>
              <Field label="Pincode" error={formState.errors.pincode?.message}>
                <input inputMode="numeric" autoComplete="postal-code" {...register("pincode")} className={input} />
              </Field>
            </div>
          </Section>

          <Section title="Shipping method">
            <div className="space-y-2">
              <ShipOption
                checked={shipMethod === "standard"}
                onChange={() => setValue("shipping", "standard")}
                title="Standard"
                desc="3–5 business days"
                price={subtotal >= 499 ? "Free" : formatINR(49)}
              />
              <ShipOption
                checked={shipMethod === "express"}
                onChange={() => setValue("shipping", "express")}
                title="Express"
                desc="1–2 business days"
                price={formatINR(99)}
              />
            </div>
          </Section>

          <Section title="Order Generation">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <FileText className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-semibold">Download Order PDF</p>
                <p className="text-xs text-muted-foreground">Instead of paying now, generate a PDF quote and email it to us.</p>
              </div>
            </div>
          </Section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-base font-bold">Order summary</h2>
            <ul className="mt-4 space-y-3 border-b border-border pb-4">
              {resolved.map((l) => (
                <li key={`${l.productId}-${l.design}`} className="flex items-center gap-3 text-sm">
                  <div className="relative">
                    <img src={l.product.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-primary-foreground">
                      {l.qty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{l.product.name}</p>
                    <p className="text-xs text-muted-foreground">{l.design}</p>
                  </div>
                  <p className="font-semibold">{formatINR(l.subtotal)}</p>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-1.5 text-sm">
              <Row label="Subtotal" value={formatINR(subtotal)} />
              <Row label="Base shipping" value={shipping === 0 ? "Free" : formatINR(shipping)} />
              {shipExtra > 0 && <Row label="Express upgrade" value={formatINR(shipExtra)} />}
              <Row label="GST (18%)" value={formatINR(tax)} />
            </dl>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <span className="text-base font-extrabold">Total</span>
              <span className="text-base font-extrabold">{formatINR(finalTotal)}</span>
            </div>
            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="mt-5 flex w-full items-center justify-center rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-ember)] hover:opacity-90 disabled:opacity-60"
            >
              {formState.isSubmitting ? "Generating PDF..." : `Download Order PDF`}
            </button>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              By placing your order you agree to our <Link to="/terms" className="underline">Terms</Link>.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}

const input =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
function ShipOption({ checked, onChange, title, desc, price }: { checked: boolean; onChange: () => void; title: string; desc: string; price: string }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-colors ${
        checked ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-secondary"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${checked ? "border-primary" : "border-border"}`}>
          {checked && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
        </span>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      <p className="text-sm font-bold">{price}</p>
    </button>
  );
}