import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Coffee, Hotel, Tent, Beer, Plane, Trophy } from "lucide-react";

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
      <h1 className="mt-2 text-5xl font-extrabold tracking-tight md:text-6xl">A smoke shouldn't leave a trace.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        Ashaway started with one question — why is it still 2003 when it comes to portable
        ashtrays? We built a disposable that's actually pocketable, actually sealed, and
        actually designed.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <Block title="The product">
          A small, sealed pouch with a fire-safe lining. Drop your ash, snap it shut, throw it
          away. No smell, no embers, no mess.
        </Block>
        <Block title="The mission">
          To make a premium, biodegradable ashtray — high-quality, responsibly designed, and
          easy to dispose. We want smokers to feel respected while keeping public spaces clean.
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

      <div className="mt-20">
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="rounded-2xl border border-border bg-card px-6 border-b-0 data-[state=open]:bg-card">
            <AccordionTrigger className="hover:no-underline py-6">
              <div className="flex w-full items-center">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  01
                </span>
                <span className="text-xl font-bold flex-1 text-center pr-10">What Is a Disposable Paper Ashtray?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              <div className="space-y-4 pb-4 px-2">
                <p>
                  A disposable paper ashtray is a single-use smoking accessory made from layers of compressed or coated paperboard. It's designed to safely collect cigarette ash and butts, then be discarded — without the need to clean, carry, or store a traditional ceramic or metal ashtray.
                </p>
                <p>
                  Unlike conventional ashtrays, disposable versions are engineered to be fire-resistant at the base while remaining lightweight enough to slip into a pocket or bag. The inner lining is typically treated with a heat-resistant coating or moisture barrier that prevents ash from burning through and keeps odor contained.
                </p>
                <div>
                  <p className="font-bold text-foreground mb-4 mt-8">Key characteristics:</p>
                  <ul className="space-y-3">
                    <li className="flex gap-3 items-start">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      <span>Made from recycled or biodegradable paperboard</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      <span>Heat-resistant inner coating to prevent burn-through</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      <span>Compact, flat-pack or pre-formed shape for portability</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      <span>Single-use by design — dispose after the session ends</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      <span>Often self-sealing or closeable to lock in odor when done</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="rounded-2xl border border-border bg-card px-6 border-b-0 data-[state=open]:bg-card">
            <AccordionTrigger className="hover:no-underline py-6">
              <div className="flex w-full items-center">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  02
                </span>
                <span className="text-xl font-bold flex-1 text-center pr-10">Why Are Disposable Paper Ashtrays Widely Used?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              <div className="space-y-4 pb-4 px-2">
                <p>
                  Disposable paper ashtrays have grown in popularity for a combination of practical, environmental, and regulatory reasons. They address a real gap — smokers frequently find themselves in situations where there's no proper ashtray available, leading to littered butts and ash dropped carelessly on the ground.
                </p>
                <p>
                  The environmental angle is significant: cigarette butts are among the most littered items globally, and they contain microplastics and toxic chemicals that leach into soil and water. A disposable paper ashtray that can be responsibly discarded — or composted if biodegradable — offers a cleaner alternative to leaving butts behind.
                </p>
                <div>
                  <p className="font-bold text-foreground mb-4 mt-8">Reasons behind widespread adoption:</p>
                  <ul className="space-y-4">
                    <li className="flex gap-3 items-start">
                      <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full border border-primary/50" />
                      <div><strong className="text-foreground font-semibold">Anti-litter compliance</strong> — many cities and venues require designated receptacles; a pocket ashtray satisfies this without infrastructure cost</div>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full border border-primary/50" />
                      <div><strong className="text-foreground font-semibold">Hygiene and odor control</strong> — sealed designs prevent ash from scattering and contain the smell in social settings</div>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full border border-primary/50" />
                      <div><strong className="text-foreground font-semibold">Low cost at scale</strong> — paper materials keep unit cost low enough for venues to offer them free or bundled</div>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full border border-primary/50" />
                      <div><strong className="text-foreground font-semibold">No maintenance</strong> — staff don't need to empty, clean, or replace traditional ashtrays — just swap in a new unit</div>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full border border-primary/50" />
                      <div><strong className="text-foreground font-semibold">Eco-friendly credentials</strong> — biodegradable options appeal to venues and consumers increasingly conscious of their environmental footprint</div>
                    </li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="rounded-2xl border border-border bg-card px-6 border-b-0 data-[state=open]:bg-card">
            <AccordionTrigger className="hover:no-underline py-6">
              <div className="flex w-full items-center">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  03
                </span>
                <span className="text-xl font-bold flex-1 text-center pr-10">Typical Use Cases in Horeca and Public Spaces</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              <div className="space-y-6 pb-4 px-2">
                <p>
                  The Horeca sector — Hotels, Restaurants, and Cafés — is one of the biggest adopters of disposable paper ashtrays. Terrace seating, outdoor bars, and rooftop venues face constant pressure to keep shared spaces clean without burdening staff with frequent cleanup rounds.
                </p>
                <p>
                  Beyond Horeca, disposable ashtrays are increasingly standard in a range of public and semi-public settings where smoking occurs but permanent infrastructure isn't practical.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="rounded-xl border border-border/60 bg-background/50 p-5 hover:bg-background/80 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-primary/80">
                        <Coffee className="h-4 w-4" />
                      </div>
                      <h3 className="font-semibold text-foreground">Restaurants & Café Terraces</h3>
                    </div>
                    <p className="text-sm">Placed on outdoor tables to replace heavy ceramic ashtrays that require constant washing. Keeps the terrace looking clean between covers.</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-background/50 p-5 hover:bg-background/80 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-primary/80">
                        <Hotel className="h-4 w-4" />
                      </div>
                      <h3 className="font-semibold text-foreground">Hotels & Resorts</h3>
                    </div>
                    <p className="text-sm">Provided in smoking-permitted outdoor zones, balconies, and poolside areas — reducing housekeeping effort and maintaining a premium guest experience.</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-background/50 p-5 hover:bg-background/80 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-primary/80">
                        <Tent className="h-4 w-4" />
                      </div>
                      <h3 className="font-semibold text-foreground">Festivals & Outdoor Events</h3>
                    </div>
                    <p className="text-sm">Handed out at entrances to prevent ground litter across large, uncontrolled spaces where placing permanent ashtrays isn't feasible.</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-background/50 p-5 hover:bg-background/80 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-primary/80">
                        <Beer className="h-4 w-4" />
                      </div>
                      <h3 className="font-semibold text-foreground">Bars & Nightlife Venues</h3>
                    </div>
                    <p className="text-sm">Distributed at smoking areas outside clubs and pubs, often branded with the venue's logo as a low-cost marketing and cleanliness tool.</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-background/50 p-5 hover:bg-background/80 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-primary/80">
                        <Plane className="h-4 w-4" />
                      </div>
                      <h3 className="font-semibold text-foreground">Transit Hubs</h3>
                    </div>
                    <p className="text-sm">Airports, train stations, and ferry terminals use them in designated outdoor smoking zones to minimize cleanup and reduce fire risk.</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-background/50 p-5 hover:bg-background/80 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-primary/80">
                        <Trophy className="h-4 w-4" />
                      </div>
                      <h3 className="font-semibold text-foreground">Sports Stadiums & Arenas</h3>
                    </div>
                    <p className="text-sm">Provided in smoking lounges or perimeter areas where thousands of attendees would otherwise litter during breaks between play.</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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