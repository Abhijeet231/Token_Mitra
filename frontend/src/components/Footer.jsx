import { Activity, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => (
  <footer className="bg-slate-950 text-slate-400 py-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-900/30">
              <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">
              Token<span className="text-amber-400">Mitra</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-500 max-w-xs mb-5">
            The modern queue management and appointment automation platform for
            Indian healthcare.
          </p>
          <div className="flex items-center gap-3">
            {[Twitter, Linkedin, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/50 flex items-center justify-center hover:border-amber-500/40 hover:text-amber-400 transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">
            Product
          </p>
          <ul className="space-y-2.5">
            {["Features", "How It Works", "Pricing", "Changelog"].map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="text-sm hover:text-amber-400 transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">
            Company
          </p>
          <ul className="space-y-2.5">
            {["About", "Blog", "Privacy Policy", "Terms of Service"].map(
              (l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm hover:text-amber-400 transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <p>© {new Date().getFullYear()} TokenMitra. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
          All systems operational
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;