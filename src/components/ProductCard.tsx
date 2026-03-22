import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  return (
    <div className="group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {product.tag && (
            <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[11px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-sm">
              {product.tag}
            </span>
          )}
        </div>
      </Link>

      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{product.category}</p>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-display text-lg font-medium leading-tight text-foreground">{product.name}</h3>
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-body text-sm font-semibold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && (
              <span className="font-body text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
            )}
          </div>
        </div>
        <button
          onClick={() => addItem(product, product.sizes?.[0], product.colors?.[0])}
          className="mt-1 p-2 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors active:scale-95"
          aria-label={`Add ${product.name} to bag`}
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
