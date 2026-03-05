import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { api } from "@/lib/api";
import Link from 'next/link';
import { ArrowLeft, Sparkles, Flame, Droplets, Wind, Mountain, Sun, Moon, Briefcase, Heart, Fingerprint } from 'lucide-react';

const SIGNS_MOCK_DATA: Record<string, any> = {
  aries: { name: 'Áries', symbol: '♈', element: 'Fogo', modality: 'Cardeal', ruling_planet: 'Marte', content: null },
  taurus: { name: 'Touro', symbol: '♉', element: 'Terra', modality: 'Fixo', ruling_planet: 'Vênus', content: null },
  gemini: { name: 'Gêmeos', symbol: '♊', element: 'Ar', modality: 'Mutável', ruling_planet: 'Mercúrio', content: null },
  cancer: { name: 'Câncer', symbol: '♋', element: 'Água', modality: 'Cardeal', ruling_planet: 'Lua', content: null },
  leo: { name: 'Leão', symbol: '♌', element: 'Fogo', modality: 'Fixo', ruling_planet: 'Sol', content: null },
  virgo: { name: 'Virgem', symbol: '♍', element: 'Terra', modality: 'Mutável', ruling_planet: 'Mercúrio', content: null },
  libra: { name: 'Libra', symbol: '♎', element: 'Ar', modality: 'Cardeal', ruling_planet: 'Vênus', content: null },
  scorpio: { name: 'Escorpião', symbol: '♏', element: 'Água', modality: 'Fixo', ruling_planet: 'Marte e Plutão', content: null },
  sagittarius: { name: 'Sagitário', symbol: '♐', element: 'Fogo', modality: 'Mutável', ruling_planet: 'Júpiter', content: null },
  capricorn: { name: 'Capricórnio', symbol: '♑', element: 'Terra', modality: 'Cardeal', ruling_planet: 'Saturno', content: null },
  aquarius: { name: 'Aquário', symbol: '♒', element: 'Ar', modality: 'Fixo', ruling_planet: 'Saturno e Urano', content: null },
  pisces: { name: 'Peixes', symbol: '♓', element: 'Água', modality: 'Mutável', ruling_planet: 'Júpiter e Netuno', content: null },
};

async function getSign(slug: string) {
  try {
    const { data } = await api.get(`/api/v1/signs/${slug}/`);
    return data;
  } catch (err) {
    console.warn(`Sign ${slug} not found in backend, returning mock data.`);
    return SIGNS_MOCK_DATA[slug] || SIGNS_MOCK_DATA['aries'];
  }
}

