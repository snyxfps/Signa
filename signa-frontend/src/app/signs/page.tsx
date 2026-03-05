import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const SIGNS = [
  { slug: "aries", name: "Áries", symbol: "♈" },
  { slug: "taurus", name: "Touro", symbol: "♉" },
  { slug: "gemini", name: "Gêmeos", symbol: "♊" },
  { slug: "cancer", name: "Câncer", symbol: "♋" },
  { slug: "leo", name: "Leão", symbol: "♌" },
  { slug: "virgo", name: "Virgem", symbol: "♍" },
  { slug: "libra", name: "Libra", symbol: "♎" },
  { slug: "scorpio", name: "Escorpião", symbol: "♏" },
  { slug: "sagittarius", name: "Sagitário", symbol: "♐" },
  { slug: "capricorn", name: "Capricórnio", symbol: "♑" },
  { slug: "aquarius", name: "Aquário", symbol: "♒" },
  { slug: "pisces", name: "Peixes", symbol: "♓" },
];

export default function SignsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-4 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-nebula-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cosmic-600/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="mx-auto max-w-6xl relative z-10 text-center">
          <h1 className="font-display text-5xl font-bold mb-6 text-shadow-glow">
            Enciclopédia de <span className="gradient-text">Signos</span>
          </h1>
          <p className="text-cosmic-200/80 text-xl mb-16 max-w-2xl mx-auto leading-relaxed">
            Mergulhe nas estrelas e descubra os segredos de cada signo do zodíaco. Personalidade, amor, trabalho e o seu destino cósmico.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {SIGNS.map((s) => (
              <Link
                key={s.slug}
                href={`/signs/${s.slug}`}
                className="glass-card glass-card-hover p-6 flex flex-col items-center justify-center group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-white/10 group-hover:-translate-y-2 group-hover:scale-110 group-hover:border-nebula-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300">
                  <img
                    src={`/zodiac/${s.slug}.png`}
                    alt={s.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="font-display text-lg font-bold text-white group-hover:text-nebula-300 transition-colors uppercase tracking-wider">{s.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
