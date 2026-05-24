import { createFileRoute } from "@tanstack/react-router";
import productHero from "@/assets/product-hero.jpg";

export const Route = createFileRoute("/_app/about")({
  head: () => ({
    meta: [
      { title: "About — Ashaway" },
      { name: "description", content: "Ashaway is built for smokers who care about the spaces they pass through." },
      { property: "og:title", content: "About — Ashaway" },
      { property: "og:description", content: "Smoke freely. Leave nothing behind." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <p className="text-xs font-bold uppercase tracking-widest text-primary">About</p>
      <h1 className="mt-2 text-5xl font-extrabold tracking-tight md:text-6xl">A smoke shouldn't leave a trace.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        Ashaway started with one question — why is it still 2003 when it comes to portable
        ashtrays? We built a disposable that's actually pocketable, actually sealed, and
        actually designed.
      </p>

      <div className="mt-12 overflow-hidden rounded-3xl border border-border">
        <img src={productHero} alt="Ashaway product" loading="lazy" className="w-full" width={1536} height={1024} />
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <Block title="The product">
          A small, sealed pouch with a fire-safe lining. Drop your ash, snap it shut, throw it
          away. No smell, no embers, no mess.
        </Block>
        <Block title="The mission">
          We want smokers to feel respected — and we want non-smokers to stop finding butts on
          their stairs. Both can be true.
        </Block>
        <Block title="The materials">
          Heat-resistant inner foil, recyclable paperboard outer, soy-based ink. We're not
          claiming carbon-negative — we're claiming better than what's out there.
        </Block>
        <Block title="The future">
          More sizes, custom packs for events and hotels, and a refill program for heavy users.
          Coming soon.
        </Block>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}