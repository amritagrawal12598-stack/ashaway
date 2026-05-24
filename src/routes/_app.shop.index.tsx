import { createFileRoute, Link } from "@tanstack/react-router";
import { products, formatINR } from "@/lib/products";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/_app/shop/")({
  head: () => ({
    meta: [
      { title: "Shop — Ashaway disposable pocket ashtrays" },
      { name: "description", content: "Browse Ashaway disposable pocket ashtrays. Single, travel pack, and bulk box." },
      { property: "og:title", content: "Shop — Ashaway" },
      { property: "og:description", content: "Premium disposable pocket ashtrays." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const add = useCart((s) => s.add);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Shop</p>
        <h1 className="mt-2 text-5xl font-extrabold tracking-tight md:text-6xl">The full lineup.</h1>
        <p className="mt-3 text-muted-foreground">Same product. Three sizes. Built for solo smokers, travelers, and bulk buyers.</p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <article key={p.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-[var(--shadow-ember)]">
            <Link to="/shop/$slug" params={{ slug: p.slug }} className="relative block aspect-square overflow-hidden bg-background">
              <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" width={800} height={800} />
              {p.badge && (
                <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground">
                  {p.badge}
                </span>
              )}
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-lg font-bold">{p.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold">{formatINR(p.price)}</span>
                {p.compareAt && (
                  <span className="text-sm text-muted-foreground line-through">{formatINR(p.compareAt)}</span>
                )}
              </div>
              <div className="mt-5 flex gap-2">
                <Link to="/shop/$slug" params={{ slug: p.slug }} className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-center text-sm font-semibold hover:bg-secondary">
                  Details
                </Link>
                <button
                  onClick={() => add(p.id)}
                  className="flex-1 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90"
                >
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}