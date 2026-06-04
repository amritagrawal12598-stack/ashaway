import productSingle from "@/assets/product-single.jpg";
import productPack5 from "@/assets/product-pack5.jpg";
import productPack20 from "@/assets/product-pack20.jpg";
import productHero from "@/assets/product-hero.jpg";

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number; // INR
  compareAt?: number;
  packSize: number;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  badge?: string;
  stock: number;
  designs: string[];
}

export const products: Product[] = [
  {
    id: "p-single",
    slug: "single-pocket",
    name: "Ashaway Single",
    tagline: "One pocket ashtray. Endless freedom.",
    price: 99,
    compareAt: 149,
    packSize: 1,
    image: productSingle,
    gallery: [productSingle, productHero],
    description:
      "The original Ashaway disposable pocket ashtray. Odor-sealed, fire-safe lining, and slim enough to carry anywhere. Smoke freely. Leave nothing behind.",
    features: [
      "Odor-locking seal",
      "Fire-safe lining",
      "Pocket-friendly form",
      "Single-use, mess-free disposal",
    ],
    stock: 240,
    designs: ["Classic Black", "Ember Orange", "Stealth Grey"],
  },
  {
    id: "p-pack5",
    slug: "pack-of-5",
    name: "Travel Pack — 5",
    tagline: "A week of clean, anywhere.",
    price: 399,
    compareAt: 495,
    packSize: 5,
    image: productPack5,
    gallery: [productPack5, productHero, productSingle],
    description:
      "Five Ashaway pocket ashtrays packed for the road. Perfect for travel, camping, and city days out.",
    features: [
      "5 sealed ashtrays",
      "Save 20% vs single",
      "Compact travel sleeve",
      "Ideal for trips & events",
    ],
    badge: "Best Seller",
    stock: 120,
    designs: ["Classic Black", "Ember Orange", "Stealth Grey"],
  },
  {
    id: "p-pack20",
    slug: "bulk-box-20",
    name: "Bulk Box — 20",
    tagline: "Stock the car. Stock the bar.",
    price: 1399,
    compareAt: 1980,
    packSize: 20,
    image: productPack20,
    gallery: [productPack20, productHero, productPack5],
    description:
      "The bulk box for serious smokers, bars, hotels, and event organizers. Twenty Ashaway disposables, sealed and ready.",
    features: [
      "20 sealed ashtrays",
      "Save 30% vs single",
      "Retail-ready carton",
      "Hospitality & event grade",
    ],
    badge: "Best Value",
    stock: 60,
    designs: ["Classic Black", "Ember Orange", "Stealth Grey"],
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);