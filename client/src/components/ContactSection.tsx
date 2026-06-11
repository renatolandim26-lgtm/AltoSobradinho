import { MessageCircle, Phone, Award, Handshake, Key } from "lucide-react";
import { useState } from "react";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { condominiumData } from "@/lib/data";

export default function ContactSection() {
  const { contact } = condominiumData;
  const consultant = contact.consultants[0];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "morar",
    timeline: "imediato",
    plan: "2quartos",
    downPayment: "25k"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Preencha nome, e-mail e WhatsApp para receber o atendimento.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mojyejbd", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          empreendimento: "Alto Sobradinho",
          origem: "Site Alto Sobradinho"
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        toast.success("Cadastro realizado. Vou te chamar no WhatsApp.");
        const message = `Olá Renato! Meu nome é ${formData.name}. Vim pelo site do Alto Sobradinho. Tenho interesse na planta: ${formData.plan}, objetivo: ${formData.interest}, prazo: ${formData.timeline}, entrada/FGTS: ${formData.downPayment}.`;

        setTimeout(() => {
          window.open(`https://wa.me/${contact.main.phone}?text=${encodeURIComponent(message)}`, "_blank");
        }, 900);

        setFormData({
          name: "",
          email: "",
          phone: "",
          interest: "morar",
          timeline: "imediato",
          plan: "2quartos",
          downPayment: "25k"
        });
      } else {
        toast.error("Não foi possível enviar agora. Tente pelo botão de WhatsApp.");
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro de conexão. Tente pelo botão de WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-primary/60">Atendimento direto</p>
            <h2 className="mb-4 text-4xl font-bold text-primary md:text-5xl">Receba uma simulação gratuita</h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-foreground/70">
              Preencha seus dados para receber condições, disponibilidade e orientação de compra do Alto Sobradinho.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] items-start">
            {/* Digital Business Card Style */}
            <aside className="relative overflow-hidden rounded-[2rem] bg-white shadow-2xl border border-slate-100">
              {/* Card Header/Background */}
              <div className="h-32 bg-gradient-to-r from-slate-50 to-blue-50 flex items-center justify-end px-8">
                <img src="/images/logo-riva-final.png" alt="Riva Incorporadora" className="h-10 opacity-80" />
              </div>

              <div className="px-8 pb-8 -mt-16 text-center">
                {/* Profile Image with Border */}
                <div className="mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-xl ring-1 ring-slate-200">
                  <img 
                    src={consultant.image} 
                    alt={consultant.name} 
                    className="h-full w-full object-cover scale-110" 
                  />
                </div>

                {/* Name and Title */}
                <h3 className="text-4xl font-serif font-bold text-[#0a1d37] tracking-tight mb-1">
                  {consultant.name}
                </h3>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 mb-8">
                  {consultant.role}
                </p>

                {/* Main Action Button */}
                <a
                  href={`https://wa.me/${consultant.phone}?text=${encodeURIComponent(consultant.defaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white border-2 border-slate-100 py-5 px-6 shadow-sm transition-all hover:shadow-md hover:border-green-100 active:scale-95"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white">
                    <MessageCircle size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold uppercase text-slate-400 leading-none mb-1">Fale comigo no</p>
                    <p className="text-xl font-bold text-slate-800 leading-none">WhatsApp</p>
                  </div>
                </a>
              </div>

              {/* Bottom Info Bar */}
              <div className="bg-[#0a1d37] p-6 text-white">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <Award size={20} className="text-blue-200" />
                    <p className="text-[10px] font-bold uppercase leading-tight tracking-wider opacity-90">Especialista em Imóveis</p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2 border-x border-white/10">
                    <Handshake size={20} className="text-blue-200" />
                    <p className="text-[10px] font-bold uppercase leading-tight tracking-wider opacity-90">Atendimento Personalizado</p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <Key size={20} className="text-blue-200" />
                    <p className="text-[10px] font-bold uppercase leading-tight tracking-wider opacity-90">As Melhores Oportunidades</p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Form Section */}
            <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg md:p-8">
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary">Nome *</label>
                    <Input
                      type="text"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12 rounded-xl border-2 border-blue-100 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary">WhatsApp *</label>
                    <Input
                      type="tel"
                      placeholder="(61) 9 9999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="h-12 rounded-xl border-2 border-blue-100 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary">E-mail *</label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12 rounded-xl border-2 border-blue-100 focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary">Objetivo</label>
                    <Select value={formData.interest} onValueChange={(value) => setFormData({ ...formData, interest: value })}>
                      <SelectTrigger className="h-12 rounded-xl border-2 border-blue-100 focus:border-primary">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morar">Para Morar</SelectItem>
                        <SelectItem value="investir">Para Investir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary">Prazo para compra</label>
                    <Select value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                      <SelectTrigger className="h-12 rounded-xl border-2 border-blue-100 focus:border-primary">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="imediato">Imediato</SelectItem>
                        <SelectItem value="3meses">Até 3 meses</SelectItem>
                        <SelectItem value="6meses">Até 6 meses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary">Planta de interesse</label>
                    <Select value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value })}>
                      <SelectTrigger className="h-12 rounded-xl border-2 border-blue-100 focus:border-primary">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2quartos">2 Quartos</SelectItem>
                        <SelectItem value="3quartos">3 Quartos</SelectItem>
                        <SelectItem value="cobertura">Cobertura</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary">Entrada ou FGTS</label>
                    <Select value={formData.downPayment} onValueChange={(value) => setFormData({ ...formData, downPayment: value })}>
                      <SelectTrigger className="h-12 rounded-xl border-2 border-blue-100 focus:border-primary">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25k">Até 25 mil</SelectItem>
                        <SelectItem value="50k">Até 50 mil</SelectItem>
                        <SelectItem value="100k">Até 100 mil</SelectItem>
                        <SelectItem value="mais100k">Mais de 100 mil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[10px] leading-relaxed text-muted-foreground">
                    Ao enviar, você concorda com nossa{" "}
                    <button
                      type="button"
                      onClick={() => setIsPolicyModalOpen(true)}
                      className="font-semibold text-primary underline hover:text-primary/80"
                    >
                      Política de Privacidade
                    </button>{" "}
                    e está ciente de que seus dados de contato serão compartilhados com o consultor Renato Landim e a imobiliária para fins de atendimento personalizado.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 rounded-full bg-primary font-extrabold text-white transition-all hover:bg-primary/90"
                >
                  {isSubmitting ? "Enviando..." : "Solicitar informações direto com consultor"}
                </Button>

                <PrivacyPolicyModal isOpen={isPolicyModalOpen} onClose={() => setIsPolicyModalOpen(false)} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
