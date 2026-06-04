import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-blue-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-primary font-bold text-2xl" style={{ fontFamily: "var(--font-display)" }}>
              RIVA
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#sobre" className="text-foreground hover:text-primary font-semibold transition-colors">
              Sobre
            </a>
            <a href="#galeria" className="text-foreground hover:text-primary font-semibold transition-colors">
              Galeria
            </a>
            <a href="#plantas" className="text-foreground hover:text-primary font-semibold transition-colors">
              Plantas
            </a>
            <a href="#contato" className="text-foreground hover:text-primary font-semibold transition-colors">
              Contato
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-blue-50 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <a href="#sobre" className="block px-4 py-2 text-foreground hover:bg-blue-50 rounded-lg transition-colors font-semibold">
              Sobre
            </a>
            <a href="#galeria" className="block px-4 py-2 text-foreground hover:bg-blue-50 rounded-lg transition-colors font-semibold">
              Galeria
            </a>
            <a href="#plantas" className="block px-4 py-2 text-foreground hover:bg-blue-50 rounded-lg transition-colors font-semibold">
              Plantas
            </a>
            <a href="#contato" className="block px-4 py-2 text-foreground hover:bg-blue-50 rounded-lg transition-colors font-semibold">
              Contato
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
