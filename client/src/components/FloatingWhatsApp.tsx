import { MessageCircle } from "lucide-react";
import { condominiumData } from "@/lib/data";

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${condominiumData.contact.main.phone}?text=${encodeURIComponent(
    "Olá Renato! Vim pelo site do Alto Sobradinho e quero receber uma simulação."
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chamar Renato Landim no WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full bg-[#1f9d55] px-5 py-4 font-extrabold text-white shadow-2xl transition hover:-translate-y-1 hover:bg-[#18864a] active:scale-95"
    >
      <MessageCircle size={22} />
      <span className="hidden sm:inline">Simular pelo WhatsApp</span>
    </a>
  );
}
