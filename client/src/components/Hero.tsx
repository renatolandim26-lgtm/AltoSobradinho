import { MessageCircle } from "lucide-react";
import { condominiumData } from "@/lib/data";

export default function Hero() {
  const { contact, main } = condominiumData;
  const whatsappUrl = `https://wa.me/${contact.main.phone}?text=${encodeURIComponent(contact.main.defaultMessage)}`;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 to-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/1000053037.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white max-w-4xl">
        {/* Logo/Brand */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-blue-100">Riva Incorporadora</p>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
          {main.tagline}
        </h1>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl mb-8 text-gray-100 drop-shadow-md font-semibold">
          {main.description}
        </p>

        {/* Benefits Bar */}
        <div className="bg-primary/90 backdrop-blur-sm rounded-full px-6 py-4 mb-12 inline-flex items-center gap-8 text-white text-sm sm:text-base font-semibold flex-wrap justify-center">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏊</span>
            <span>Lazer de Resort</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 border-l border-white/30 pl-8">
            <span className="text-lg">📍</span>
            <span>15 Min do Plano Piloto</span>
          </div>
          <div className="hidden md:flex items-center gap-2 border-l border-white/30 pl-8">
            <span className="text-lg">💰</span>
            <span>Entrada Facilitada</span>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          <MessageCircle size={24} />
          <span>Saiba Mais</span>
        </a>
      </div>
    </section>
  );
}
