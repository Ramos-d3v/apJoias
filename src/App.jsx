import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import About from './components/About';
import Contact from './components/Contact'; // <-- Importe o Contato aqui
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <About />
        <Contact /> {/* <-- Adicione o componente aqui, antes do Footer */}
      </main>
      <Footer />
    </div>
  );
}

export default App;