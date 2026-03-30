export default function Hero() {
  const whatsappNumber = "5511999522665"; 
  const whatsappMessage = "Olá! Gostaria de solicitar um orçamento para uma joia exclusiva.";

  return (
    <section id="inicio" className="relative h-[85vh] flex items-center justify-center bg-zinc-950 overflow-hidden">
      {/* Imagem de fundo com zoom lento no hover */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 transition-transform duration-[10000ms] ease-out group hover:scale-105"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2000')" }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-zinc-950/70 via-zinc-950/90 to-zinc-950" />
      
      <div className="relative z-20 text-center px-4 max-w-5xl mt-10">
        {/* Título mais claro sobre a identidade da empresa */}
        <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 leading-tight drop-shadow-xl">
          Joalheria Exclusiva. <br />
          <span className="bg-clip-text bg-gradient-to-r from-[#E0C097] via-[#B79261] to-[#E0C097] text-transparent italic">
            Para Toda São Paulo
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-200 mb-12 font-light tracking-wide max-w-3xl mx-auto">
          Eternizando seus momentos mais preciosos com o verdadeiro brilho do ouro e pedras preciosas. Peças autorais e sob encomenda para você, em qualquer lugar de SP.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          {/* Botão de conversão com efeito shimmer */}
          <a 
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden bg-[#D4AF37] text-zinc-950 px-12 py-5 uppercase tracking-widest text-sm font-bold shadow-[0_4px_30px_rgba(212,175,55,0.2)] transition-all duration-300 hover:bg-[#B8860B] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] hover:-translate-y-1 group"
          >
            <span className="relative z-10">Solicitar Orçamento via WhatsApp</span>
            <span className="absolute inset-0 block w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
          </a>
          <a 
            href="#colecoes"
            className="text-zinc-400 hover:text-white transition-colors duration-300 border-b border-zinc-700 hover:border-[#D4AF37]"
          >
            Descobrir Coleção
          </a>
        </div>
        <p className="text-xs text-zinc-600 mt-6 uppercase tracking-widest">Atendemos via Direct & WhatsApp</p>
      </div>
    </section>
  );
}