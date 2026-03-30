import { MessageCircle, Mail } from 'lucide-react';

export default function Contact() {
  const whatsappNumber = "5511999522665"; 
  const whatsappNumberFormatted = "(11) 99952-2665";
  const whatsappMessage = "Olá! Gostaria de solicitar um orçamento para uma joia exclusiva.";
  const instagramHandle = "@_apjoias_";

  return (
    <section id="contato" className="py-32 px-8 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-[#D4AF37] uppercase tracking-widest text-sm mb-3">Atendimento Exclusivo</p>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Orçamentos & Encomendas</h2>
        <p className="text-zinc-300 mb-20 max-w-2xl mx-auto font-light text-xl">
          Nossas peças são únicas e o nosso atendimento também. Escolha como prefere falar diretamente com nosso consultor para encomendar sua joia sob medida para <strong className="text-white">toda São Paulo</strong>.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Card WhatsApp - CTA Principal */}
          <div className="bg-zinc-900 border border-zinc-800 p-10 flex flex-col items-center group transition-all duration-300 hover:border-[#D4AF37]/50 hover:-translate-y-1 hover:shadow-[0_15px_60px_-15px_rgba(212,175,55,0.2)]">
            <MessageCircle size={48} strokeWidth={1} className="text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-serif text-white mb-4">Fale no WhatsApp</h3>
            <p className="text-zinc-400 mb-4 text-center">Inicie uma conversa direta para um orçamento consultivo e personalizado.</p>
            <p className="text-[#D4AF37] font-mono text-xl mb-10 tracking-wider">{whatsappNumberFormatted}</p>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#D4AF37] text-zinc-950 px-8 py-4 uppercase tracking-widest text-sm font-bold transition-all duration-300 hover:bg-[#B8860B]"
            >
              Conversar no WhatsApp
            </a>
          </div>

          {/* Card Instagram - CTA Direct */}
          <div className="bg-zinc-900 border border-zinc-800 p-10 flex flex-col items-center group transition-all duration-300 hover:border-[#D4AF37]/50 hover:-translate-y-1 hover:shadow-[0_15px_60px_-15px_rgba(212,175,55,0.2)]">
            {/* SVG do Instagram embutido diretamente aqui */}
            <div className="text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </div>
            <h3 className="text-2xl font-serif text-white mb-4">Chame no Direct</h3>
            <p className="text-zinc-400 mb-4 text-center">Envie uma mensagem privada no nosso Instagram oficial.</p>
            <p className="text-[#D4AF37] font-sans text-xl mb-10 tracking-wider">{instagramHandle}</p>
            <a 
              href="https://www.instagram.com/_apjoias_/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border border-[#D4AF37] text-[#D4AF37] px-8 py-4 uppercase tracking-widest text-sm font-bold transition-all duration-300 hover:bg-[#D4AF37]/10"
            >
              Mandar Direct no Instagram
            </a>
          </div>
        </div>
        
        {/* Opção secundária via e-mail */}
        <div className="mt-20 text-zinc-600 flex flex-col items-center gap-2 border-t border-zinc-800 pt-12 max-w-xl mx-auto">
          <Mail size={16} />
          <p className="text-xs uppercase tracking-widest mb-2">Se preferir, envie um e-mail</p>
          <a href="mailto:contato@apjoias.com" className="text-zinc-400 hover:text-[#D4AF37] transition-colors">contato@apjoias.com</a>
        </div>
      </div>
    </section>
  );
}