import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().trim().min(2, "Required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "At least 10 characters").max(1000),
});
type Values = z.infer<typeof schema>;

export const Route = createFileRoute("/_app/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ashaway" },
      { name: "description", content: "Get in touch with the Ashaway team. Wholesale, partnerships, and support." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = (_data: Values) => {
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-xs font-bold uppercase tracking-widest text-primary">Contact</p>
      <h1 className="mt-2 text-5xl font-extrabold tracking-tight md:text-6xl">Let's talk.</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Wholesale, hospitality, support, or just feedback — drop us a line.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr,1fr]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</label>
            <input {...register("name")} className={input} />
            {formState.errors.name && <p className="mt-1 text-xs text-destructive">{formState.errors.name.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
            <input type="email" {...register("email")} className={input} />
            {formState.errors.email && <p className="mt-1 text-xs text-destructive">{formState.errors.email.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
            <textarea rows={5} {...register("message")} className={input} />
            {formState.errors.message && <p className="mt-1 text-xs text-destructive">{formState.errors.message.message}</p>}
          </div>
          <button type="submit" className="w-full rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:opacity-90">
            Send message
          </button>
          {sent && <p className="text-center text-sm text-primary">Thanks — we'll get back within 1 business day.</p>}
        </form>

        <div className="space-y-4">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ashaway3001@gmail.com" target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
            <Info icon={Mail} title="Email" value="ashaway3001@gmail.com" />
          </a>
          <Info icon={Phone} title="Phone" value="+91 80 4567 8900" />
          <Info icon={MapPin} title="Office" value="Indiranagar, Bengaluru, India" />
        </div>
      </div>
    </div>
  );
}

const input =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30";

function Info({ icon: Icon, title, value }: { icon: typeof Mail; title: string; value: string }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="rounded-xl bg-primary/15 p-3 text-primary"><Icon className="h-5 w-5" /></div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
        <p className="mt-1 font-semibold">{value}</p>
      </div>
    </div>
  );
}