import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

const faqs = [
  { q: "How does the odor seal actually work?", a: "Each Ashaway has a fire-safe lining and a snap-shut lid with a gasket that traps smoke and odor. Once closed, it stays sealed until you toss it." },
  { q: "Is it safe to put hot ash inside?", a: "Yes. The inner lining is heat-resistant and designed to extinguish embers. Always snap the lid shut after use." },
  { q: "Can I reuse it?", a: "Ashaway is single-use by design. Reusing reduces the seal's effectiveness." },
  { q: "How many cigarettes does one hold?", a: "A single Ashaway comfortably holds 8–10 cigarette butts plus ash." },
  { q: "Is it eco-friendly?", a: "The outer is recyclable paperboard with soy ink. The inner foil is heat-resistant. We're working toward fully compostable materials." },
  { q: "Do you ship across India?", a: "Yes — free shipping on orders over ₹499. Standard delivery in 3–5 business days." },
  { q: "What's your return policy?", a: "Unopened packs can be returned within 14 days for a full refund." },
];

export const Route = createFileRoute("/_app/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Ashaway" },
      { name: "description", content: "Answers to the most common questions about Ashaway disposable pocket ashtrays." },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-bold uppercase tracking-widest text-primary">FAQ</p>
      <h1 className="mt-2 text-5xl font-extrabold tracking-tight md:text-6xl">Questions, answered.</h1>
      <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
        {faqs.map((f) => (
          <details key={f.q} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold">
              {f.q}
              <span className="text-2xl leading-none text-primary transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-12 md:hidden">
        <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)] bg-background p-6">
          <img src={logo} alt="Ashaway logo" className="mx-auto h-72 w-auto object-contain rounded-2xl shadow-[var(--shadow-ember)] bg-card/20" />
        </div>
      </div>
    </div>
  );
}