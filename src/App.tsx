import { useEffect, useState } from "react";
import { RouterProvider, useRouter } from "@/lib/router";
import { CartProvider } from "@/lib/cart";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { FloatingContact } from "@/components/FloatingContact";
import { HomePage } from "@/pages/Home";
import { ProductsPage } from "@/pages/Products";
import { ProductDetailPage } from "@/pages/ProductDetail";
import { AboutPage } from "@/pages/About";
import { ServicesPage } from "@/pages/Services";
import { ContactPage } from "@/pages/Contact";
import { BlogsPage } from "@/pages/BlogsPage";
import { CheckoutPage } from "@/components/CartDrawer";
function Routes() {
  const { path } = useRouter();
  const clean = path.split("?")[0];
  if (clean === "/") return <HomePage />;

  if (clean === "/products") return <ProductsPage />;

  if (clean.startsWith("/products/")) {
    return <ProductDetailPage slug={clean.split("/")[2]} />;
  }

  if (clean === "/about") return <AboutPage />;

  if (clean === "/services") return <ServicesPage />;

  if (clean === "/blogs") return <BlogsPage />;

  if (clean === "/contact") return <ContactPage />;

  if (clean === "/checkout") return <CheckoutPage />;

  return (
    <div className="pt-32 pb-20 min-h-screen text-center bg-white">
      <h1 className="text-3xl font-bold text-[#101D32]">
        Page not found
      </h1>

      <a
        href="/"
        className="text-[#B88A3B] font-semibold mt-4 inline-block"
      >
        Go home
      </a>
    </div>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  const { path } = useRouter();
  const [transitionKey, setTransitionKey] = useState(0);

  useEffect(() => {
    setTransitionKey((key) => key + 1);
  }, [path]);

  return (
    <div
      key={transitionKey}
      style={{
        animation: "slideInUp 0.5s cubic-bezier(0.16,1,0.3,1) both",
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <div className="min-h-screen bg-white text-[#101D32] font-sans antialiased">
          <Navbar />

          <PageWrapper>
            <Routes />
          </PageWrapper>

          <Footer />

          {/* Floating WhatsApp and Call buttons on every page */}
          <FloatingContact />

          <CartDrawer />
        </div>
      </CartProvider>
    </RouterProvider>
  );
}