import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";
import { ShoppingBag, ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <p className="text-muted-foreground">Product not found.</p>
          <Link to="/shop" className="text-accent underline mt-4 inline-block">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-8 md:gap-14 section-reveal">
          <div className="aspect-[3/4] overflow-hidden rounded-sm bg-muted">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-1">{product.category}</p>
            <h1 className="font-display text-3xl md:text-4xl font-light text-foreground leading-tight">{product.name}</h1>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xl font-semibold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
              )}
              {product.originalPrice && (
                <span className="text-xs bg-accent/15 text-accent px-2 py-0.5 rounded-sm font-medium">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground mt-6 leading-relaxed max-w-md">{product.description}</p>

            {product.sizes && product.sizes.length > 1 && (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Size</p>
                <div className="flex gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 text-sm border rounded-sm transition-colors active:scale-[0.97] ${
                        selectedSize === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground/70"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => addItem(product, selectedSize)}
              className="mt-8 inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-3 text-sm font-medium tracking-wide hover:bg-accent/90 transition-colors active:scale-[0.97] rounded-sm w-full md:w-auto"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Bag
            </button>

            <div className="mt-6 text-xs text-muted-foreground space-y-1">
              <p>✓ Free shipping on orders above ₹1,999</p>
              <p>✓ Easy 7-day returns</p>
              <p>✓ Use code WELCOME10 for 10% off</p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-light mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
