import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Church, Home, GraduationCap, Baby, Crown, Globe } from 'lucide-react';

interface Milestone {
  year: string;
  title: string;
  body: string;
  igbo: string;
  icon: React.ElementType;
  accent: string;
  side: 'left' | 'right';
}

const MILESTONES: Milestone[] = [
  {
    year: '1974',
    title: 'First Meeting',
    body: 'A chance encounter in the vibrant streets of Lagos brings together a brilliant young engineer and a woman of exceptional grace. The elders would later say it was no accident — Chineke had arranged it.',
    igbo: 'Ifeoma — beautiful beginnings destined by heaven',
    icon: Heart,
    accent: '#d4af37',
    side: 'left',
  },
  {
    year: '1976',
    title: 'The Wedding',
    body: 'Before God, family, and all of Igboland, they exchange sacred vows. First the traditional Igba Nkwu — the palm wine ceremony sealing their union before the ancestors. Then the Church, where they kneel before the Almighty.',
    igbo: 'Igba Nkwu — the pouring of wine to seal a lifetime',
    icon: Church,
    accent: '#d4af37',
    side: 'right',
  },
  {
    year: '1977',
    title: 'First Child',
    body: "The couple welcome their firstborn, and the home overflows with a joy unlike any before. Chief Engr's quiet pride is matched only by Lolo's radiant love. A family has truly begun.",
    igbo: "Nwa bụ ihe Chineke nyere — a child is God's greatest gift",
    icon: Baby,
    accent: '#d4af37',
    side: 'left',
  },
  {
    year: '1980s',
    title: 'Building the Home',
    body: 'Through the oil boom and beyond, they build steadily — career, home, family. Six children arrive across the decade. The house in Lagos becomes a sanctuary of laughter, homework, Saturday rice, and Sunday church.',
    igbo: 'Obi Oma — a home of peace built on unshakeable trust',
    icon: Home,
    accent: '#d4af37',
    side: 'right',
  },
  {
    year: '1990s',
    title: 'The Children Flourish',
    body: 'One by one, the children distinguish themselves — in classrooms, in exams, in the world. Mama and Papa attend every prize-giving, every graduation, every milestone. Their investment in education begins to yield a golden harvest.',
    igbo: 'Nwata tozuo eto, o tochie ihe o hụrụ — a child, grown, returns the wisdom received',
    icon: GraduationCap,
    accent: '#d4af37',
    side: 'left',
  },
  {
    year: '2000s',
    title: 'Degrees & Destinations',
    body: 'The Onwuneme children scatter across continents. Each achievement is a brick in the monument their parents have been building for thirty years. Proof that sacrifice is never wasted.',
    igbo: 'Nmadụ bụ ụba — people are the truest wealth of any home',
    icon: Globe,
    accent: '#d4af37',
    side: 'right',
  },
  {
    year: '2010s',
    title: 'The Grandchildren Come',
    body: 'The sound of tiny feet returns. Grandchildren arrive — inheriting the same cheekbones, the same laughter, the same blessings. Lolo hides chin-chin in her handbag again. Chief Engr tells the old stories with new audiences.',
    igbo: 'Ọ bụ ndụ nọ n\'ọnụ — it is the life that speaks at the gate',
    icon: Star,
    accent: '#d4af37',
    side: 'left',
  },
  {
    year: '2026',
    title: 'The Golden Crown',
    body: 'Fifty years. The same hands that clasped in 1976 hold tighter today. Every morning of shared prayer, every meal, every storm weathered together has built this moment. They stand before their family not as they were — but as they have gloriously become.',
    igbo: 'Aluba m Ọhụrụ — returning to the altar with golden crowns',
    icon: Crown,
    accent: '#d4af37',
    side: 'right',
  },
];

