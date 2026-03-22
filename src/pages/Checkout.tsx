import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Checkout = () => {
  const { items, totalPrice, discount, clearCart } = useCart();
  const navigate = useNavigate();
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const shipping = subtotal >= 1999 ? 0 : 99;

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    address: "", city: "", state: "", pincode: "",
    paymentMethod: "card",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = "VAS-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    clearCart();
    navigate(`/order-confirmation/${orderId}`);
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>

        <h1 className="font-display text-3xl font-light mb-8 section-reveal">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6 section-reveal stagger-1">
            {/* Contact */}
            <fieldset className="bg-card border border-border rounded-sm p-6">
              <legend className="font-display text-lg font-medium px-1">Contact Details</legend>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Full Name" className="input-field" />
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email" className="input-field" />
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="Phone Number" className="input-field md:col-span-2" />
              </div>
            </fieldset>

            {/* Shipping Address */}
            <fieldset className="bg-card border border-border rounded-sm p-6">
              <legend className="font-display text-lg font-medium px-1">Shipping Address</legend>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <input name="address" value={form.address} onChange={handleChange} required placeholder="Street Address" className="input-field md:col-span-2" />
                <input name="city" value={form.city} onChange={handleChange} required placeholder="City" className="input-field" />
                <input name="state" value={form.state} onChange={handleChange} required placeholder="State" className="input-field" />
                <input name="pincode" value={form.pincode} onChange={handleChange} required placeholder="PIN Code" className="input-field" />
              </div>
            </fieldset>

            {/* Payment */}
            <fieldset className="bg-card border border-border rounded-sm p-6">
              <legend className="font-display text-lg font-medium px-1">Payment Method</legend>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {[
                  { value: "card", label: "Card" },
                  { value: "upi", label: "UPI" },
                  { value: "netbanking", label: "Net Banking" },
                  { value: "cod", label: "Cash on Delivery" },
                ].map((m) => (
                  <label key={m.value} className={`flex items-center justify-center text-sm px-4 py-3 border rounded-sm cursor-pointer transition-colors ${
                    form.paymentMethod === m.value ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground/70 hover:border-foreground/30"
                  }`}>
                    <input type="radio" name="paymentMethod" value={m.value} checked={form.paymentMethod === m.value} onChange={handleChange} className="sr-only" />
                    {m.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          {/* Order Summary Sidebar */}
          <div className="section-reveal stagger-2">
            <div className="bg-card border border-border rounded-sm p-6 sticky top-24">
              <h2 className="font-display text-xl font-medium mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-foreground/80 truncate max-w-[60%]">{item.product.name} × {item.quantity}</span>
                    <span>₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
                {discount > 0 && (
                  <div className="flex justify-between text-success"><span>Discount ({discount}%)</span><span>-₹{Math.round(subtotal * discount / 100).toLocaleString("en-IN")}</span></div>
                )}
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
              </div>
              <div className="border-t border-border mt-3 pt-3 flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>₹{Math.round(totalPrice + shipping).toLocaleString("en-IN")}</span>
              </div>
              <button type="submit" className="mt-4 w-full bg-accent text-accent-foreground px-6 py-3 text-sm font-medium rounded-sm hover:bg-accent/90 transition-colors active:scale-[0.97]">
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        .input-field {
          width: 100%;
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          border: 1px solid hsl(var(--border));
          border-radius: var(--radius);
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          outline: none;
          transition: border-color 0.15s;
        }
        .input-field:focus {
          border-color: hsl(var(--ring));
          box-shadow: 0 0 0 1px hsl(var(--ring) / 0.3);
        }
        .input-field::placeholder {
          color: hsl(var(--muted-foreground));
        }
      `}</style>
    </div>
  );
};

export default Checkout;
