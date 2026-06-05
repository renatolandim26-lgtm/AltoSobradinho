import { MessageCircle, Phone, ShieldCheck } from "lucide-react";
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
    firstName: "",
    email: "",
    phone: "",
    interest: "morar",
    unit: "2-ou-3-quartos",
    purchaseTime: "ate-6-meses"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.phone) {
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
        const message = `Olá Renato! Meu nome é ${formData.firstName}. Vim pelo site do Alto Sobradinho. Tenho interesse em ${formData.unit.replaceAll("-", " ")}, objetivo: ${formData.interest}, prazo: ${formData.purchaseTime.replaceAll("-", " ")}.`;

        setTimeout(() => {
          window.open(`https://wa.me/${contact.main.phone}?text=${encodeURIComponent(message)}`, "_blank");
        }, 900);

        setFormData({
          firstName: "",
          email: "",
          phone: "",
          interest: "morar",
          unit: "2-ou-3-quartos",
          purchaseTime: "ate-6-meses"
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

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="rounded-3xl border border-blue-100 bg-white p-8 text-center shadow-lg">
              <div className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-primary/5 ring-8 ring-blue-50">
                {consultant.image ? (
                  <img src={consultant.image} alt={consultant.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Phone size={48} className="text-primary/50" />
                  </div>
                )}
              </div>

              <h3 className="mb-2 text-2xl font-bold text-primary">{consultant.name}</h3>
              <p className="mb-6 font-semibold text-foreground/70">{consultant.role}</p>

              <div className="mb-7 rounded-2xl bg-blue-50 p-5 text-left">
                <div className="mb-3 flex items-center gap-2 text-primary">
                  <ShieldCheck size={20} />
                  <span className="font-extrabold">Atendimento sem compromisso</span>
                </div>
                <p className="text-sm leading-relaxed text-foreground/70">
                  Você fala direto comigo para entender plantas, disponibilidade, entrada facilitada e o melhor caminho para comprar com segurança.
                </p>
              </div>

              <div className="grid gap-3">
                <a
                  href={`https://wa.me/${consultant.phone}?text=${encodeURIComponent(consultant.defaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1f9d55] py-4 font-extrabold text-white transition hover:bg-[#18864a] active:scale-95"
                >
                  <MessageCircle size={20} />
                  Chamar no WhatsApp
                </a>

                <a
                  href={`tel:${consultant.phone}`}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-primary/20 bg-white py-4 font-extrabold text-primary transition hover:bg-blue-50 active:scale-95"
                >
                  <Phone size={20} />
                  Ligar agora
                </a>
              </div>
            </aside>

            <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg md:p-8">
              <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary">Nome *</label>
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
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

                <div className="space-y-2 md:col-span-2">
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

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary">Interesse</label>
                  <Select value={formData.interest} onValueChange={(value) => setFormData({ ...formData, interest: value })}>
                    <SelectTrigger className="h-12 rounded-xl border-2 border-blue-100 focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morar">Morar</SelectItem>
                      <SelectItem value="investir">Investir</SelectItem>
                      <SelectItem value="ambos">Morar e investir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary">Planta desejada</label>
                  <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                    <SelectTrigger className="h-12 rounded-xl border-2 border-blue-100 focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2-ou-3-quartos">Ainda estou decidindo</SelectItem>
                      <SelectItem value="2-quartos-com-suite">2 quartos com suíte</SelectItem>
                      <SelectItem value="3-quartos-com-suite">3 quartos com suíte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-primary">Prazo para comprar</label>
                  <Select value={formData.purchaseTime} onValueChange={(value) => setFormData({ ...formData, purchaseTime: value })}>
                    <SelectTrigger className="h-12 rounded-xl border-2 border-blue-100 focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ate-3-meses">Até 3 meses</SelectItem>
                      <SelectItem value="ate-6-meses">Até 6 meses</SelectItem>
                      <SelectItem value="mais-de-6-meses">Mais de 6 meses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Ao enviar, você concorda com nossa{" "}
                    <button
                      type="button"
                      onClick={() => setIsPolicyModalOpen(true)}
                      className="font-semibold text-primary underline hover:text-primary/80"
                    >
                      Política de Privacidade
                    </button>{" "}
                    e autoriza o contato para atendimento imobiliário personalizado.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 rounded-full bg-primary font-extrabold text-white transition-all hover:bg-primary/90 md:col-span-2"
                >
                  {isSubmitting ? "Enviando..." : "Quero minha simulação gratuita"}
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
