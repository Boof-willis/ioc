import React from "react";

interface Testimonial {
  text: string;
  name: string;
  role: string;
  initials: string;
  color: string;
}

const avatarColors = [
  "bg-blue-600",
  "bg-teal-600",
  "bg-emerald-600",
  "bg-rose-500",
  "bg-indigo-600",
  "bg-amber-600",
  "bg-cyan-600",
  "bg-violet-600",
  "bg-pink-500",
  "bg-sky-600",
  "bg-orange-500",
  "bg-lime-600",
  "bg-fuchsia-600",
  "bg-slate-600",
  "bg-red-500",
];

const testimonials1: Testimonial[] = [
  {
    text: "I walked into IOC with a knee injury and had imaging done almost immediately. The team explained what they were seeing, answered my questions, and had a clear plan in place the same day.",
    name: "Mike R.",
    role: "Patient",
    initials: "MR",
    color: avatarColors[0],
  },
  {
    text: "IOC made a stressful injury much easier to deal with. The staff took time to explain everything in plain language and never made me feel rushed.",
    name: "Emily K.",
    role: "Patient",
    initials: "EK",
    color: avatarColors[3],
  },
  {
    text: "I went to IOC first after an injury and they quickly confirmed what was going on. They coordinated next-day surgical care seamlessly and handled everything, which made the process far less overwhelming.",
    name: "Tom B.",
    role: "Patient",
    initials: "TB",
    color: avatarColors[6],
  },
  {
    text: "My son hurt himself playing football and we weren't sure where to go. IOC got him in right away, did imaging on the spot, and explained the injury clearly to both of us. As a parent, that meant everything.",
    name: "Brian T.",
    role: "Patient",
    initials: "BT",
    color: avatarColors[7],
  },
];

const testimonials2: Testimonial[] = [
  {
    text: "I came in with a shoulder injury expecting referrals and delays. Instead, I left the same visit with answers and a clear next step.",
    name: "Jason M.",
    role: "Patient",
    initials: "JM",
    color: avatarColors[2],
  },
  {
    text: "From check-in to diagnosis, everything ran smoothly. You can tell this team specializes in orthopedic injuries.",
    name: "Lauren S.",
    role: "Patient",
    initials: "LS",
    color: avatarColors[5],
  },
  {
    text: "I've been dealing with a chronic overuse injury and was told it could take months to see a specialist. IOC got me answers the same day and helped me understand my options without the long wait.",
    name: "Melissa H.",
    role: "Patient",
    initials: "MH",
    color: avatarColors[8],
  },
];

const testimonials3: Testimonial[] = [
  {
    text: "Professional, efficient, and genuinely kind.",
    name: "Sarah L.",
    role: "Patient",
    initials: "SL",
    color: avatarColors[1],
  },
  {
    text: "Fast answers without cutting corners. That's rare.",
    name: "David P.",
    role: "Patient",
    initials: "DP",
    color: avatarColors[4],
  },
  {
    text: "IOC was my first stop after getting hurt and it saved me weeks of waiting.",
    name: "Amanda W.",
    role: "Patient",
    initials: "AW",
    color: avatarColors[9],
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialsColumn({
  testimonials,
  duration = 25,
  className = "",
}: {
  testimonials: Testimonial[];
  duration?: number;
  className?: string;
}) {
  const animationStyle = {
    "--scroll-duration": `${duration}s`,
  } as React.CSSProperties;

  return (
    <div
      className={`overflow-hidden px-2 -mx-2 ${className}`}
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 85%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 85%, transparent 100%)",
      }}
    >
      <div
        className="flex flex-col gap-6 pb-6 px-1 animate-scroll-up"
        style={animationStyle}
      >
        {[0, 1].map((copyIndex) => (
          <React.Fragment key={copyIndex}>
            {testimonials.map((t, i) => (
              <div
                key={`${copyIndex}-${i}`}
                className="p-7 rounded-2xl border border-slate-100 bg-white shadow-md shadow-slate-200/60 w-full"
              >
                <StarRating />
                <p className="text-gray-700 text-[15px] leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-[10px] tracking-wide">{t.initials}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 text-sm leading-5 tracking-tight">
                      {t.name}
                    </span>
                    <span className="text-slate-400 text-xs leading-5 tracking-tight">
                      {t.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsColumns() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4 leading-[0.95]">
            Care that puts <span className="text-blue-600">you first.</span>
          </h2>
          <p className="text-lg text-slate-500">
            Hear from real patients who chose IOC over the ER.
          </p>
        </div>

        {/* Full-Width 3-Column Scrolling Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[620px]">
          <TestimonialsColumn
            testimonials={testimonials2}
            duration={24}
          />
          <TestimonialsColumn
            testimonials={testimonials1}
            duration={30}
            className="hidden md:block"
          />
          <TestimonialsColumn
            testimonials={testimonials3}
            duration={28}
            className="hidden lg:block"
          />
        </div>

        {/* CTA Banner — Solid dark with blended right image */}
        <div className="mt-16 rounded-3xl overflow-hidden shadow-2xl relative bg-slate-900">
          {/* Subtle blue glow to keep brand presence */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

          {/* Right image positioned absolutely behind everything */}
          <div className="absolute inset-0 hidden md:block">
            <img
              src="/images/orthopedic-surgeon-arms-crossed.webp"
              alt="Orthopedic surgeon in white coat at Instant Orthopedic Care in Draper, Utah"
              className="object-contain object-right absolute right-0 top-0"
              style={{
                height: "130%",
                maskImage: "linear-gradient(to right, transparent 0%, black 40%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 40%)",
              }}
            />
            {/* Dark overlay: transparent on right, solid dark on left */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to right, #0f172a 0%, rgba(15,23,42,0.95) 40%, rgba(15,23,42,0.6) 65%, rgba(15,23,42,0.1) 85%, transparent 100%)",
              }}
            ></div>
          </div>

          {/* Content layer */}
          <div className="relative z-10 p-8 lg:px-12 lg:py-12 flex flex-col md:flex-row items-center md:items-start gap-8 min-h-[220px]">
            <div className="flex-1 flex flex-col justify-center max-w-lg">
              <h3 className="text-3xl font-bold text-white tracking-tight mb-2">
                Ready to prioritize your recovery?
              </h3>
              <p className="text-white/80 text-base font-medium mb-6">
                Join over 5,000 patients trusting IOC.
              </p>
              <div>
                <a
                  href="https://pp-wfe-101.advancedmd.com/163338/onlineintake/demographic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-xs uppercase tracking-widest hover:bg-blue-500 transition-all gap-3 shadow-lg shadow-blue-500/25 border border-blue-500/50"
                >
                  Book Online
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            {/* Spacer to keep text on the left half */}
            <div className="hidden md:block flex-1"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-scroll-up {
          animation: scroll-up var(--scroll-duration, 25s) linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
        }
      `}</style>
    </section>
  );
}
