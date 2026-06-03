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

  // Build categories from available pack sizes
  const categories = [
    { id: "1", title: "Single", subtitle: "One ashtray", packSize: 1 },
    { id: "5", title: "Travel Pack", subtitle: "Pack of 5", packSize: 5 },
    { id: "20", title: "Bulk Box", subtitle: "Box of 20", packSize: 20 },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-16">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Shop</p>
        <h1 className="mt-2 text-5xl font-extrabold tracking-tight md:text-6xl">Choose a category</h1>
        <p className="mt-3 text-muted-foreground">Select a pack size to view available designs for that product.</p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <article key={c.id} className="group overflow-hidden rounded-2xl border border-border bg-card p-6 text-center">
            <h3 className="text-lg font-bold">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.subtitle}</p>
            <div className="mt-6">
              <Link to="/shop/category/$packSize" params={{ packSize: c.packSize.toString() }} className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-secondary">
                View designs
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}