import { MessageCircle, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const whatsappNumber = "5511999999999"; 
  const whatsappMessage = "Olá! Gostaria de solicitar um orçamento para uma joia exclusiva.";

  return (
    <footer className="bg-zinc-950 py-20 px-8 border-t border-zinc-800/50">
      {/* Container Principal em Grade (Grid) */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 text-center md:text-left">
        
        {/* Coluna 1: Logo, Missão e Área */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="text-xl font-serif font-bold text-white tracking-wider">
            ap<span className="text-[#D4AF37]">Joias</span>
          </div>
          <p className="text-sm text-zinc-400 max-w-xs font-light tracking-wide drop-shadow-sm">
            Exclusividade e elegância em cada detalhe. Servindo toda a região de São Paulo com joias autorais e sob encomenda.
          </p>
          <div className="text-zinc-500 text-xs flex items-center gap-2 mt-2">
            <MapPin size={14} className="text-[#D4AF37]" />
            Atendimento em Toda SP
          </div>
        </div>

        {/* Coluna 2: Atendimento/Encomendas (WhatsApp & Instagram Direct) */}
        <div className="flex flex-col gap-6 items-center md:items-start">
          <h4 className="text-lg font-serif text-[#D4AF37] font-medium tracking-wide">Pedidos & Consultas</h4>
          <p className="text-sm text-zinc-400 font-light max-w-xs md:max-w-none">
            Realize seu orçamento exclusivamente via WhatsApp ou Direct do Instagram.
          </p>
          <div className="flex flex-col gap-4 w-full max-w-xs md:max-w-none md:flex-row md:items-center">
            {/* Botão WhatsApp Minimal Gold */}
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-[#D4AF37] text-[#D4AF37] py-2.5 px-6 text-xs uppercase tracking-widest font-bold hover:bg-[#D4AF37] hover:text-zinc-950 transition-all duration-300 shadow-[0_4px_10px_rgba(212,175,55,0.1)] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              <MessageCircle size={16} />
              Solicitar WhatsApp
            </a>
            
            {/* Link minimalista para Instagram Direct */}
            <a 
              href="#" // Substitua pelo link real do Direct ou perfil
              className="text-white hover:text-[#D4AF37] transition-colors duration-300 text-sm font-sans flex items-center justify-center md:justify-start gap-2"
            >
              <InstagramIcon size={16} />
              @_apjoias_ (Direct)
            </a>
          </div>
        </div>

        {/* Coluna 3: Navegação Minimalista */}
        <div className="flex flex-col gap-6 items-center md:items-start md:w-32">
          <h4 className="text-lg font-serif text-[#D4AF37] font-medium tracking-wide">Explorar</h4>
          <nav className="flex flex-col gap-3.5 text-sm text-zinc-200 font-light">
            <a href="#inicio" className="hover:text-[#D4AF37] transition-colors duration-300">Início</a>
            <a href="#colecoes" className="hover:text-[#D4AF37] transition-colors duration-300">Coleções</a>
            <a href="#sobre" className="hover:text-[#D4AF37] transition-colors duration-300">Sobre Nós</a>
            <a href="#contato" className="hover:text-[#D4AF37] transition-colors duration-300">Fale Conosco</a>
          </nav>
        </div>
        
      </div>

      {/* Barra Inferior: Ícones e Copyright com muito espaçamento */}
      <div className="max-w-7xl mx-auto border-t border-zinc-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div className="flex space-x-7 text-zinc-600">
          {/* Ícone Minimalista Instagram */}
          <a href="#" className="hover:text-[#D4AF37] transition-colors duration-300 hover:scale-110" aria-label="Instagram">
            <InstagramSvg size={20} strokeWidth={1.5} />
          </a>
          {/* Ícone Minimalista Email */}
          <a href="mailto:contato@apjoias.com" className="hover:text-[#D4AF37] transition-colors duration-300 hover:scale-110" aria-label="E-mail">
            <Mail size={20} strokeWidth={1.5} />
          </a>
        </div>
        <div className="text-xs text-zinc-500 font-light max-w-xs md:max-w-none leading-relaxed">
          apJoias | Joalheria de Luxo em São Paulo. Atendimento Consultivo. <br />
          &copy; {new Date().getFullYear()} apJoias. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

// Componentes SVG Minimalistas definidos localmente para limpeza
const InstagramIcon = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const InstagramSvg = ({ size, strokeWidth }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);