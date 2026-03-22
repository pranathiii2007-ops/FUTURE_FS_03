import heroImg from "@/assets/hero-boutique.jpg";
import { Link } from "react-router-dom";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import { ArrowRight, Calendar, MapPin, Phone } from "lucide-react";

const Index = () => {
  const featured = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[85vh] min-h-[520px] flex items-end overflow-hidden">
        <img src={heroImg} alt="Vastra Boutique" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 pb-16 md:pb-24 section-reveal">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-cream/80 mb-3">Curated Indian Fashion</p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-cream leading-[0.95] max-w-2xl">
            Elegance in Every Thread
          </h1>
          <p className="font-body text-sm md:text-base text-cream/70 mt-4 max-w-md leading-relaxed">
            Handpicked ethnic wear, jewellery and accessories for every occasion. From everyday grace to bridal grandeur.
          </p>
          <div className="flex gap-3 mt-8">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 text-sm font-medium tracking-wide hover:bg-accent/90 transition-colors active:scale-[0.97] rounded-sm"
            >
              Shop Collection <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/appointments"
              className="inline-flex items-center gap-2 border border-cream/40 text-cream px-6 py-3 text-sm font-medium tracking-wide hover:bg-cream/10 transition-colors active:scale-[0.97] rounded-sm"
            >
              <Calendar className="w-4 h-4" /> Book Styling
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="flex items-end justify-between mb-10 section-reveal">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-1">Curated for you</p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-foreground">Featured Pieces</h2>
          </div>
          <Link to="/shop" className="text-sm text-accent hover:underline underline-offset-4 font-medium flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
          {featured.map((p, i) => (
            <div key={p.id} className="section-reveal" style={{ animationDelay: `${i * 0.1}s` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Categories Strip */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="container mx-auto px-4 section-reveal">
          <h2 className="font-display text-3xl md:text-4xl font-light text-center mb-10">Shop by Category</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.filter(c => c !== "All").map((cat) => (
              <Link
                key={cat}
                to={`/shop?category=${cat}`}
                className="px-6 py-2.5 border border-border rounded-sm text-sm font-body text-foreground/80 hover:bg-primary hover:text-primary-foreground transition-colors duration-200 active:scale-[0.97]"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="container mx-auto px-4 py-20 md:py-28 section-reveal">
        <div className="bg-primary text-primary-foreground rounded-sm p-8 md:p-14 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60 mb-2">Personal Styling</p>
            <h2 className="font-display text-3xl md:text-4xl font-light leading-tight">Book a Consultation</h2>
            <p className="font-body text-sm text-primary-foreground/70 mt-3 max-w-md leading-relaxed">
              Visit our boutique for a personalised styling session. Our expert stylists will help you find the perfect outfit for any occasion.
            </p>
            <Link
              to="/appointments"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 text-sm font-medium mt-6 hover:bg-accent/90 transition-colors active:scale-[0.97] rounded-sm"
            >
              <Calendar className="w-4 h-4" /> Book Appointment
            </Link>
          </div>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/70 font-body">
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /> Vishakapatam, Andhra Pradesh</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent" /> +91 00000 00000</div>
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" /> Mon – Sat, 10 AM – 8 PM</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground font-body">
          <span className="font-display text-lg text-foreground">Vastra</span>
          <p>© 2026 Vastra Boutique. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <Link to="/appointments" className="hover:text-foreground transition-colors">Appointments</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
