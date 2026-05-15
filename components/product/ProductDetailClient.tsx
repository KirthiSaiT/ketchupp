"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Share2, Star, Minus, Plus, ChevronLeft, ZoomIn, Truck, RotateCcw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useFavourites } from "@/context/FavouritesContext";
import ShareModal from "@/components/products/ShareModal";
import ProductCard, { Product } from "@/components/products/ProductCard";
import { toast } from "sonner";
import { getRelatedProducts } from "@/lib/actions/product.action";

interface ProductDetailClientProps {
  product: Product;
}

const REVIEWS = [
  { name: "Arjun M.", rating: 5, title: "Absolute fire!", body: "Love the fit and quality. Wore it to an event and got compliments all night.", avatar: "https://i.pravatar.cc/60?img=12", date: "2 days ago" },
  { name: "Priya S.", rating: 5, title: "Worth every rupee", body: "Premium quality, ships super fast. The lining is gorgeous.", avatar: "https://i.pravatar.cc/60?img=44", date: "1 week ago" },
  { name: "Rahul K.", rating: 4, title: "Great jacket", body: "Runs slightly large so go a size down. Otherwise perfect.", avatar: "https://i.pravatar.cc/60?img=33", date: "2 weeks ago" },
];

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const { toggle, isFav } = useFavourites();
  const fav = isFav(product._id || product.id);

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [shareOpen, setShareOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    getRelatedProducts(product.category, product.slug).then(res => setRelated(res));
  }, [product.category, product.slug]);

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  function handleAddToCart() {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      toast.error("Please select a size to continue");
      return;
    }
    const selectedSizeData = product.sizes?.find(s => s.name === selectedSize);

    const success = addItem({
      id: product._id || product.id,
      name: product.name,
      price: product.price,
      image: product.image || (product.images?.[0] ?? ""),
      size: selectedSize || "One Size",
      color: product.colors?.[0] || "Standard",
      quantity,
      slug: product.slug,
      maxStock: selectedSizeData?.stock ?? 99,
    });

    if (success) {
      toast.success(`${product.name} added to your bag!`);
    }
  }

  const images = product.images || [product.image];

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-[#8B8580]">
          <Link href="/" className="hover:text-[#C1121F] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#C1121F] transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-[#C1121F] transition-colors capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* ─── Left: Image Gallery ─── */}
          <div className="space-y-3">
            <div
              className="relative aspect-square bg-[#EDE8E0] rounded-3xl overflow-hidden cursor-zoom-in group"
              onClick={() => setZoom(true)}
            >
                <Image
                  src={images[activeImg] || "/placeholder-product.png"}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  quality={90}
                />
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-[#FFD60A] text-[#1A1A1A] font-bold px-3 py-1">
                    {product.badge}
                  </Badge>
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2">
                <ZoomIn className="w-4 h-4 text-[#1A1A1A]" />
              </div>
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative flex-none w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImg === i ? "border-[#C1121F]" : "border-transparent"
                    }`}
                  >
                    <Image 
                      src={img} 
                      alt={`View ${i + 1}`} 
                      fill 
                      sizes="80px"
                      className="object-cover" 
                      quality={60}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── Right: Product Info ─── */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#C1121F] mb-2 capitalize">
                {product.category}
              </p>
              <h1
                className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < (product.rating || 5) ? "fill-[#FFD60A] text-[#FFD60A]" : "text-[#DDD8CE]"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-[#8B8580]">
                  {product.rating || 5} ({product.reviewCount || 0} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-black text-[#C1121F]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.comparePrice && product.comparePrice > product.price && (
                <>
                  <span className="text-lg text-[#8B8580] line-through">
                    ₹{product.comparePrice.toLocaleString("en-IN")}
                  </span>
                  <Badge className="bg-[#FFD60A] text-[#1A1A1A] font-bold">
                    {discount}% OFF
                  </Badge>
                </>
              )}
            </div>

            <Separator className="bg-[#DDD8CE]" />

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#8B8580]">
                    Size {selectedSize && `— ${selectedSize}`}
                  </p>
                  <button className="text-xs text-[#C1121F] font-semibold hover:underline">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => setSelectedSize(s.name)}
                      disabled={s.stock === 0}
                      className={`relative px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                        selectedSize === s.name
                          ? "bg-[#1A1A1A] text-[#FAF7F2] border-[#1A1A1A]"
                          : s.stock === 0
                          ? "opacity-40 cursor-not-allowed border-[#DDD8CE] text-[#8B8580]"
                          : "border-[#DDD8CE] text-[#1A1A1A] hover:border-[#1A1A1A]"
                      }`}
                    >
                      {s.name}
                      {s.stock > 0 && s.stock <= 3 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-[#FFD60A] text-[#1A1A1A] text-[8px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                          {s.stock}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#8B8580] mb-3">Quantity</p>
              <div className="inline-flex items-center border border-[#DDD8CE] rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 flex items-center justify-center hover:bg-[#EDE8E0] transition-colors"
                >
                  <Minus className="w-4 h-4 text-[#1A1A1A]" />
                </button>
                <span className="w-12 h-11 flex items-center justify-center text-sm font-bold text-[#1A1A1A]">
                  {quantity}
                </span>
                <button
                  onClick={() => {
                    const selectedSizeData = product.sizes?.find(s => s.name === selectedSize);
                    const stock = selectedSizeData?.stock ?? 99;
                    if (quantity < stock) {
                      setQuantity(quantity + 1);
                    }
                  }}
                  disabled={(() => {
                    const selectedSizeData = product.sizes?.find(s => s.name === selectedSize);
                    const stock = selectedSizeData?.stock ?? 99;
                    return quantity >= stock;
                  })()}
                  className="w-11 h-11 flex items-center justify-center hover:bg-[#EDE8E0] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4 text-[#1A1A1A]" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-[#C1121F] hover:bg-[#a01019] text-white rounded-xl py-6 font-bold text-base flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </Button>
              <button
                onClick={() => {
                  toggle({ id: product.id, name: product.name, price: product.price, image: images[0], slug: product.slug });
                  toast(fav ? "Removed from favourites" : "Added to favourites!");
                }}
                className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                  fav ? "border-[#C1121F] bg-[#C1121F]/5" : "border-[#DDD8CE] hover:border-[#C1121F]"
                }`}
                aria-label="Add to favourites"
              >
                <Heart className={`w-5 h-5 ${fav ? "fill-[#C1121F] text-[#C1121F]" : "text-[#8B8580]"}`} />
              </button>
              <button
                onClick={() => setShareOpen(true)}
                className="p-4 rounded-xl border-2 border-[#DDD8CE] hover:border-[#C1121F] transition-all"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5 text-[#8B8580]" />
              </button>
            </div>



            {/* Accordions */}
            <Accordion className="space-y-2">
              <AccordionItem value="desc" className="bg-white rounded-2xl border border-[#DDD8CE] px-5">
                <AccordionTrigger className="text-sm font-semibold text-[#1A1A1A] hover:no-underline py-4">Description</AccordionTrigger>
                <AccordionContent className="text-sm text-[#8B8580] pb-4 leading-relaxed whitespace-pre-line">
                  {product.description}
                </AccordionContent>
              </AccordionItem>
              {product.fabric && (
                 <AccordionItem value="fabric" className="bg-white rounded-2xl border border-[#DDD8CE] px-5">
                  <AccordionTrigger className="text-sm font-semibold text-[#1A1A1A] hover:no-underline py-4">Fabric & Care</AccordionTrigger>
                  <AccordionContent className="text-sm text-[#8B8580] pb-4 leading-relaxed whitespace-pre-line">
                    {product.fabric}
                    {product.care && `\n\nCare: ${product.care}`}
                  </AccordionContent>
                </AccordionItem>
              )}
              <AccordionItem value="shipping" className="bg-white rounded-2xl border border-[#DDD8CE] px-5">
                <AccordionTrigger className="text-sm font-semibold text-[#1A1A1A] hover:no-underline py-4">Shipping & Returns</AccordionTrigger>
                <AccordionContent className="text-sm text-[#8B8580] pb-4 leading-relaxed whitespace-pre-line">
                  Standard delivery in 3\u20135 working days. Express delivery available. Free shipping on orders above \u20b9999. Post office delivery supported across India.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="refund" className="bg-white rounded-2xl border border-[#DDD8CE] px-5">
                <AccordionTrigger className="text-sm font-semibold text-[#1A1A1A] hover:no-underline py-4">Refund Policy</AccordionTrigger>
                <AccordionContent className="text-sm text-[#8B8580] pb-4 leading-relaxed whitespace-pre-line">
                  Returns accepted within 7 days of delivery. Items must be unused and in original packaging. An unboxing video is mandatory for all refund claims.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* ─── Reviews ─── */}
        <section className="mt-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#C1121F] mb-2">Customer Reviews</p>
              <h2 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-playfair)" }}>
                What People Say
              </h2>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-4xl font-black text-[#1A1A1A]">{product.rating || 5}</p>
              <div className="flex gap-0.5 justify-end">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < (product.rating || 5) ? "fill-[#FFD60A] text-[#FFD60A]" : "text-[#DDD8CE]"}`} />
                ))}
              </div>
              <p className="text-xs text-[#8B8580]">{product.reviewCount || 0} reviews</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-[#DDD8CE]">
                <div className="flex items-center gap-3 mb-3">
                  <Image src={r.avatar} alt={r.name} width={40} height={40} className="rounded-full" />
                  <div>
                    <p className="text-sm font-bold text-[#1A1A1A]">{r.name}</p>
                    <p className="text-xs text-[#8B8580]">{r.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-[#FFD60A] text-[#FFD60A]" />
                  ))}
                </div>
                <p className="text-sm font-semibold text-[#1A1A1A] mb-1">{r.title}</p>
                <p className="text-sm text-[#8B8580] leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Related Products ─── */}
        {related.length > 0 && (
          <section className="mt-20">
            <p className="text-xs font-bold uppercase tracking-widest text-[#C1121F] mb-2">You May Also Like</p>
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
              Related Pieces
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        url={`${process.env.NEXT_PUBLIC_APP_URL}/products/${product.slug}`}
        title={product.name}
      />
    </div>
  );
}
