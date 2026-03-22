import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, Calendar } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const Navbar = () => {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-display text-2xl font-semibold tracking-tight text-foreground">
          Vastra
        </Link>

        <div className="hidden md:flex items-center gap-8 font-body text-sm tracking-wide">
          <Link to="/" className="text-foreground/70 hover:text-foreground transition-colors duration-200">Home</Link>
          <Link to="/shop" className="text-foreground/70 hover:text-foreground transition-colors duration-200">Shop</Link>
          <Link to="/appointments" className="text-foreground/70 hover:text-foreground transition-colors duration-200">Appointments</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative group">
            <ShoppingBag className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 py-4 flex flex-col gap-3 font-body text-sm">
          <Link to="/" onClick={() => setOpen(false)} className="py-2 text-foreground/70">Home</Link>
          <Link to="/shop" onClick={() => setOpen(false)} className="py-2 text-foreground/70">Shop</Link>
          <Link to="/appointments" onClick={() => setOpen(false)} className="py-2 text-foreground/70">Appointments</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
