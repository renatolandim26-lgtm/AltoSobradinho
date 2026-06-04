export default function Introduction() {
  return (
    <section id="sobre" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-primary" style={{ fontFamily: "var(--font-display)" }}>
            Qualidade de Vida
          </h2>
          
          <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
            O primeiro complexo de condomínios verticais de Sobradinho oferece tudo o que você precisa para uma vida melhor: segurança, lazer e localização privilegiada.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">12 min</div>
              <p className="text-foreground/70 font-semibold">Do Plano Piloto</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">24h</div>
              <p className="text-foreground/70 font-semibold">Segurança</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">8+</div>
              <p className="text-foreground/70 font-semibold">Áreas de Lazer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
