import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_app/terms")({
  head: () => ({ meta: [{ title: "Terms & Conditions — Ashaway" }] }),
  component: () => (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-5xl font-extrabold tracking-tight">Terms & Conditions</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>By using ashaway.in you agree to our terms. Products are intended for use by adults of legal smoking age.</p>
        <p>All sales are final once shipped, except in the case of defective products. See our returns and shipping policy for details.</p>
        <p>Ashaway is a registered trademark. All content on this site is © {new Date().getFullYear()} Ashaway.</p>
      </div>
    </article>
  ),
});