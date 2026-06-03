import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { products, formatINR, getProduct } from "@/lib/products";
import productHero from "@/assets/product-hero.jpg";

export const Route = createFileRoute("/_app/shop/category/$packSize")({
  loader: ({ params }) => {
    const packSize = Number(params.packSize);
    const product = products.find((p) => p.packSize === packSize);
    if (!product) throw notFound();
    return { packSize, product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `Designs — ${loaderData.product.name}` }] : [{ title: "Designs" }],
  }),
  component: DesignsPage,
});

function DesignsPage() {
  const { packSize, product } = Route.useLoaderData();

  // Mock designs — replace with real assets as needed
  const designs = [
    { id: "d-plain", name: "Classic Plain", image: product.gallery[0] ?? productHero },
    { id: "d-floral", name: "Floral Print", image: product.gallery[1] ?? productHero },
    { id: "d-geo", name: "Geometric", image: product.gallery[2] ?? productHero },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-16">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Designs</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">Choose a design — {product.name}</h1>
        <p className="mt-3 text-muted-foreground">Select the print you want for this pack size. We'll take you to the product page to complete the purchase.</p>
      </header>

      <div className="mt-6 mb-6">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to categories
        </Link>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {designs.map((d) => (
          <article key={d.id} className="group overflow-hidden rounded-2xl border border-border bg-card">
            <Link to="/shop/$slug" params={{ slug: product.slug }} className="relative block aspect-square overflow-hidden bg-background">
              <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" width={800} height={800} />
            </Link>
            <div className="flex flex-1 flex-col p-5 text-center">
              <h3 className="text-lg font-bold">{d.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{formatINR(product.price)}</p>
              <div className="mt-4">
                <Link to="/shop/$slug" params={{ slug: product.slug }} className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-secondary">Select</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Route;
