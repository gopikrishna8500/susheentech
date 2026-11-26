
import { useState } from "react";
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Package,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { useRouter } from "@/lib/router";
import { supabase } from "@/lib/supabase";

export function CartDrawer() {
  const {
    items,
    isOpen,
    setOpen,
    removeItem,
    updateQuantity,
    updateCapacity,
    clearCart,
    totalQuantity,
  } = useCart();

  const { navigate } = useRouter();

  return (
    <>
      <div
        className={`fixed inset-0 bg-[#101D32]/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setOpen(false)}
      />

      <aside
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl transition-transform duration-500 ease-out flex flex-col border-l border-[#E8E3D9] ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="h-1 bg-gradient-to-r from-[#101D32] via-[#B88A3B] to-[#E8D5A3] flex-shrink-0" />

        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E3D9] bg-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#F5F0E5] border border-[#E8D5A3] flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-[#B88A3B]" />
            </div>

            <div>
              <h3 className="text-[#101D32] font-bold text-lg">
                Your Order
              </h3>
              <p className="text-xs text-[#87909D]">
                {totalQuantity} {totalQuantity === 1 ? "item" : "items"} selected
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="w-10 h-10 rounded-xl bg-[#F5F3EE] hover:bg-[#EAE6DD] flex items-center justify-center text-[#596579] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
            <div className="w-24 h-24 rounded-full bg-white border border-[#E8E3D9] flex items-center justify-center shadow-sm">
              <ShoppingBag className="w-10 h-10 text-[#B88A3B]" />
            </div>

            <div>
              <h3 className="text-[#101D32] text-xl font-bold">
                Your Order Is Empty
              </h3>

              <p className="text-[#87909D] text-sm mt-2 leading-6">
                Explore our power solutions and add products
                to your order.
              </p>
            </div>

            <button
              onClick={() => {
                setOpen(false);
                navigate("/products");
              }}
              className="mt-2 px-6 py-3 rounded-xl bg-[#101D32] text-[#E8D5A3] font-bold text-sm hover:bg-[#192B46] transition-colors inline-flex items-center gap-2"
            >
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 md:px-6 py-5 space-y-4">
              {items.map((item, index) => {
                const capacityOptions = Array.isArray(
                  item.product.capacity_options
                )
                  ? item.product.capacity_options
                  : [];

                const availableOptions = capacityOptions.length
                  ? capacityOptions
                  : [
                    item.capacityOption ||
                    item.product.capacity ||
                    "Standard",
                  ];

                return (
                  <div
                    key={index}
                    className="flex gap-4 p-4 rounded-2xl bg-white border border-[#E8E3D9] shadow-sm hover:shadow-md hover:border-[#D9C49A] transition-all"
                    style={{
                      animation: `slideInUp 0.4s ${index * 0.05}s both`,
                    }}
                  >
                    <div className="w-20 h-20 rounded-xl bg-[#F0EEE8] border border-[#E8E3D9] overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {item.product.image_url ? (
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="w-full h-full object-contain p-2"
                        />
                      ) : (
                        <Package className="w-8 h-8 text-[#B88A3B]" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[#101D32] text-sm font-bold leading-5">
                        {item.product.name}
                      </p>

                      <div className="mt-2">
                        <label className="text-[10px] text-[#87909D] uppercase tracking-wider font-bold">
                          Capacity / Model
                        </label>

                        <select
                          value={item.capacityOption}
                          onChange={(e) =>
                            updateCapacity(index, e.target.value)
                          }
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-[#FAF9F6] border border-[#E5E0D6] text-[#101D32] text-xs font-semibold focus:outline-none focus:border-[#B88A3B]"
                        >
                          {availableOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() =>
                            updateQuantity(index, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="w-8 h-8 rounded-lg bg-[#F5F3EE] hover:bg-[#EAE6DD] flex items-center justify-center text-[#101D32] transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <span className="text-[#101D32] text-sm font-bold w-7 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(index, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="w-8 h-8 rounded-lg bg-[#F5F3EE] hover:bg-[#EAE6DD] flex items-center justify-center text-[#101D32] transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => removeItem(index)}
                          aria-label="Remove item"
                          className="ml-auto w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="px-6 py-5 border-t border-[#E8E3D9] bg-white space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[#687386] text-sm">
                  Total Items
                </span>

                <span className="text-[#101D32] font-bold text-lg">
                  {totalQuantity}
                </span>
              </div>

              <div className="rounded-xl bg-white border border-[#E8E3D9] p-3">
                <p className="text-xs text-[#687386] leading-5">
                  Final pricing will be confirmed by our team based
                  on selected capacity, quantity, and delivery location.
                </p>
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/checkout");
                }}
                className="w-full py-4 rounded-xl bg-[#101D32] text-[#E8D5A3] font-bold text-sm hover:bg-[#192B46] transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={clearCart}
                className="w-full py-2.5 rounded-xl text-[#87909D] text-xs font-semibold hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                Clear Order
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export function CheckoutPage() {
  const {
    items,
    clearCart,
    totalQuantity,
    setOpen,
  } = useCart();

  const { navigate } = useRouter();

  const [form, setForm] = useState({
    customer_name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMsg("");

    const payload = {
      customer_name: form.customer_name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      notes: form.notes.trim(),
      items: items.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        capacity: i.capacityOption,
      })),
      total_amount: 0,
    };

    try {
      // Step 1: Save order in Supabase.

      const { error: insertError } = await supabase
        .from("orders")
        .insert(payload);

      if (insertError) {
        console.error("Supabase order insert error:", insertError);
        throw insertError;
      }


      // Step 2: Send customer and owner notification emails.
      // Email failure will not cancel the saved order.
      try {
        const { data: emailResult, error: emailError } =
          await supabase.functions.invoke("send-stps-notification", {
            body: {
              event_type: "order",
              customer_name: payload.customer_name,
              customer_email: payload.email,
              customer_phone: payload.phone,
              company: payload.company || "Not provided",
              address: payload.address || "Not provided",
              items: payload.items,
              total_amount: payload.total_amount,
              notes: payload.notes || "No additional notes",
            },
          });

        if (emailError) {
          console.error("Order email notification failed:", emailError);
        } else if (!emailResult?.success) {
          console.error(
            "Order email notification was not successful:",
            emailResult
          );
        } else {
          console.log("Order notification emails sent successfully.");
        }
      } catch (emailErr) {
        console.error("Order email notification error:", emailErr);
      }

      // Step 3: Show existing success screen and clear cart.
      setStatus("success");
      clearCart();
    } catch (err) {
      console.error("Order submission failed:", err);

      setStatus("error");

      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or call us."
      );
    }
  };

  /* Success Screen */
  if (status === "success") {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center px-6 bg-white">
        <div
          className="max-w-lg w-full text-center space-y-6 bg-white border border-[#E8E3D9] rounded-[2rem] p-8 md:p-12 shadow-xl"
          style={{
            animation: "slideInUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-[#F5F0E5] border border-[#E8D5A3] flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-[#B88A3B]" />
          </div>

          <div>
            <span className="text-[#B88A3B] text-xs font-bold tracking-[0.2em] uppercase">
              Request Received
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-[#101D32] mt-3">
              Order Requested!
            </h1>

            <p className="text-[#687386] mt-4 leading-7 text-sm">
              Thank you for choosing Susheen Techno Power Systems.
              Our team will contact you shortly with pricing and
              delivery details for your order.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-[#87909D]">
            <ShieldCheck className="w-4 h-4 text-[#B88A3B]" />
            Your order request has been submitted.
          </div>

          <button
            onClick={() => navigate("/products")}
            className="w-full px-6 py-4 rounded-xl bg-[#101D32] text-[#E8D5A3] font-bold hover:bg-[#192B46] transition-colors inline-flex items-center justify-center gap-2"
          >
            Continue Browsing
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  /* Empty Cart Screen */
  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center px-6 bg-white">
        <div className="max-w-md w-full text-center space-y-5 bg-white border border-[#E8E3D9] rounded-[2rem] p-9 shadow-sm">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#F5F0E5] flex items-center justify-center">
            <ShoppingCart className="w-9 h-9 text-[#B88A3B]" />
          </div>

          <h1 className="text-2xl font-bold text-[#101D32]">
            Your Order Is Empty
          </h1>

          <p className="text-[#687386] text-sm leading-6">
            Add products to your order before proceeding to checkout.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3.5 rounded-xl bg-[#101D32] text-[#E8D5A3] font-bold hover:bg-[#192B46] transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <RevealCheckoutHeader />

        <div className="mt-10 grid lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Customer Details Form */}
          <form
            onSubmit={submit}
            className="lg:col-span-3 bg-white border border-[#E8E3D9] rounded-[2rem] p-7 md:p-9 shadow-sm space-y-6"
          >
            <div>
              <span className="text-[#B88A3B] text-xs font-bold tracking-[0.2em] uppercase">
                Customer Information
              </span>

              <h2 className="text-2xl font-bold text-[#101D32] mt-2">
                Delivery Details
              </h2>

              <p className="text-[#687386] text-sm mt-2 leading-6">
                Please provide your contact details so our team
                can get in touch with you.
              </p>
            </div>

            <div className="w-full h-px bg-[#EEEAE2]" />

            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label="Full Name"
                placeholder="Enter your full name"
                required
                value={form.customer_name}
                onChange={(v) =>
                  setForm({ ...form, customer_name: v })
                }
              />

              <Field
                label="Company Name"
                placeholder="Company (optional)"
                value={form.company}
                onChange={(v) =>
                  setForm({ ...form, company: v })
                }
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                required
                value={form.email}
                onChange={(v) =>
                  setForm({ ...form, email: v })
                }
              />

              <Field
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
                required
                value={form.phone}
                onChange={(v) =>
                  setForm({ ...form, phone: v })
                }
              />
            </div>

            <Field
              label="Delivery Address"
              placeholder="Enter your complete delivery address"
              value={form.address}
              onChange={(v) =>
                setForm({ ...form, address: v })
              }
              textarea
            />

            <Field
              label="Additional Notes"
              placeholder="Preferred delivery date, site details, or any special requirements..."
              value={form.notes}
              onChange={(v) =>
                setForm({ ...form, notes: v })
              }
              textarea
            />

            {status === "error" && (
              <div className="text-red-700 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3 leading-6">
                <strong>Unable to submit your order.</strong>
                <p className="mt-1 break-words">{errorMsg}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-4 rounded-xl bg-[#101D32] text-[#E8D5A3] font-bold hover:bg-[#192B46] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
            >
              {status === "submitting" ? (
                <>
                  <span className="w-5 h-5 border-2 border-[#E8D5A3]/30 border-t-[#E8D5A3] rounded-full animate-spin" />
                  Submitting Your Request...
                </>
              ) : (
                <>
                  Submit Order Request
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-[#87909D]">
              <ShieldCheck className="w-4 h-4 text-[#B88A3B]" />
              Your information is used to process your enquiry.
            </div>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-[#101D32] rounded-[2rem] p-6 md:p-7 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[#E8D5A3] text-xs font-bold tracking-widest uppercase">
                    Your Selection
                  </span>

                  <h2 className="text-white text-xl font-bold mt-1">
                    Order Summary
                  </h2>
                </div>

                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-[#E8D5A3]" />
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-y border-white/10">
                <span className="text-slate-300 text-sm">
                  Total Products
                </span>

                <span className="text-[#E8D5A3] font-bold">
                  {totalQuantity}
                </span>
              </div>

              <div className="space-y-4 mt-5">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="w-16 h-16 rounded-lg bg-white overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {item.product.image_url ? (
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <Package className="w-7 h-7 text-[#B88A3B]" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-white text-sm font-semibold leading-5">
                        {item.product.name}
                      </p>

                      <p className="text-slate-400 text-xs mt-1">
                        {item.capacityOption}
                      </p>

                      <p className="text-[#E8D5A3] text-xs font-semibold mt-1">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-slate-300 text-xs leading-6">
                  Product pricing is confirmed by our team after
                  reviewing your selected models, quantities, and
                  delivery requirements.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="w-full mt-5 py-3 rounded-xl border border-[#E8D5A3]/40 text-[#E8D5A3] text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Edit Your Order
              </button>
            </div>

            <div className="bg-white border border-[#E8E3D9] rounded-2xl p-5 flex gap-3">
              <ShieldCheck className="w-6 h-6 text-[#B88A3B] flex-shrink-0" />

              <div>
                <h3 className="text-[#101D32] text-sm font-bold">
                  Personalised Assistance
                </h3>

                <p className="text-[#687386] text-xs mt-1 leading-5">
                  Our team will contact you to confirm product
                  specifications, pricing, and delivery details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Checkout Page Header */
function RevealCheckoutHeader() {
  return (
    <div>
      <span className="inline-flex items-center gap-2 text-[#B88A3B] text-xs font-bold tracking-[0.22em] uppercase">
        <span className="w-8 h-px bg-[#B88A3B]" />
        Order Details
      </span>

      <h1 className="text-4xl md:text-5xl font-bold text-[#101D32] mt-4">
        Secure Your
        <span className="text-[#B88A3B]"> Order.</span>
      </h1>

      <p className="text-[#687386] text-sm md:text-base mt-4 leading-7 max-w-2xl">
        Review your selected products and share your details.
        Our team will personally confirm pricing and delivery.
      </p>
    </div>
  );
}

/* Reusable Form Field */
function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  textarea,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
}) {
  const cls =
    "w-full px-4 py-3.5 rounded-xl bg-[#FAF9F6] border border-[#E5E0D6] text-[#101D32] placeholder-[#A0A6AF] text-sm focus:outline-none focus:border-[#B88A3B] focus:ring-2 focus:ring-[#B88A3B]/15 transition-all";

  return (
    <label className="block">
      <span className="block text-xs font-bold text-[#596579] mb-2">
        {label}
        {required && <span className="text-[#B88A3B]"> *</span>}
      </span>

      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          required={required}
          placeholder={placeholder}
          className={`${cls} resize-y`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </label>
  );
}
