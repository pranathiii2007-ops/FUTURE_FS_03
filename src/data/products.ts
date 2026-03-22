import silkSaree from "@/assets/product-silk-saree.jpg";
import anarkali from "@/assets/product-anarkali.jpg";
import lehenga from "@/assets/product-lehenga.jpg";
import kurti from "@/assets/product-kurti.jpg";
import palazzo from "@/assets/product-palazzo.jpg";
import dupatta from "@/assets/product-dupatta.jpg";
import earrings from "@/assets/product-earrings.jpg";
import clutch from "@/assets/product-clutch.jpg";
import sharara from "@/assets/product-sharara.jpg";
import necklace from "@/assets/product-necklace.jpg";
import organzaSaree from "@/assets/product-organza-saree.jpg";
import juttis from "@/assets/product-juttis.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  sizes?: string[];
  inStock: boolean;
  tag?: string;
}

export const products: Product[] = [
  {
    id: "silk-saree",
    name: "Kanchipuram Silk Saree",
    price: 3499,
    originalPrice: 4299,
    image: silkSaree,
    category: "Sarees",
    description: "Handwoven Kanchipuram silk saree in rich burgundy with a lustrous gold zari border. Perfect for weddings and festive occasions.",
    sizes: ["Free Size"],
    inStock: true,
    tag: "Bestseller",
  },
  {
    id: "anarkali-suit",
    name: "Royal Anarkali Suit",
    price: 2799,
    image: anarkali,
    category: "Suits",
    description: "Floor-length navy blue anarkali with intricate gold embroidery. A timeless piece for celebrations and evening gatherings.",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    tag: "New Arrival",
  },
  {
    id: "lehenga-choli",
    name: "Bridal Lehenga Choli",
    price: 3999,
    originalPrice: 4999,
    image: lehenga,
    category: "Lehengas",
    description: "Stunning pink and gold bridal lehenga with heavy zardozi embroidery. Comes with matching choli and net dupatta.",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    tag: "Bridal",
  },
  {
    id: "cotton-kurti",
    name: "Chikankari Cotton Kurti",
    price: 899,
    image: kurti,
    category: "Kurtis",
    description: "Lightweight mint green cotton kurti with delicate white chikankari embroidery. Ideal for everyday elegance.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    inStock: true,
  },
  {
    id: "palazzo-set",
    name: "Printed Palazzo Set",
    price: 1299,
    originalPrice: 1599,
    image: palazzo,
    category: "Co-ord Sets",
    description: "Mustard yellow kurta and palazzo set with traditional block print. Comfortable and stylish for casual outings.",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: "embroidered-dupatta",
    name: "Embroidered Silk Dupatta",
    price: 749,
    image: dupatta,
    category: "Accessories",
    description: "Ivory silk dupatta with delicate gold threadwork and tassel detailing. A versatile accessory for any ensemble.",
    sizes: ["Free Size"],
    inStock: true,
  },
  {
    id: "jhumka-earrings",
    name: "Gold Jhumka Earrings",
    price: 599,
    image: earrings,
    category: "Jewellery",
    description: "Traditional gold-plated jhumka earrings with ruby stones and pearl drops. Statement jewellery for any occasion.",
    sizes: ["One Size"],
    inStock: true,
    tag: "Popular",
  },
  {
    id: "velvet-clutch",
    name: "Emerald Velvet Clutch",
    price: 1199,
    image: clutch,
    category: "Accessories",
    description: "Luxurious emerald green velvet clutch with gold embroidery and clasp. The perfect companion for evening occasions.",
    sizes: ["One Size"],
    inStock: true,
  },
  {
    id: "banarasi-sharara",
    name: "Banarasi Silk Sharara",
    price: 3799,
    originalPrice: 4599,
    image: sharara,
    category: "Suits",
    description: "A regal red Banarasi silk sharara suit with rich gold weaving. Perfect for weddings, sangeet, and festive celebrations.",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    tag: "Wedding Edit",
  },
  {
    id: "kundan-necklace",
    name: "Kundan Bridal Necklace Set",
    price: 2499,
    image: necklace,
    category: "Jewellery",
    description: "Exquisite kundan and pearl bridal necklace set with matching maang tikka. A showstopper piece for the modern bride.",
    sizes: ["One Size"],
    inStock: true,
    tag: "Bridal",
  },
  {
    id: "organza-saree",
    name: "Floral Organza Saree",
    price: 2199,
    image: organzaSaree,
    category: "Sarees",
    description: "Dreamy teal blue organza saree with hand-embroidered floral motifs. Lightweight and graceful for summer celebrations.",
    sizes: ["Free Size"],
    inStock: true,
    tag: "New Arrival",
  },
  {
    id: "embroidered-juttis",
    name: "Gold Embroidered Juttis",
    price: 999,
    image: juttis,
    category: "Accessories",
    description: "Handcrafted maroon velvet mojari juttis with intricate gold zardozi embroidery. The finishing touch for any ethnic outfit.",
    sizes: ["36", "37", "38", "39", "40", "41"],
    inStock: true,
  },
];

export const categories = ["All", "Sarees", "Suits", "Lehengas", "Kurtis", "Co-ord Sets", "Accessories", "Jewellery"];
