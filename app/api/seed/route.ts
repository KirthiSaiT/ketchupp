import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Product } from '@/lib/models/Product';

const SEED_PRODUCTS = [
  {
    name: "Onyx Bomber Jacket",
    slug: "onyx-bomber-jacket",
    description: "The classic bomber redefined. Crafted with high-grade nylon and a relaxed fit, perfect for transitional weather and layering.",
    price: 3499,
    comparePrice: 4299,
    category: "jackets",
    images: [
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80"
    ],
    colors: ["Black", "Olive"],
    sizes: [
      { name: "S", stock: 10 },
      { name: "M", stock: 15 },
      { name: "L", stock: 5 },
      { name: "XL", stock: 0 }
    ],
    fabric: "100% Water-resistant Nylon outer, Satin inner lining.",
    care: "Dry clean only. Do not tumble dry.",
    isBestseller: true,
    isNewProduct: false,
    isFeatured: true,
    tags: ["outerwear", "winter", "streetwear"],
    rating: 4.8,
    reviewCount: 124
  },
  {
    name: "Crimson Oversized Tee",
    slug: "crimson-oversized-tee",
    description: "A drop-shoulder staple with a weighty, premium feel. Heavyweight cotton provides structure while remaining breathable.",
    price: 1299,
    category: "tops",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
    ],
    colors: ["Crimson Red", "White", "Black"],
    sizes: [
      { name: "S", stock: 50 },
      { name: "M", stock: 35 },
      { name: "L", stock: 20 },
      { name: "XL", stock: 10 }
    ],
    fabric: "100% Heavyweight Cotton (240 GSM).",
    care: "Machine wash cold inside out. Line dry.",
    isBestseller: false,
    isNewProduct: true,
    isFeatured: true,
    tags: ["essentials", "oversized", "basics"],
    rating: 4.5,
    reviewCount: 42
  },
  {
    name: "Urban Cargo Pants",
    slug: "urban-cargo-pants",
    description: "Utility meets modern styling. Feature-rich cargo pockets with a straight-leg drape and adjustable ankle toggles.",
    price: 2199,
    category: "bottoms",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80"
    ],
    colors: ["Charcoal", "Khaki"],
    sizes: [
      { name: "28", stock: 5 },
      { name: "30", stock: 15 },
      { name: "32", stock: 25 },
      { name: "34", stock: 10 }
    ],
    fabric: "98% Cotton, 2% Elastane twill for slight stretch.",
    care: "Machine wash cold. Tumble dry low.",
    isBestseller: true,
    isNewProduct: false,
    isFeatured: false,
    tags: ["utility", "streetwear", "bottoms"],
    rating: 4.9,
    reviewCount: 201
  },
  {
    name: "Court Low Sneakers",
    slug: "court-low-sneakers",
    description: "The everyday silhouette. Vintage court aesthetics updated with modern cushioning and premium leather uppers.",
    price: 4499,
    category: "shoes",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    colors: ["White/Red"],
    sizes: [
      { name: "UK 7", stock: 20 },
      { name: "UK 8", stock: 20 },
      { name: "UK 9", stock: 15 },
      { name: "UK 10", stock: 5 }
    ],
    fabric: "Premium Leather upper, Rubber outsole.",
    care: "Wipe clean with a damp cloth.",
    isBestseller: true,
    isNewProduct: false,
    isFeatured: false,
    tags: ["footwear", "sneakers"],
    rating: 4.7,
    reviewCount: 89
  },
  {
    name: "Vault Leather Cap",
    slug: "vault-leather-cap",
    description: "A premium take on the classic dad cap. Structured 6-panel design with an adjustable strap.",
    price: 899,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80"
    ],
    colors: ["Black"],
    sizes: [
      { name: "One Size", stock: 40 }
    ],
    fabric: "100% Polyurethane leather.",
    care: "Spot clean only.",
    isBestseller: false,
    isNewProduct: false,
    isFeatured: false,
    tags: ["headwear", "accessories"],
    rating: 4.2,
    reviewCount: 15
  },
  {
    name: "Phantom Hoodie",
    slug: "phantom-hoodie",
    description: "The ultimate layering piece. Ultra-soft brushed fleece interior with a minimal, unbranded exterior.",
    price: 2899,
    comparePrice: 3299,
    category: "tops",
    images: [
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&q=80"
    ],
    colors: ["Black", "Heather Grey"],
    sizes: [
      { name: "S", stock: 12 },
      { name: "M", stock: 20 },
      { name: "L", stock: 15 },
      { name: "XL", stock: 8 }
    ],
    fabric: "80% Cotton, 20% Polyester fleece.",
    care: "Machine wash cold. Tumble dry on low.",
    isBestseller: true,
    isNewProduct: true,
    isFeatured: true,
    tags: ["essentials", "layering", "fleece"],
    rating: 4.9,
    reviewCount: 340
  }
];

export async function GET() {
  try {
    await connectDB();
    
    // Clear existing products to avoid duplicates during multiple seed runs
    await Product.deleteMany({});
    
    // Insert new seeded products
    const result = await Product.insertMany(SEED_PRODUCTS);
    
    return NextResponse.json({ 
      message: 'Database seeded successfully', 
      count: result.length,
      products: result 
    }, { status: 200 });

  } catch (error: any) {
    console.error("Seeding Error:", error);
    return NextResponse.json({ 
      message: 'Failed to seed database', 
      error: error.message 
    }, { status: 500 });
  }
}
