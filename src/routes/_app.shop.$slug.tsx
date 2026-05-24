import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { getProduct, formatINR, products } from "@/lib/products";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/_app/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Ashaway` },
          { name: "description", content: loaderData.product.tagline },
          { property: "og:title", content: `${loaderData.product.name} — Ashaway` },
          { property: "og:description", content: loaderData.product.tagline },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [{ title: "Product — Ashaway" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <h1 className="text-3xl font-extrabold">Product not found</h1>
      <Link to="/shop" className="mt-4 inline-block text-primary hover:underline">
        Back to shop
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <h1 className="text-3xl font-extrabold">Something went wrong</h1>
      <Link to="/shop" className="mt-4 inline-block text-primary hover:underline">Back to shop</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const others = products.filter((p) => p.id !== product.id);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <img src={product.gallery[active]} alt={product.name} className="aspect-square w-full object-cover" width={1024} height={1024} />
          </div>
          {product.gallery.length > 1 && (
            <div className="mt-3 flex gap-3">
              {product.gallery.map((g: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition-colors ${
                    i === active ? "border-primary" : "border-border"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={g} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {product.badge && (
            <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              {product.badge}
            </span>
          )}
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">{product.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{product.tagline}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-extrabold">{formatINR(product.price)}</span>
            {product.compareAt && (
              <span className="text-lg text-muted-foreground line-through">{formatINR(product.compareAt)}</span>
            )}
            {product.compareAt && (
              <span className="rounded-full bg-primary/15 px-2.5 py-1 text-xs font-bold text-primary">
                Save {Math.round((1 - product.price / product.compareAt) * 100)}%
              </span>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>

          <ul className="mt-6 space-y-2.5">
            {product.features.map((f: string) => (
              <li key={f} className="flex items-start gap-2.5 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-border bg-card">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-3 text-muted-foreground hover:text-foreground" aria-label="Decrease">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-3 text-muted-foreground hover:text-foreground" aria-label="Increase">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => add(product.id, qty)}
              className="flex-1 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-ember)] hover:opacity-90 sm:flex-initial sm:px-8"
            >
              Add to cart — {formatINR(product.price * qty)}
            </button>
          </div>

          <div className="mt-8 grid gap-3 rounded-2xl border border-border bg-card/50 p-5 sm:grid-cols-2">
            <Perk icon={Truck} title="Free shipping over ₹499" desc="Ships in 1–2 business days" />
            <Perk icon={ShieldCheck} title="Secure checkout" desc="100% encrypted payments" />
          </div>
        </div>
      </div>

      <section className="mt-24">
        <h2 className="text-2xl font-extrabold">You might also like</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {others.map((p) => (
            <Link key={p.id} to="/shop/$slug" params={{ slug: p.slug }} className="group flex gap-4 rounded-2xl border border-border bg-card p-4 hover:border-primary/50">
              <img src={p.image} alt={p.name} loading="lazy" className="h-24 w-24 rounded-xl object-cover" />
              <div className="flex flex-1 flex-col justify-center">
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.tagline}</p>
                <p className="mt-1 font-extrabold">{formatINR(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Perk({ icon: Icon, title, desc }: { icon: typeof Truck; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-5 w-5 text-primary" />
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}