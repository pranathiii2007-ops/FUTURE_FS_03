import { useState } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import { useSearchParams } from "react-router-dom";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [sortBy, setSortBy] = useState("default");

  let filtered = selectedCategory === "All"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  if (sortBy === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="font-display text-3xl md:text-4xl font-light mb-2 section-reveal">Our Collection</h1>
        <p className="text-sm text-muted-foreground mb-8 section-reveal stagger-1">Handpicked pieces for every occasion</p>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 section-reveal stagger-2">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-sm rounded-sm border transition-colors active:scale-[0.97] ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-foreground/70 hover:border-foreground/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm bg-background border border-border rounded-sm px-3 py-1.5 text-foreground/70"
          >
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
          {filtered.map((p, i) => (
            <div key={p.id} className="section-reveal" style={{ animationDelay: `${i * 0.08}s` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20 font-body">No products in this category yet.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
