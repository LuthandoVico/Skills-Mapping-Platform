import Link from "next/link";

const footerLinks = {
  Platform: [
    { label: "Browse Sectors", href: "/sectors" },
    { label: "Occupations", href: "/occupations" },
    { label: "Skills Registry", href: "/skills" },
    { label: "Career Pathways", href: "/pathways" },
  ],
  Resources: [
    { label: "About", href: "/about" },
    { label: "API Documentation", href: "/docs/api" },
    { label: "Help & Support", href: "/help" },
    { label: "Contact", href: "/contact" },
  ],
  Account: [
    { label: "Log In", href: "/login" },
    { label: "Register", href: "/register" },
    { label: "Expert Portal", href: "/expert/dashboard" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1d3557] text-white mt-auto">
      <div className="max-w-[1400px] mx-auto px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#d4af37] flex items-center justify-center text-[#1d3557] font-extrabold text-sm">
                NS
              </div>
              <span className="font-bold text-[15px] tracking-tight">
                National Skills{" "}
                <span className="text-[#d4af37]">Registry</span>
              </span>
            </div>
            <p className="text-white/50 text-[13px] leading-[20px] max-w-[220px]">
              The authoritative national taxonomy of occupational competencies
              and skills.
            </p>
            <p className="text-white/30 text-[11px] mt-4 uppercase tracking-[0.5px]">
              v4.2 Editorial Draft
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.5px] text-white/40 mb-4">
                {section}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white text-[13px] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider + copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-[12px]">
            © {new Date().getFullYear()} National Skills Registry. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-white/30 hover:text-white/60 text-[12px] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/30 hover:text-white/60 text-[12px] transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
