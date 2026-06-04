import { MapPin, Home, Bed } from "lucide-react";
import { condominiumData } from "@/lib/data";

export default function OtherDevelopments() {
  return (
    <section id="empreendimentos" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary" style={{ fontFamily: "var(--font-display)" }}>
            Empreendimentos em Todo o DF
          </h2>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Além do <strong>Alto Sobradinho</strong>, contamos com uma ampla carteira de empreendimentos prontos e na planta em diversas regiões administrativas de Brasília.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-semibold text-primary/80">
              <div className="bg-slate-50 p-3 rounded-lg">Samambaia</div>
              <div className="bg-slate-50 p-3 rounded-lg">Ceilândia</div>
              <div className="bg-slate-50 p-3 rounded-lg">Gama</div>
              <div className="bg-slate-50 p-3 rounded-lg">Santa Maria</div>
              <div className="bg-slate-50 p-3 rounded-lg">Taguatinga</div>
              <div className="bg-slate-50 p-3 rounded-lg">Guará</div>
              <div className="bg-slate-50 p-3 rounded-lg">Planaltina</div>
              <div className="bg-slate-50 p-3 rounded-lg">E muito mais...</div>
            </div>
            <p className="mt-8 text-primary font-bold">
              Consulte a disponibilidade e encontre o imóvel ideal para você e sua família.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
