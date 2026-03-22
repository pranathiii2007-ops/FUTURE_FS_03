import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

const OrderConfirmation = () => {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 max-w-lg text-center section-reveal">
        <div className="bg-card border border-border rounded-sm p-10">
          <CheckCircle className="w-14 h-14 text-success mx-auto mb-4" />
          <h1 className="font-display text-3xl font-light mb-2">Order Confirmed</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Thank you for shopping with Vastra! Your order has been placed successfully.
          </p>

          <div className="bg-muted rounded-sm p-4 mb-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Order ID</p>
            <p className="font-mono text-lg font-semibold text-foreground">{orderId}</p>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/50 rounded-sm p-4 mb-6">
            <Package className="w-5 h-5 text-accent flex-shrink-0" />
            <p className="text-left">You will receive an email with tracking details once your order is shipped. Estimated delivery: 5–7 business days.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/shop" className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 text-sm font-medium rounded-sm hover:bg-accent/90 transition-colors active:scale-[0.97]">
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