function MilestoneCard({ milestone, index }: { milestone: Milestone; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = milestone.icon;
  const isLeft = milestone.side === 'left';

  return (
    <div className={`relative flex items-start gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>

      {/* Left/right card — hidden on mobile for centre layout */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, delay: index * 0.07, ease: 'easeOut' }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className={`hidden md:block w-[calc(50%-2.5rem)] ${isLeft ? 'pr-10 text-right' : 'pl-10 text-left'}`}
      >
        <div
          className="gold-card rounded-2xl overflow-hidden transition-all duration-300"
          style={{ boxShadow: hovered ? '0 12px 40px rgba(139,105,20,0.2)' : undefined }}
        >
          <div className="h-1"
            style={{ background: 'linear-gradient(to right, #8b6914, #d4af37, #ffe082, #d4af37, #8b6914)' }}
          />
          <div className="p-7">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#8b6914] font-semibold mb-3">
              {milestone.igbo}
            </p>
            <h3 className="font-heading font-bold text-xl md:text-2xl text-[#2d1f00] mb-3 leading-tight">
              {milestone.title}
            </h3>
            <p className="font-serif text-[#3d2e00] text-base leading-relaxed font-light">
              {milestone.body}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Centre spine: connector circle */}
      <div className="relative flex flex-col items-center flex-shrink-0 w-20 z-10">
        {/* Year badge above circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.07 + 0.1 }}
          className="mb-2 text-center"
        >
          <span
            className="font-heading font-black text-sm md:text-base px-3 py-1 rounded"
            style={{
              background: '#1a1000',
              color: '#d4af37',
              boxShadow: '0 2px 10px rgba(212,175,55,0.35)',
            }}
          >
            {milestone.year}
          </span>
        </motion.div>

        {/* Icon circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.07 + 0.15, type: 'spring', stiffness: 200 }}
          className="w-14 h-14 rounded-full flex items-center justify-center z-20 relative"
          style={{
            background: 'linear-gradient(135deg, #2d1f00, #8b6914)',
            border: '3px solid #d4af37',
            boxShadow: '0 0 0 5px rgba(212,175,55,0.15), 0 4px 16px rgba(139,105,20,0.3)',
          }}
        >
          <Icon className="w-6 h-6 text-[#ffe082]" />
        </motion.div>
      </div>

      {/* Right/left card — hidden on mobile */}
      <div className="hidden md:block w-[calc(50%-2.5rem)]" />

      {/* Mobile card — full width below the badge/circle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.07 }}
        className="md:hidden flex-1 ml-4 mb-2"
      >
        <div className="gold-card rounded-2xl overflow-hidden">
          <div className="h-1"
            style={{ background: 'linear-gradient(to right, #8b6914, #d4af37, #ffe082, #d4af37, #8b6914)' }}
          />
          <div className="p-5">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#8b6914] font-semibold mb-2">
              {milestone.igbo}
            </p>
            <h3 className="font-heading font-bold text-lg text-[#2d1f00] mb-2">{milestone.title}</h3>
            <p className="font-serif text-[#3d2e00] text-sm leading-relaxed font-light">{milestone.body}</p>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

export default function Timeline() {
  return (
    <section id="timeline" className="parchment-bg py-24 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="section-tag mb-5 block mx-auto w-fit">50 Years</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#2d1f00] mb-4">
            The Golden <span className="gold-text-static">Timeline</span>
          </h2>
          <div className="ornament-divider mx-auto">
            <span className="text-amber-600 text-base tracking-widest">✦ ❖ ✦</span>
          </div>
          <p className="font-serif text-[#4a3500] text-lg md:text-xl italic max-w-2xl mx-auto mt-4 font-light leading-relaxed">
            Every milestone, every blessing, every turning point — on the road to a golden half-century.
          </p>
        </motion.div>

        {/* Timeline body */}
        <div className="relative">

          {/* Vertical line — desktop only */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] rounded-full"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, #8b6914 5%, #d4af37 15%, #ffe082 28%, #fff8c0 30%, #ffe082 32%, #d4af37 50%, #ffe082 68%, #fff8c0 70%, #ffe082 72%, #d4af37 85%, #8b6914 95%, transparent 100%)',
              backgroundSize: '100% 300%',
              animation: 'golden-line-flow 5s linear infinite',
              boxShadow: '0 0 8px rgba(212,175,55,0.4)',
            }}
          />

          {/* Mobile vertical line */}
          <div
            className="md:hidden absolute left-[2.3rem] top-0 bottom-0 w-[2px] rounded-full"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, #8b6914 5%, #d4af37 15%, #ffe082 28%, #fff8c0 30%, #ffe082 32%, #d4af37 50%, #ffe082 68%, #fff8c0 70%, #ffe082 72%, #d4af37 85%, #8b6914 95%, transparent 100%)',
              backgroundSize: '100% 300%',
              animation: 'golden-line-flow 5s linear infinite',
              boxShadow: '0 0 6px rgba(212,175,55,0.35)',
            }}
          />

          <div className="space-y-12 md:space-y-16">
            {MILESTONES.map((m, i) => (
              <MilestoneCard key={m.year} milestone={m} index={i} />
            ))}
          </div>

          {/* End cap */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, type: 'spring' }}
            className="flex flex-col items-center mt-12"
          >
            <div
              className="w-20 h-20 rounded-full flex flex-col items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #7a5c00, #d4af37)',
                border: '4px solid #ffe082',
                boxShadow: '0 0 0 8px rgba(212,175,55,0.15), 0 8px 32px rgba(139,105,20,0.4)',
              }}
            >
              <Crown className="w-8 h-8 text-white" />
            </div>
            <p className="font-heading font-bold text-[#2d1f00] text-sm uppercase tracking-[0.25em] mt-4">
              50 Years of Gold
            </p>
            <p className="font-serif italic text-[#8b6914] text-sm mt-1">
              29th December 2026
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
