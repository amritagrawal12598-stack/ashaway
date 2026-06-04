import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { cartTotals, useCart } from "@/lib/cart-store";
import { formatINR } from "@/lib/products";

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const { resolved, subtotal, shipping, tax, total } = cartTotals(lines);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-2xl transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-bold">Your cart</h2>
          <button onClick={close} className="rounded-full p-2 hover:bg-secondary" aria-label="Close cart">
            <X className="h-4 w-4" />
          </button>
        </div>

        {resolved.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="rounded-full bg-secondary p-4">
              <ShoppingBag className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            <Link
              to="/shop"
              onClick={close}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Shop products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {resolved.map((l) => (
                  <li key={`${l.productId}-${l.design}`} className="flex gap-3 rounded-xl border border-border bg-card p-3">
                    <img src={l.product.image} alt={l.product.name} className="h-20 w-20 rounded-lg object-cover" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold leading-tight">{l.product.name}</p>
                        <button onClick={() => remove(l.productId, l.design)} aria-label="Remove" className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 mb-0.5">Design: {l.design}</p>
                      <p className="text-xs text-muted-foreground">{formatINR(l.product.price)} each</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-border">
                          <button onClick={() => setQty(l.productId, l.design, l.qty - 1)} className="px-2 py-1 text-muted-foreground hover:text-foreground" aria-label="Decrease">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center text-sm font-semibold">{l.qty}</span>
                          <button onClick={() => setQty(l.productId, l.design, l.qty + 1)} className="px-2 py-1 text-muted-foreground hover:text-foreground" aria-label="Increase">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-sm font-bold">{formatINR(l.subtotal)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-border bg-card/40 px-5 py-4">
              <dl className="space-y-1.5 text-sm">
                <Row label="Subtotal" value={formatINR(subtotal)} />
                <Row label="Shipping" value={shipping === 0 ? "Free" : formatINR(shipping)} />
                <Row label="GST (18%)" value={formatINR(tax)} />
              </dl>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="text-base font-bold">Total</span>
                <span className="text-base font-bold">{formatINR(total)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={close}
                className="mt-4 flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-ember)] hover:opacity-90"
              >
                Checkout
              </Link>
              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                Free shipping on orders over ₹499
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}