
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Plus,
  ArrowRight,
  X,
  Check,
  Zap,
  MessageCircle,
  Send,
  LoaderCircle,
} from "lucide-react";

import { supabase, type Product } from "@/lib/supabase";
import { site } from "@/lib/site";
import { useCart } from "@/lib/cart";
import { useRouter } from "@/lib/router";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { navigate } = useRouter();

  // Get valid capacity options.
  // "Contact for capacity" is displayed as text, not as a dropdown option.
  const options = Array.isArray(product.capacity_options)
    ? product.capacity_options.filter(
        (option): option is string =>
          typeof option === "string" &&
          option.trim().length > 0 &&
          option.trim().toLowerCase() !== "contact for capacity"
      )
    : [];

  const [selected, setSelected] = useState(
    options[0] || product.capacity || "Contact for capacity"
  );

  // Keep selected capacity synchronized with product data.
  useEffect(() => {
    const currentOptions = Array.isArray(product.capacity_options)
      ? product.capacity_options.filter(
          (option): option is string =>
            typeof option === "string" &&
            option.trim().length > 0 &&
            option.trim().toLowerCase() !== "contact for capacity"
        )
      : [];

    setSelected((current) => {
      if (currentOptions.length > 0) {
        return currentOptions.includes(current)
          ? current
          : currentOptions[0];
      }

      return product.capacity || "Contact for capacity";
    });
  }, [product.id, product.capacity, product.capacity_options]);

  const [showEnquiry, setShowEnquiry] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    if (!showEnquiry) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowEnquiry(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [showEnquiry]);

  const selectCapacity = (capacity: string) => {
    setSelected(capacity);
  };

  const handleAdd = () => {
    addToCart(
      product,
      selected || product.capacity || "Contact for capacity"
    );
  };

  const openProduct = () => {
    navigate(`/products/${product.slug}`);
  };

  const openEnquiry = () => {
    setSuccess(false);
    setError("");
    setWhatsappUrl("");
    setShowEnquiry(true);
  };

  const createWhatsAppUrl = () => {
    const rawNumber = String(site.whatsapp || site.mobile || "");
    let whatsappNumber = rawNumber.replace(/\D/g, "");

    if (whatsappNumber.length === 10) {
      whatsappNumber = `91${whatsappNumber}`;
    }

    if (!whatsappNumber) return "";

    const enquiryMessage = [
      "Hello STPS, I would like to enquire about a product.",
      "",
      "PRODUCT ENQUIRY",
      "--------------------------",
      `Product: ${product.name}`,
      `Category: ${product.category}`,
      `Required Capacity: ${selected}`,
      `Quantity: ${Math.max(1, Number(quantity) || 1)}`,
      "",
      "CUSTOMER DETAILS",
      "--------------------------",
      `Name: ${customerName.trim()}`,
      `Company: ${companyName.trim() || "Not provided"}`,
      `Mobile: ${phone.trim()}`,
      `Email: ${email.trim()}`,
      "",
      "REQUIREMENTS",
      message.trim() || "No additional requirements provided.",
      "",
      "Please contact me regarding this enquiry.",
    ].join("\n");

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      enquiryMessage
    )}`;
  };

  const handleEnquirySubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setError("");

    const whatsappTab = window.open("about:blank", "_blank");

    try {
      const enquiryQuantity = Math.max(1, Number(quantity) || 1);

      // Save enquiry in Supabase.
      const { error: insertError } = await supabase
        .from("product_enquiries")
        .insert({
          product_name: product.name,
          product_category: product.category,
          product_capacity: selected,
          customer_name: customerName.trim(),
          company_name: companyName.trim() || null,
          phone: phone.trim(),
          email: email.trim(),
          quantity: enquiryQuantity,
          message: message.trim() || null,
        });

      if (insertError) {
        throw insertError;
      }

      // Send notification through Resend.
      try {
        const { data: emailResult, error: emailError } =
          await supabase.functions.invoke(
            "send-stps-notification",
            {
              body: {
                event_type: "enquiry",
                customer_name: customerName.trim(),
                customer_email: email.trim(),
                customer_phone: phone.trim(),
                company: companyName.trim() || "Not provided",
                address: "",
                items: [
                  {
                    name: product.name,
                    category: product.category,
                    capacity: selected,
                    quantity: enquiryQuantity,
                  },
                ],
                total_amount: 0,
                notes:
                  message.trim() ||
                  "No additional requirements provided.",
              },
            }
          );

        if (emailError) {
          console.error(
            "Enquiry email notification failed:",
            emailError
          );
        } else if (!emailResult?.success) {
          console.error(
            "Email notification unsuccessful:",
            emailResult
          );
        }
      } catch (emailErr) {
        console.error(
          "Enquiry email notification error:",
          emailErr
        );
      }

      // Prepare WhatsApp.
      const url = createWhatsAppUrl();

      setWhatsappUrl(url);
      setSuccess(true);

      if (whatsappTab) {
        if (url) {
          whatsappTab.location.href = url;
        } else {
          whatsappTab.close();
        }
      }

      // Reset customer form.
      setCustomerName("");
      setCompanyName("");
      setPhone("");
      setEmail("");
      setQuantity("1");
      setMessage("");
    } catch (err: unknown) {
      console.error("Product enquiry submission failed:", err);

      if (whatsappTab && !whatsappTab.closed) {
        whatsappTab.close();
      }

      const errorMessage =
        err && typeof err === "object" && "message" in err
          ? String(err.message)
          : String(err);

      setError(`Supabase Error: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#101D32]/10 bg-white shadow-[0_4px_18px_rgba(16,29,50,0.04)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#B88A3B]/40 hover:shadow-[0_18px_40px_rgba(16,29,50,0.10)]">

        <div className="absolute left-0 right-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#B88A3B] via-[#E8D5A3] to-[#B88A3B] transition-transform duration-500 group-hover:scale-x-100" />

        {/* PRODUCT IMAGE */}

        <button
          type="button"
          onClick={openProduct}
          className="relative block h-52 w-full shrink-0 overflow-hidden bg-[#F0EEE8] sm:h-56"
          aria-label={`View ${product.name}`}
        >
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-contain p-5 transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[#B88A3B]/60">
              <Zap className="h-14 w-14" />
            </div>
          )}

          <div className="absolute bottom-3 left-3 rounded-md border border-white/70 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#101D32] backdrop-blur-sm">
            STPS
          </div>
        </button>

        {/* PRODUCT INFORMATION */}

        <div className="flex flex-1 flex-col p-5">

          <div className="mb-4 flex items-center justify-between gap-2">
            <span className="inline-flex max-w-[75%] items-center gap-1.5 rounded-full bg-[#B88A3B]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#9A702D]">
              <Zap className="h-3 w-3 shrink-0" />
              <span className="truncate">{product.category}</span>
            </span>

            {product.featured && (
              <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-[#B88A3B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B88A3B]" />
                Featured
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={openProduct}
            className="mb-2 block text-left"
          >
            <h3 className="text-[17px] font-extrabold leading-snug text-[#101D32] transition-colors duration-300 group-hover:text-[#B88A3B]">
              {product.name}
            </h3>
          </button>

          <p className="mb-5 line-clamp-2 min-h-[2.75rem] text-[13px] font-medium leading-relaxed text-[#192B46]/65">
            {product.short_description}
          </p>

          {/* CAPACITY DROPDOWN */}

          <div className="mb-5 mt-auto">
            {options.length > 0 ? (
              <div>
                <label
                  htmlFor={`capacity-${product.id}`}
                  className="mb-2 block text-[11px] font-extrabold uppercase tracking-wider text-[#101D32]"
                >
                  Select Capacity
                </label>

                <select
                  id={`capacity-${product.id}`}
                  value={selected}
                  onChange={(e) => selectCapacity(e.target.value)}
                  className="w-full rounded-lg border border-[#101D32]/15 bg-white px-3 py-3 text-sm font-semibold text-[#101D32] outline-none transition-colors focus:border-[#B88A3B] focus:ring-2 focus:ring-[#B88A3B]/15"
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <p className="mt-2 text-[10px] font-medium text-[#192B46]/50">
                  {options.length} capacities available
                </p>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B88A3B]" />

                <p className="text-xs font-bold leading-relaxed text-[#192B46]/80">
                  {product.capacity || "Contact for capacity"}
                </p>
              </div>
            )}
          </div>

          {/* PRODUCT ACTIONS */}

          <div className="space-y-2 border-t border-[#101D32]/10 pt-4">

            <button
              type="button"
              onClick={openEnquiry}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#B88A3B] bg-white px-3 py-3 text-sm font-extrabold text-[#101D32] transition-all duration-300 hover:bg-[#B88A3B] hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Product Enquiry
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAdd}
                className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-[#101D32] px-3 py-3 text-sm font-bold text-[#E8D5A3] transition-all duration-300 hover:bg-[#192B46] hover:shadow-lg"
              >
                <Plus className="h-4 w-4 shrink-0" />
                <span>Add to Order</span>
              </button>

              <button
                type="button"
                onClick={openProduct}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#101D32]/15 bg-white text-[#101D32] transition-all duration-300 hover:border-[#B88A3B] hover:bg-[#B88A3B] hover:text-white"
                aria-label={`View ${product.name} details`}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* PRODUCT ENQUIRY MODAL */}

      {showEnquiry &&
        createPortal(
          <div className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-[#101D32]/70 p-4 backdrop-blur-sm">

            <button
              type="button"
              aria-label="Close product enquiry"
              onClick={() => setShowEnquiry(false)}
              className="absolute inset-0 h-full w-full cursor-default"
            />

            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="enquiry-modal-title"
              className="relative z-10 my-auto max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#B88A3B]/30 bg-white shadow-2xl"
            >
              <div className="h-1 bg-gradient-to-r from-[#B88A3B] via-[#E8D5A3] to-[#B88A3B]" />

              <div className="flex items-center justify-between border-b border-[#101D32]/10 px-5 py-5 sm:px-7">
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B88A3B]">
                    SUSHEEN TECHNO POWER SYSTEMS
                  </p>

                  <h3
                    id="enquiry-modal-title"
                    className="text-xl font-extrabold text-[#101D32]"
                  >
                    Product Enquiry
                  </h3>

                  <p className="mt-1 text-xs text-[#192B46]/65">
                    Tell us what you need. Our team will contact you.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowEnquiry(false)}
                  aria-label="Close"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#101D32]/5 text-[#192B46] transition-colors hover:bg-[#101D32] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {success ? (
                <div className="px-6 py-12 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#B88A3B]/15 text-[#9A702D]">
                    <Check className="h-8 w-8" />
                  </div>

                  <h4 className="text-xl font-extrabold text-[#101D32]">
                    Enquiry Saved Successfully!
                  </h4>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[#192B46]/70">
                    Your enquiry has been saved. A confirmation email has
                    been requested, and WhatsApp is ready with your product
                    details. Please press Send in WhatsApp to share your
                    enquiry with STPS.
                  </p>

                  {whatsappUrl ? (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mx-auto mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-extrabold text-white transition-all hover:bg-[#1DA851]"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Open WhatsApp
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <p className="mt-5 text-sm text-red-700">
                      WhatsApp number is not configured. Please contact STPS
                      directly.
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowEnquiry(false)}
                    className="mx-auto mt-4 block rounded-lg px-7 py-3 text-sm font-bold text-[#101D32] transition-colors hover:bg-[#101D32]/5"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleEnquirySubmit}
                  className="space-y-5 p-5 sm:p-7"
                >
                  {/* SELECTED PRODUCT */}

                  <div className="rounded-xl border border-[#B88A3B]/30 bg-white p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#B88A3B]">
                      Selected Product
                    </p>

                    <p className="font-extrabold text-[#101D32]">
                      {product.name}
                    </p>

                    <p className="mt-1 text-xs text-[#192B46]/65">
                      {product.category}
                    </p>
                  </div>

                  {/* SELECTED CAPACITY */}

                  <div>
                    <label
                      htmlFor={`enquiry-capacity-${product.id}`}
                      className="mb-2 block text-xs font-bold text-[#101D32]"
                    >
                      Required Capacity
                    </label>

                    <select
                      id={`enquiry-capacity-${product.id}`}
                      value={selected}
                      onChange={(e) => setSelected(e.target.value)}
                      className="w-full rounded-lg border border-[#101D32]/15 bg-white px-4 py-3 text-sm text-[#101D32] outline-none focus:border-[#B88A3B]"
                    >
                      {options.length > 0 ? (
                        options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))
                      ) : (
                        <option value={selected}>{selected}</option>
                      )}
                    </select>
                  </div>

                  {/* CUSTOMER DETAILS */}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="enquiry-name"
                        className="mb-2 block text-xs font-bold text-[#101D32]"
                      >
                        Your Name *
                      </label>

                      <input
                        id="enquiry-name"
                        type="text"
                        required
                        maxLength={100}
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full rounded-lg border border-[#101D32]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#B88A3B]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-company"
                        className="mb-2 block text-xs font-bold text-[#101D32]"
                      >
                        Company Name
                      </label>

                      <input
                        id="enquiry-company"
                        type="text"
                        maxLength={150}
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Your company"
                        className="w-full rounded-lg border border-[#101D32]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#B88A3B]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-phone"
                        className="mb-2 block text-xs font-bold text-[#101D32]"
                      >
                        Mobile Number *
                      </label>

                      <input
                        id="enquiry-phone"
                        type="tel"
                        required
                        maxLength={20}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter mobile number"
                        className="w-full rounded-lg border border-[#101D32]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#B88A3B]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-email"
                        className="mb-2 block text-xs font-bold text-[#101D32]"
                      >
                        Email Address *
                      </label>

                      <input
                        id="enquiry-email"
                        type="email"
                        required
                        maxLength={150}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-[#101D32]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#B88A3B]"
                      />
                    </div>
                  </div>

                  {/* QUANTITY */}

                  <div>
                    <label
                      htmlFor="enquiry-quantity"
                      className="mb-2 block text-xs font-bold text-[#101D32]"
                    >
                      Required Quantity
                    </label>

                    <input
                      id="enquiry-quantity"
                      type="number"
                      min="1"
                      max="100000"
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full rounded-lg border border-[#101D32]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#B88A3B]"
                    />
                  </div>

                  {/* REQUIREMENTS */}

                  <div>
                    <label
                      htmlFor="enquiry-message"
                      className="mb-2 block text-xs font-bold text-[#101D32]"
                    >
                      Your Requirements
                    </label>

                    <textarea
                      id="enquiry-message"
                      rows={3}
                      maxLength={1000}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your requirements..."
                      className="w-full resize-y rounded-lg border border-[#101D32]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#B88A3B]"
                    />
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                    >
                      {error}
                    </p>
                  )}

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#101D32] py-4 text-sm font-extrabold text-[#E8D5A3] transition-all duration-300 hover:bg-[#192B46] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Submit Enquiry
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] leading-relaxed text-[#192B46]/55">
                    Your details will be saved securely for STPS to respond
                    to your enquiry. A confirmation email will also be sent.
                    WhatsApp will open after submission.
                  </p>
                </form>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
