import { Phone, MessageCircle } from "lucide-react";
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
    interest: "morar"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.email || !formData.phone) {
      toast.error("Preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/mojyejbd", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        toast.success("Cadastro realizado! Entraremos em contato.");
        setFormData({ firstName: "", email: "", phone: "", interest: "morar" });
        
        setTimeout(() => {
          const whatsappUrl = `https://wa.me/${contact.main.phone}?text=${encodeURIComponent(`Olá! Meu nome é ${formData.firstName} e gostaria de saber mais sobre o Alto Sobradinho.`)}`;
          window.open(whatsappUrl, '_blank');
        }, 1500);
      } else {
        toast.error("Erro ao enviar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro de conexão.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary" style={{ fontFamily: "var(--font-display)" }}>
              Fale Conosco
            </h2>
            <p className="text-lg text-foreground/70">Solicite sua simulação gratuita</p>
          </div>

          {/* Consultant Card + Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Consultant Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-blue-100">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 overflow-hidden">
                {consultant.image ? (
                  <img src={consultant.image} alt={consultant.name} className="w-full h-full object-cover" />
                ) : (
                  <Phone size={48} className="text-primary/50" />
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-primary mb-2">{consultant.name}</h3>
              <p className="text-foreground/70 font-semibold mb-6">{consultant.role}</p>
              
              <a
                href={`https://wa.me/${consultant.phone}?text=${encodeURIComponent(consultant.defaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold transition-all mb-4"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
              
              <a
                href={`tel:${consultant.phone}`}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-bold transition-all"
              >
                <Phone size={20} />
                Ligar
              </a>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary">Nome *</label>
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="h-12 border-2 border-blue-100 focus:border-primary rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary">E-mail *</label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12 border-2 border-blue-100 focus:border-primary rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary">WhatsApp *</label>
                  <Input
                    type="tel"
                    placeholder="(61) 9 9999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-12 border-2 border-blue-100 focus:border-primary rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary">Interesse</label>
                  <Select value={formData.interest} onValueChange={(value) => setFormData({ ...formData, interest: value })}>
                    <SelectTrigger className="h-12 border-2 border-blue-100 focus:border-primary rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morar">Morar</SelectItem>
                      <SelectItem value="investir">Investir</SelectItem>
                      <SelectItem value="ambos">Ambos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-start gap-2 py-2">
                  <p className="text-[10px] text-muted-foreground leading-tight">
                    Ao enviar, você concorda com nossa{" "}
                    <button 
                      type="button"
                      onClick={() => setIsPolicyModalOpen(true)}
                      className="text-primary underline hover:text-primary/80"
                    >
                      Política de Privacidade
                    </button>{" "}
                    e está ciente de que seus dados de contato serão compartilhados com o consultor Renato Landim e a imobiliária para fins de atendimento personalizado.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all"
                >
                  {isSubmitting ? "Enviando..." : "Solicitar informações direto com consultor"}
                </Button>

                <PrivacyPolicyModal 
                  isOpen={isPolicyModalOpen} 
                  onClose={() => setIsPolicyModalOpen(false)} 
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
