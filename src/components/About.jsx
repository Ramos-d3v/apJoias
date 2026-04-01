import { Gem, Camera, Coins } from "lucide-react";

export default function About() {
  return (
    <section id="sobre" className="py-28 px-8 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-[#D4AF37] uppercase tracking-widest text-sm mb-3">
            Nossa Essência
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Uma Nova Era na Alta Joalheria
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-8"></div>
          <p className="text-zinc-400 max-w-3xl mx-auto text-lg font-light leading-relaxed">
            A <strong className="text-white font-serif">apJoias</strong> é uma joalheria nova, mas que já nasce com uma presença forte e imponente no mercado. 
            Nossa missão é materializar sonhos com um atendimento hiper-personalizado, 
            trazendo excelência artesanal, transparência e inovação para cada peça que criamos. 
            Não vendemos apenas joias; nós forjamos o seu legado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Card 1: Fabricação Sob Medida */}
          <div className="bg-zinc-900 border border-zinc-800 p-10 flex flex-col items-center text-center group transition-all duration-500 hover:border-[#D4AF37]/50 hover:-translate-y-2 hover:shadow-[0_15px_60px_-15px_rgba(212,175,55,0.15)]">
            <div className="text-[#D4AF37] mb-6 p-4 rounded-full bg-zinc-950 border border-zinc-800 group-hover:scale-110 transition-transform duration-500">
              <Gem size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-serif text-white mb-4">Fabricação Sob Medida</h3>
            <p className="text-zinc-400 font-light leading-relaxed">
              Design exclusivo e criação do zero. Você tem total liberdade para a <strong className="text-zinc-200">escolha de materiais</strong>, pedras e acabamentos. Cada joia é feita para ser única, assim como a sua história.
            </p>
          </div>

          {/* Card 2: Alianças por Foto */}
          <div className="bg-zinc-900 border border-zinc-800 p-10 flex flex-col items-center text-center group transition-all duration-500 hover:border-[#D4AF37]/50 hover:-translate-y-2 hover:shadow-[0_15px_60px_-15px_rgba(212,175,55,0.15)]">
            <div className="text-[#D4AF37] mb-6 p-4 rounded-full bg-zinc-950 border border-zinc-800 group-hover:scale-110 transition-transform duration-500">
              <Camera size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-serif text-white mb-4">Sua Aliança por Foto</h3>
            <p className="text-zinc-400 font-light leading-relaxed">
              Viu a aliança dos sonhos na internet? <strong className="text-zinc-200">Nós fabricamos qualquer modelo.</strong> Basta enviar uma foto de referência e nossos ourives reproduzem a peça com perfeição e detalhes impecáveis.
            </p>
          </div>

          {/* Card 3: Compra de Ouro */}
          <div className="bg-zinc-900 border border-zinc-800 p-10 flex flex-col items-center text-center group transition-all duration-500 hover:border-[#D4AF37]/50 hover:-translate-y-2 hover:shadow-[0_15px_60px_-15px_rgba(212,175,55,0.15)]">
            <div className="text-[#D4AF37] mb-6 p-4 rounded-full bg-zinc-950 border border-zinc-800 group-hover:scale-110 transition-transform duration-500">
              <Coins size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-serif text-white mb-4">Compramos seu Ouro</h3>
            <p className="text-zinc-400 font-light leading-relaxed">
              Transforme suas peças antigas em capital ou use como base para novos projetos. Oferecemos uma avaliação <strong className="text-zinc-200">justa, segura e transparente</strong>, pagando o melhor valor do mercado.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <a 
            href="https://www.instagram.com/_apjoias_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-[#D4AF37] text-[#D4AF37] px-10 py-4 uppercase tracking-widest text-sm font-bold transition-all duration-300 hover:bg-[#D4AF37] hover:text-zinc-950"
          >
            Fazer Orçamento no Direct
          </a>
        </div>
      </div>
    </section>
  );
}