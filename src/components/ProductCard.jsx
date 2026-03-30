export default function ProductCard({ product }) {
  const whatsappNumber = "5511999522665"; 
  const message = `Olá! Tenho interesse na peça: ${product.name}. Pode me passar mais detalhes e o orçamento?`;

  return (
    <div className="group bg-zinc-900 border border-zinc-800 p-5 transition-all duration-500 hover:border-[#D4AF37]/50 hover:-translate-y-2 hover:shadow-[0_15px_60px_-15px_rgba(212,175,55,0.25)] flex flex-col h-full overflow-hidden">
      {/* Imagem com efeito de zoom e overlay dourado no hover */}
      <div className="relative overflow-hidden bg-zinc-950 aspect-[4/5] mb-6 border border-zinc-800">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        {/* Overlay dourado suave no hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-gold-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      <div className="text-center px-2 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-serif text-zinc-100 mb-2 group-hover:text-gold-300 transition-colors">{product.name}</h3>
          <p className="text-zinc-500 text-sm italic mb-4">A partir de {product.price}</p>
        </div>
        
        {/* Dois botões de ação para conversão direta */}
        <div className="grid grid-cols-2 gap-3 mt-auto pt-4">
          {/* Botão WhatsApp - Solid Gold */}
          <a 
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-[#D4AF37] text-zinc-950 py-3 text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:bg-[#B8860B] hover:shadow-[0_0_10px_rgba(212,175,55,0.3)]"
          >
            Orçamento
          </a>
          {/* Botão Instagram - Outlined Gold */}
          <a 
            href="https://www.instagram.com/_apjoias_/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 border border-[#D4AF37] text-[#D4AF37] py-3 text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:bg-[#D4AF37]/10"
          >
            via Direct
          </a>
        </div>
      </div>
    </div>
  );
}