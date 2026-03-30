import { Menu } from 'lucide-react';
// Certifique-se de que o nome do arquivo da logo é Logo.png na pasta assets
import LogoImg from '../assets/Logo.jpg'; 

export default function Navbar() {
  const links = [ 'Início', 'Coleções', 'Sobre', 'Contato' ];

  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-zinc-950 border-b border-zinc-900 sticky top-0 z-50">
      {/* Bloco da Logo com animação suave de pulso */}
      <div className="flex items-center space-x-3 group">
        <img 
          src={LogoImg} 
          alt="apJoias" 
          className="h-14 w-auto object-contain transition-all duration-300 group-hover:scale-110" 
        />
      </div>
      
      {/* Links de navegação centralizados e com efeito dourado */}
      <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest text-zinc-400">
        {links.map((item) => (
          <a 
            key={item}
            href={`#${item.toLowerCase().replace('ç', 'c').replace('õ', 'o')}`} 
            className="relative hover:text-white transition-colors duration-300 group py-1"
          >
            {item}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </div>

      <div className="flex items-center space-x-5 text-white">
        {/* Botão de ação direto para o WhatsApp na Navbar */}
        <a 
          href="#contato"
          className="hidden md:block relative overflow-hidden bg-[#D4AF37] text-zinc-950 px-6 py-2.5 text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:bg-[#B8860B] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 group"
        >
          <span className="relative z-10">Orçamentos</span>
          {/* Efeito shimmer (brilho) no hover */}
          <span className="absolute inset-0 block w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
        </a>
        <button className="md:hidden hover:text-[#D4AF37] transition-colors duration-300">
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
}