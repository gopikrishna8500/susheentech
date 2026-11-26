
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CalendarDays,
  Clock3,
  Search,
  BookOpen,
  Zap,
  ShieldCheck,
  Settings,
  Factory,
  X,
  ChevronRight,
} from "lucide-react";

import { useRouter } from "@/lib/router";

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  content: string[];
};

const blogs: Blog[] = [
  {
    id: 1,
    title: "Understanding Electrical Control Panels: A Complete Guide",
    excerpt:
      "Explore the essential components, functions and applications of electrical control panels in modern industries.",
    category: "Electrical Panels",
    date: "November 20, 2026",
    readTime: "6 min read",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1400&q=85",
    content: [
      "Electrical control panels are an essential part of industrial electrical systems. They bring together electrical components that help operators monitor, control and protect machinery and processes.",
      "A typical control panel may include circuit breakers, contactors, relays, switches, meters, control devices and protective equipment. Each component has a specific role in ensuring that the connected system operates as intended.",
      "Control panels are used across manufacturing plants, commercial buildings, infrastructure facilities and many other industrial environments.",
      "Choosing the right panel requires understanding the electrical load, operating environment, safety requirements and future expansion needs. Proper design, installation and periodic maintenance are equally important.",
      "A well-designed control panel helps create a more organised, manageable and dependable electrical distribution and control system."
    ],
  },
  {
    id: 2,
    title: "Why Preventive Maintenance Matters for Electrical Panels",
    excerpt:
      "Learn how planned inspections and maintenance can help identify electrical issues before they become major problems.",
    category: "Maintenance",
    date: "November 15, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1000&q=85",
    content: [
      "Electrical panels operate in demanding environments and should be inspected periodically by qualified electrical professionals.",
      "Preventive maintenance involves planned inspections, checking connections, examining components, reviewing operating conditions and identifying signs of wear or overheating.",
      "Loose connections, dust accumulation, damaged insulation and abnormal operating temperatures can affect equipment performance if left unattended.",
      "Maintenance schedules should be based on equipment specifications, operating conditions and applicable safety requirements.",
      "A consistent maintenance programme supports equipment reliability and helps organisations plan repairs and replacements more effectively."
    ],
  },
  {
    id: 3,
    title: "MCC Panels: Powering Industrial Motor Control",
    excerpt:
      "Discover how Motor Control Centre panels organise and manage motor control applications in industrial facilities.",
    category: "Industrial Solutions",
    date: "November 10, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1000&q=85",
    content: [
      "Motor Control Centre panels, commonly known as MCC panels, are used to control and manage multiple electric motors from a central location.",
      "Depending on the application, an MCC may include motor starters, circuit protection devices, contactors, overload relays, control equipment and monitoring instruments.",
      "MCC panels are commonly used in manufacturing facilities, water treatment plants, process industries and infrastructure projects.",
      "The panel configuration depends on the number of motors, motor ratings, starting methods, operating conditions and control requirements.",
      "Correct engineering and installation are important for safe operation, accessibility and maintainability."
    ],
  },
  {
    id: 4,
    title: "APFC Panels and the Importance of Power Factor",
    excerpt:
      "Understand power factor correction and how APFC panels help manage reactive power in electrical installations.",
    category: "Power Management",
    date: "November 05, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=85",
    content: [
      "Power factor is an important consideration in electrical installations, particularly where inductive loads such as motors and transformers are widely used.",
      "An Automatic Power Factor Control panel, or APFC panel, monitors power factor and controls capacitor bank switching to provide power factor correction.",
      "The required configuration depends on the load profile, electrical system characteristics and operating conditions.",
      "Correctly selected and maintained power factor correction equipment can help improve the utilisation of electrical infrastructure.",
      "A qualified electrical engineer should evaluate the installation before selecting an APFC solution."
    ],
  },
  {
    id: 5,
    title: "PLC Automation: Making Industrial Operations Smarter",
    excerpt:
      "A simple introduction to PLC systems and their role in industrial monitoring, control and automation.",
    category: "Automation",
    date: "October 28, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=85",
    content: [
      "Programmable Logic Controllers, or PLCs, are industrial computers designed to control machines and automated processes.",
      "PLCs receive signals from field devices such as sensors and switches, process the programmed logic and control outputs such as motors, valves and indicators.",
      "They are used in manufacturing, material handling, packaging, utilities and process automation.",
      "PLC-based systems can be configured for different control sequences, interlocks, alarms and monitoring requirements.",
      "Successful automation projects require proper planning, programming, electrical design, commissioning and ongoing support."
    ],
  },
  {
    id: 6,
    title: "Electrical Safety: Essential Practices for Industrial Facilities",
    excerpt:
      "Explore important electrical safety practices for equipment operation, inspection and maintenance.",
    category: "Electrical Safety",
    date: "October 20, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1000&q=85",
    content: [
      "Electrical safety should be a priority in every industrial and commercial facility.",
      "Only authorised and qualified personnel should carry out electrical installation, inspection and maintenance work.",
      "Appropriate isolation procedures, lockout and tagout practices, suitable personal protective equipment and approved tools are important parts of a safe working environment.",
      "Electrical enclosures should be kept properly closed and maintained. Equipment should be inspected according to applicable standards and manufacturer recommendations.",
      "Every facility should establish safety procedures and provide appropriate training to personnel who work with electrical systems."
    ],
  },
];