export default async function SignDetailPage({ params }: { params: { slug: string } }) {
  const sign = await getSign(params.slug);

  const elementIcons: Record<string, any> = {
    'fogo': <Flame className="w-5 h-5 text-orange-400" />,
    'água': <Droplets className="w-5 h-5 text-blue-400" />,
    'ar': <Wind className="w-5 h-5 text-teal-300" />,
    'terra': <Mountain className="w-5 h-5 text-amber-600" />
  };

  const ElementIcon = elementIcons[sign.element?.toLowerCase()] || <Sparkles className="w-5 h-5 text-white" />;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-nebula-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cosmic-600/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="mx-auto max-w-5xl px-4 relative z-10">
          <Link href="/signs" className="inline-flex items-center gap-2 text-cosmic-300 hover:text-white transition-colors mb-12">
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar para Enciclopédia</span>
          </Link>

          {/* Hero Section of the Sign */}
          <div className="flex flex-col md:flex-row gap-10 items-center mb-16">
            <div className="w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.3)] shrink-0 group">
              <div className="absolute inset-0 bg-gradient-to-t from-cosmic-900/40 to-transparent z-10" />
              <img
                src={`/zodiac/${params.slug}.png`}
                alt={sign.name}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
                <span className="text-3xl font-bold bg-white/10 rounded-xl w-12 h-12 flex items-center justify-center">{sign.symbol}</span>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-shadow-glow">
                  {sign.name}
                </h1>
              </div>

              <p className="text-cosmic-200/90 text-xl leading-relaxed max-w-2xl mb-6">
                Mergulhe na energia ancestral e nas forças celestiais que guiam os nativos deste signo.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="badge-primary flex items-center gap-2">
                  {ElementIcon}
                  Elemento {sign.element}
                </span>
                <span className="badge-secondary flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  {sign.modality}
                </span>
                <span className="badge-secondary flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  Regente: {sign.ruling_planet}
                </span>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-card p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                  <Fingerprint className="w-6 h-6 text-nebula-400" />
                  <h2 className="font-display text-3xl font-bold">Personalidade</h2>
                </div>
                {sign.content?.overview ? (
                  <div className="prose prose-invert max-w-none">
                    {sign.content.overview.split('\n').map((paragraph: string, i: number) => (
                      <p key={i} className="text-cosmic-200/80 leading-relaxed text-lg mb-4">{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-cosmic-200/50 italic text-lg text-center py-10">
                    O oráculo ainda está decifrando a personalidade deste signo...
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-8">
                  <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                    <Heart className="w-6 h-6 text-rose-400" />
                    <h2 className="font-display text-2xl font-bold">No Amor</h2>
                  </div>
                  <p className="text-cosmic-200/80 leading-relaxed">
                    {sign.content?.love || "Informações amorosas estarão disponíveis em breve. O cosmos está alinhando os corações."}
                  </p>
                </div>

                <div className="glass-card p-8">
                  <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                    <Briefcase className="w-6 h-6 text-emerald-400" />
                    <h2 className="font-display text-2xl font-bold">Na Carreira</h2>
                  </div>
                  <p className="text-cosmic-200/80 leading-relaxed">
                    {sign.content?.career || "A trajetória profissional deste signo ainda será revelada pelas estrelas."}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Stats / Traits Card */}
              <div className="glass-card p-8 bg-gradient-to-b from-cosmic-800/40 to-transparent border border-white/5">
                <h3 className="font-display text-xl font-bold mb-6 text-center">Atributos Cósmicos</h3>
                <div className="space-y-5">
                  {['Paciência', 'Emoção', 'Razão', 'Intuição'].map(attr => (
                    <div key={attr}>
                      <div className="flex justify-between text-sm text-cosmic-200 mb-2">
                        <span>{attr}</span>
                        <span>{Math.floor(Math.random() * 40) + 60}%</span>
                      </div>
                      <div className="h-2 w-full bg-cosmic-900 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-nebula-500 to-cosmic-400 rounded-full" style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Motivational Quote & Observations */}
              <div className="glass-card p-8 bg-gradient-to-br from-nebula-900/40 to-cosmic-900/40 border border-nebula-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-nebula-500/10 rounded-full blur-[40px] group-hover:bg-nebula-500/20 transition-all duration-500"></div>
                <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2 text-nebula-300">
                  <Sparkles className="w-5 h-5" />
                  Mensagem do Dia
                </h3>
                <p className="text-cosmic-100 leading-relaxed italic border-l-2 border-nebula-400 pl-4 py-1">
                  "{[
                    "As estrelas estão alinhadas para o seu sucesso hoje. Confie na sua intuição cósmica.",
                    "Um obstáculo é apenas um degrau para a sua constante evolução espiritual.",
                    "A lua ilumina caminhos ocultos. Esteja aberto para novas descobertas sentimentais.",
                    "Sua energia contagiante será seu maior trunfo no dia de hoje.",
                    "O universo responde à sua vibração. Mantenha os pensamentos nas alturas."
                  ][(new Date().getDate() + sign.name.length) % 5]}"
                </p>
                <div className="mt-6 pt-6 border-t border-white/5">
                  <h4 className="text-sm font-bold text-cosmic-300 mb-2 uppercase tracking-widest">Observações</h4>
                  <ul className="text-sm text-cosmic-200/80 space-y-2">
                    <li>• Compatibilidade alta com signos de {sign.element === 'Fogo' ? 'Ar' : sign.element === 'Terra' ? 'Água' : sign.element === 'Ar' ? 'Fogo' : 'Terra'}</li>
                    <li>• Modalidade vibratória: {sign.modality}</li>
                    <li>• Planeta Guardião: {sign.ruling_planet} ampliando forças hoje.</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
