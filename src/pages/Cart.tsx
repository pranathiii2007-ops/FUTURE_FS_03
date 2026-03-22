import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice, promoCode, setPromoCode, discount, applyPromo } = useCart();

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16 text-center section-reveal">
          <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-display text-3xl font-light mb-2">Your Bag is Empty</h1>
          <p className="text-sm text-muted-foreground mb-6">Explore our collection and add something beautiful.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 text-sm font-medium rounded-sm hover:bg-accent/90 transition-colors active:scale-[0.97]">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="font-display text-3xl font-light mb-8 section-reveal">Shopping Bag</h1>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4 section-reveal stagger-1">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-4 p-4 bg-card rounded-sm border border-border">
                <img src={item.product.image} alt={item.product.name} className="w-20 h-28 object-cover rounded-sm" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-medium truncate">{item.product.name}</h3>
                  <p className="text-xs text-muted-foreground">{item.size && `Size: ${item.size}`}</p>
                  <p className="text-sm font-semibold mt-1">₹{item.product.price.toLocaleString("en-IN")}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center border border-border rounded-sm hover:bg-muted active:scale-95">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm w-6 text-center tabular-nums">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center border border-border rounded-sm hover:bg-muted active:scale-95">
                      <Plus className="w-3 h-3" />
                    </button>
                    <button onClick={() => removeItem(item.product.id)} className="ml-auto p-1 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="section-reveal stagger-2">
            <div className="bg-card border border-border rounded-sm p-6 sticky top-24">
              <h2 className="font-display text-xl font-medium mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
                {discount > 0 && (
                  <div className="flex justify-between text-success"><span>Discount ({discount}%)</span><span>-₹{((subtotal * discount) / 100).toLocaleString("en-IN")}</span></div>
                )}
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{subtotal >= 1999 ? "Free" : "₹99"}</span></div>
              </div>

              <div className="flex gap-2 mt-4">
                <input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  className="flex-1 text-sm px-3 py-2 border border-border rounded-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <button onClick={applyPromo} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors active:scale-[0.97]">
                  Apply
                </button>
              </div>

              <div className="border-t border-border mt-4 pt-4 flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>₹{Math.round(totalPrice + (subtotal >= 1999 ? 0 : 99)).toLocaleString("en-IN")}</span>
              </div>

              <Link
                to="/checkout"
                className="mt-4 block text-center bg-accent text-accent-foreground px-6 py-3 text-sm font-medium rounded-sm hover:bg-accent/90 transition-colors active:scale-[0.97]"
              >
                Proceed to Checkout
              </Link>
              <p className="text-[11px] text-muted-foreground mt-3 text-center">Try codes: WELCOME10, FESTIVE20, FIRST15</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
