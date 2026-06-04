import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shield, Wind, Recycle, Sparkles, Package, Truck } from "lucide-react";
import productHero from "@/assets/product-hero.jpg";
import logo from "@/assets/logo.png";
import productTrio from "@/assets/product-trio.jpg";
import { products, formatINR } from "@/lib/products";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "Ashaway — Smoke freely. Leave nothing behind." },
      {
        name: "description",
        content:
          "Premium disposable pocket ashtrays for travelers, drivers, and urban smokers. Odor-locked, fire-safe, and built for the way you actually live.",
      },
      { property: "og:title", content: "Ashaway — Premium disposable pocket ashtrays" },
      { property: "og:description", content: "Smoke freely. Leave nothing behind." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const add = useCart((s) => s.add);
  const best = products[1];

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-dark)" }}
        />
        <div className="absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pt-16 pb-20 md:grid-cols-2 md:pt-24 md:pb-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3 w-3" /> New • Pocket-friendly
            </span>
            <h1 className="mt-5 text-5xl font-extrabold leading-[0.95] tracking-tighter md:text-7xl">
              Smoke freely.<br />
              <span className="text-primary">Leave nothing</span> behind.
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground md:text-lg">
              The disposable pocket ashtray for smokers who don't want to ruin the moment —
              or the place. Odor-sealed, fire-safe, and small enough to forget.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-ember)] transition-transform hover:scale-[1.02]"
              >
                Shop now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold hover:bg-secondary"
              >
                Learn more
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <Stat label="Sealed" value="100%" />
              <span className="h-8 w-px bg-border" />
              <Stat label="Disposable" value="Single-use" />
              <span className="h-8 w-px bg-border" />
              <Stat label="Made for" value="Pockets" />
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-tr from-primary/20 via-transparent to-primary/10 blur-2xl" />
            <div className="hidden md:flex items-center justify-center h-96 md:h-[420px] md:col-span-2">
              <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)] bg-background p-6">
                <img src={logo} alt="Ashaway logo" className="mx-auto h-72 w-auto object-contain rounded-2xl shadow-[var(--shadow-ember)] bg-card/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Why Ashaway</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">Built for real life.</h2>
          <p className="mt-3 text-muted-foreground">Designed around how people actually smoke — on the move, in cars, at parties, outdoors.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <div className="grid items-center gap-12">
            <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">How it works</p>
                  <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">Four steps. Zero mess.</h2>
              <ol className="mt-8 space-y-5">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-sm font-extrabold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-bold">{s.title}</h3>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 p-10 md:p-16" style={{ background: "var(--gradient-ember)" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/40" />
          <div className="relative flex flex-col items-center gap-8 text-center md:flex-row md:text-left md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl">Buying for an event, bar, or fleet?</h2>
              <p className="mt-3 text-lg text-primary-foreground/90">Save more with the bulk box. Twenty Ashaway pocket ashtrays, retail-ready.</p>
            </div>
            <Link
              to="/shop/$slug"
              params={{ slug: best.slug }}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-8 py-4 text-base font-bold text-background transition-transform hover:scale-[1.02]"
            >
              Shop bulk <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-base font-extrabold text-foreground">{value}</p>
      <p className="uppercase tracking-wider">{label}</p>
    </div>
  );
}

const features = [
  { icon: Shield, title: "Fire-safe lining", desc: "Heat-resistant inner pouch contains ash and embers safely." },
  { icon: Wind, title: "Odor-locked", desc: "Sealed top keeps the smell where it belongs — nowhere." },
  { icon: Package, title: "Pocket-ready", desc: "Slim form factor fits any jacket, bag, or car cup holder." },
  { icon: Recycle, title: "Clean disposal", desc: "Toss responsibly. No mess, no lingering smell." },
];

const steps = [
  { title: "Add water", desc: "Add a small amount of water — this activates the product. Do not skip." },
  { title: "Open & use", desc: "Flip the lid and ash like you normally would. Holds an entire session." },
  { title: "Seal it shut", desc: "Snap the lid closed. The odor-locking seal traps smoke and smell." },
  { title: "Dispose anywhere", desc: "Drop it in any bin. Mess-free, odor-free, guilt-free." },
];