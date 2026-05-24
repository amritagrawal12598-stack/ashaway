import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_app/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Ashaway" }, { name: "description", content: "Ashaway privacy policy." }] }),
  component: () => (
    <article className="prose prose-invert mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-5xl font-extrabold tracking-tight">Privacy Policy</h1>
      <p className="mt-4 text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>We collect only what we need to ship your order and run our business — your name, email, phone, and shipping address. We never sell your data.</p>
        <p>Payment is processed by Razorpay. We don't store your card details on our servers.</p>
        <p>You can request deletion of your account and order history at any time by emailing hello@ashaway.in.</p>
      </div>
    </article>
  ),
});