const categories = [
  "All",
  "Electrical Panels",
  "Industrial Solutions",
  "Power Management",
  "Automation",
  "Maintenance",
  "Electrical Safety",
];

const categoryIcons: Record<string, typeof Zap> = {
  "Electrical Panels": Zap,
  "Industrial Solutions": Factory,
  "Power Management": Settings,
  Automation: Settings,
  Maintenance: ShieldCheck,
  "Electrical Safety": ShieldCheck,
};

export function BlogsPage() {
  const { navigate } = useRouter();

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const featuredBlog = blogs.find((blog) => blog.featured)!;

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        activeCategory === "All" || blog.category === activeCategory;

      const term = search.toLowerCase().trim();

      const matchesSearch =
        !term ||
        blog.title.toLowerCase().includes(term) ||
        blog.excerpt.toLowerCase().includes(term) ||
        blog.category.toLowerCase().includes(term);

      return matchesCategory && matchesSearch && !blog.featured;
    });
  }, [activeCategory, search]);

  const visibleFeatured =
    activeCategory === "All" &&
    !search.trim();

  if (selectedBlog) {
    return (
      <main className="min-h-screen bg-white pt-28 pb-20">
        <article className="mx-auto max-w-4xl px-5 sm:px-8">
          <button
            onClick={() => setSelectedBlog(null)}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#A77B35] transition hover:gap-3"
          >
            <ArrowLeft size={17} />
            Back to Blogs
          </button>

          <div className="mb-7 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#E8D5A3]/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#8C6429]">
              {selectedBlog.category}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <CalendarDays size={15} />
              {selectedBlog.date}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <Clock3 size={15} />
              {selectedBlog.readTime}
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight text-[#101D32] sm:text-5xl">
            {selectedBlog.title}
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            {selectedBlog.excerpt}
          </p>

          <div className="mt-9 overflow-hidden rounded-3xl">
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="h-[260px] w-full object-cover sm:h-[430px]"
            />
          </div>

          <div className="mx-auto mt-10 max-w-3xl space-y-6">
            {selectedBlog.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-8 text-gray-700 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-14 rounded-3xl bg-[#101D32] p-8 text-white sm:p-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8D5A3]">
              Need an electrical solution?
            </span>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Let's discuss your project.
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-white/70">
              Connect with Susheen Techno Power Systems to discuss your
              industrial electrical and automation requirements.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="mt-7 inline-flex items-center gap-3 rounded-xl bg-[#E8D5A3] px-6 py-3.5 font-bold text-[#101D32] transition hover:bg-white"
            >
              Contact Our Team
              <ArrowRight size={18} />
            </button>
          </div>
        </article>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-24">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#101D32] py-20 sm:py-28">
        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border border-[#E8D5A3]/15" />
        <div className="absolute -right-10 -top-14 h-52 w-52 rounded-full border border-[#E8D5A3]/15" />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#B88A3B]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E8D5A3]/30 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#E8D5A3]">
              <BookOpen size={15} />
              STPS Knowledge Centre
            </div>

            <h1 className="text-4xl font-bold leading-tight text-white sm:text-6xl">
              Insights That
              <span className="block text-[#E8D5A3]">
                Power Industries.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Explore electrical engineering insights, industrial
              solutions, automation technologies and practical knowledge
              from the world of power systems.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <button
                onClick={() =>
                  document.getElementById("blog-list")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="inline-flex items-center gap-3 rounded-xl bg-[#E8D5A3] px-6 py-3.5 font-bold text-[#101D32] transition hover:bg-white"
              >
                Explore Articles
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      {visibleFeatured && (
        <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 sm:pt-20">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-8 w-1 rounded-full bg-[#B88A3B]" />
            <h2 className="text-2xl font-bold text-[#101D32]">
              Featured Article
            </h2>
          </div>

          <div className="grid overflow-hidden rounded-3xl bg-white shadow-[0_15px_50px_rgba(16,29,50,0.07)] lg:grid-cols-2">
            <div className="relative min-h-[280px] overflow-hidden lg:min-h-[440px]">
              <img
                src={featuredBlog.image}
                alt={featuredBlog.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute left-6 top-6 rounded-full bg-[#E8D5A3] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#101D32]">
                Editor's Pick
              </div>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-11">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#A77B35]">
                {featuredBlog.category}
              </span>

              <h3 className="mt-4 text-2xl font-bold leading-snug text-[#101D32] sm:text-4xl">
                {featuredBlog.title}
              </h3>

              <p className="mt-5 leading-8 text-gray-600">
                {featuredBlog.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  {featuredBlog.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock3 size={16} />
                  {featuredBlog.readTime}
                </span>
              </div>

              <button
                onClick={() => setSelectedBlog(featuredBlog)}
                className="mt-8 inline-flex w-fit items-center gap-3 rounded-xl bg-[#101D32] px-6 py-3.5 font-semibold text-white transition hover:bg-[#B88A3B]"
              >
                Read Article
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* BLOG LIST */}
      <section
        id="blog-list"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A77B35]">
              Explore & Learn
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#101D32] sm:text-4xl">
              Latest Articles
            </h2>
            <p className="mt-3 text-gray-600">
              Knowledge and insights for a smarter industrial future.
            </p>
          </div>

          <div className="relative w-full md:max-w-xs">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#B88A3B] focus:ring-2 focus:ring-[#B88A3B]/10"
            />
          </div>
        </div>

        {/* CATEGORY FILTERS */}
        <div className="mt-9 flex gap-2 overflow-x-auto pb-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-[#101D32] text-white shadow-lg"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-[#B88A3B] hover:text-[#101D32]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ARTICLE CARDS */}
        {filteredBlogs.length > 0 ? (
          <div className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => {
              const CategoryIcon =
                categoryIcons[blog.category] || BookOpen;

              return (
                <article
                  key={blog.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_8px_30px_rgba(16,29,50,0.04)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(16,29,50,0.11)]"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-2 text-xs font-bold text-[#101D32] shadow">
                      {blog.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        {blog.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock3 size={14} />
                        {blog.readTime}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold leading-snug text-[#101D32] transition group-hover:text-[#A77B35]">
                      {blog.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-7 text-gray-600">
                      {blog.excerpt}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                      <span className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                        <CategoryIcon size={15} />
                        STPS Insights
                      </span>

                      <button
                        onClick={() => setSelectedBlog(blog)}
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#A77B35] transition hover:gap-3"
                      >
                        Read Article
                        <ChevronRight size={17} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <Search size={32} className="mx-auto text-gray-400" />
            <h3 className="mt-4 text-lg font-bold text-[#101D32]">
              No articles found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Try another search term or choose a different category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-5 font-semibold text-[#A77B35]"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-[#101D32] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8D5A3]">
              Susheen Techno Power Systems
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Looking for the right electrical solution?
            </h2>
            <p className="mt-4 leading-7 text-white/65">
              Talk to our team about your industrial electrical,
              power distribution and automation requirements.
            </p>
          </div>

          <button
            onClick={() => navigate("/contact")}
            className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-[#E8D5A3] px-7 py-4 font-bold text-[#101D32] transition hover:bg-white"
          >
            Get in Touch
            <ArrowRight size={19} />
          </button>
        </div>
      </section>
    </main>
  );
}
