import { MessageCircle } from "lucide-react";
import { condominiumData } from "@/lib/data";

export default function Units() {
  const { units } = condominiumData.main;
  const { contact } = condominiumData;
  const whatsappUrl = `https://wa.me/${contact.main.phone}?text=${encodeURIComponent(contact.main.defaultMessage)}`;

  return (
    <section id="plantas" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary" style={{ fontFamily: "var(--font-display)" }}>
            Plantas
          </h2>
          <p className="text-lg text-foreground/70">Escolha o seu espaço perfeito</p>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {units.map((unit) => (
            <div key={unit.id} className="bg-gradient-to-br from-blue-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-blue-100">
              {/* Unit Image */}
              <div className="relative h-64 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary/30 mb-2">{unit.bedrooms}</div>
                  <p className="text-primary/50 font-semibold">Quartos</p>
                </div>
              </div>

              {/* Unit Info */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">{unit.name}</h3>
                
                {/* Details */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-between pb-3 border-b border-blue-100">
                    <span className="text-foreground/70">Área</span>
                    <span className="font-bold text-primary">{unit.area}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-blue-100">
                    <span className="text-foreground/70">Banheiros</span>
                    <span className="font-bold text-primary">{unit.bathrooms}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/70">Valor</span>
                    <span className="font-bold text-primary">{unit.price}</span>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-all"
                >
                  <MessageCircle size={20} />
                  Solicitar Simulação
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
