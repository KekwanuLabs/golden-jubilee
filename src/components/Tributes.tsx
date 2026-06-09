import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send, Filter, MessageSquare, Star, Loader2 } from 'lucide-react';

interface Tribute {
  id: string;
  author: string;
  relation: string;
  message: string;
  createdAt: string;
  avatarInitials: string;
  avatarGradient: string;
  isFeatured?: boolean;
}

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #7a5c00, #d4af37)',
  'linear-gradient(135deg, #2d1f00, #8b6914)',
  'linear-gradient(135deg, #5c4500, #c9a227)',
  'linear-gradient(135deg, #1a1200, #d4af37)',
  'linear-gradient(135deg, #3d2800, #b8960c)',
];

const PAGE_SIZE = 6;

const FILTER_OPTS = ['All', 'First Child', 'Second Child', 'Third Child', 'Fourth Child', 'Fifth Child', 'Sixth Child', 'Grandchild', 'Friend', 'Extended Family'];

function TributeCard({ tribute }: { tribute: Tribute }) {
  const [hearted, setHearted] = useState(false);

  useEffect(() => {
    setHearted(!!localStorage.getItem(`trib-heart-${tribute.id}`));
  }, [tribute.id]);

  const toggleHeart = () => {
    if (!hearted) {
      localStorage.setItem(`trib-heart-${tribute.id}`, '1');
      setHearted(true);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="gold-card rounded-xl overflow-hidden flex flex-col"
    >
      {tribute.isFeatured && (
        <div className="h-0.5"
          style={{ background: 'linear-gradient(to right, #8b6914, #d4af37, #ffe082, #d4af37, #8b6914)' }}
        />
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center font-heading font-bold text-sm text-white flex-shrink-0"
              style={{ background: tribute.avatarGradient, boxShadow: '0 2px 8px rgba(212,175,55,0.3)' }}
            >
              {tribute.avatarInitials}
            </div>
            <div>
              <p className="font-heading font-bold text-base text-[#2d1f00]">{tribute.author}</p>
              <span className="font-sans text-[13px] uppercase tracking-widest text-amber-600 font-semibold">
                {tribute.relation}
              </span>
            </div>
          </div>
          {tribute.isFeatured && (
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0 mt-0.5" />
          )}
        </div>

        <p className="font-serif text-[#3d2e00]/85 text-[15px] leading-relaxed italic flex-1 mb-5">
          "{tribute.message}"
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-amber-200/30">
          <span className="font-sans text-[13px] uppercase tracking-widest text-amber-700">
            {tribute.createdAt}
          </span>
          <button
            onClick={toggleHeart}
            className={`flex items-center gap-1.5 text-[13px] font-sans font-semibold transition-colors cursor-pointer ${
              hearted ? 'text-amber-600' : 'text-amber-600 hover:text-amber-600'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${hearted ? 'fill-amber-600' : ''}`} />
            {hearted ? 'Blessed' : 'Bless this'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Tributes() {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('Friend');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const fetchTributes = async () => {
    try {
      const res = await fetch('/api/tributes');
      if (res.ok) setTributes(await res.json());
    } catch {
      // silently keep whatever we have
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTributes(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) {
      setError('Please enter your name and message.');
      return;
    }
    setError('');
    setSubmitting(true);

    const initials = author.trim().split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    const avatarGradientIdx = Math.floor(Math.random() * AVATAR_GRADIENTS.length);

    try {
      const res = await fetch('/api/tributes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: author.trim(), relation, message: message.trim(), avatarInitials: initials, avatarGradientIdx }),
      });
      if (!res.ok) {
        const data = await res.json() as { error?: string };
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      await fetchTributes();
      setAuthor('');
      setMessage('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      setError('Could not submit. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = filter === 'All' ? tributes : tributes.filter(t => t.relation === filter);
  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const handleFilterChange = (f: string) => {
    setFilter(f);
    setVisible(PAGE_SIZE);
  };

  return (
    <section id="tributes" className="parchment-bg py-24 px-4">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-5 block mx-auto w-fit">Messages of Love</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#2d1f00] mb-4">
            Tribute <span className="gold-text-static">Wall</span>
          </h2>
          <div className="ornament-divider mx-auto">
            <span className="text-amber-600 text-base tracking-widest">✦ ❖ ✦</span>
          </div>
          <p className="font-serif text-[#3d2800] text-lg italic max-w-xl mx-auto mt-4 font-light">
            Words of honour from the children, grandchildren, family, and friends who love Chief Engr &amp; Lolo Cosmas Onwuneme.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Write a tribute form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-4 gold-card rounded-2xl overflow-hidden"
          >
            <div className="h-1"
              style={{ background: 'linear-gradient(to right, #8b6914, #d4af37, #ffe082, #d4af37, #8b6914)' }}
            />
            <div className="p-7">
              <div className="flex items-center gap-2 mb-5">
                <Send className="w-4 h-4 text-amber-600" />
                <h3 className="font-heading font-bold text-[#2d1f00] text-lg">Leave a Tribute</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-sans text-[13px] uppercase tracking-widest text-amber-700 font-semibold mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Amaka Okafor"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    className="w-full font-serif text-sm p-3 border border-amber-200/60 rounded bg-white/70 text-[#2d1f00] placeholder-amber-400/60"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[13px] uppercase tracking-widest text-amber-700 font-semibold mb-1.5">
                    Your Relationship
                  </label>
                  <select
                    value={relation}
                    onChange={e => setRelation(e.target.value)}
                    className="w-full font-sans text-sm p-3 border border-amber-200/60 rounded bg-white/70 text-[#2d1f00]"
                  >
                    {['Friend', 'Extended Family', 'Colleague', 'Grandchild', 'Sibling', 'Well-Wisher'].map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[13px] uppercase tracking-widest text-amber-700 font-semibold mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    placeholder="Write your heartfelt tribute or blessing here..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={5}
                    className="w-full font-serif text-sm p-3 border border-amber-200/60 rounded bg-white/70 text-[#2d1f00] placeholder-amber-400/60 resize-none"
                  />
                </div>

                {error && <p className="font-sans text-xs text-red-600">{error}</p>}
                {success && (
                  <p className="font-sans text-xs text-green-700 font-semibold">
                    Your tribute has been added. Ya gazie!
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold w-full py-3 rounded text-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {submitting ? 'Posting…' : 'Post Tribute'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Tribute wall */}
          <div className="lg:col-span-8 space-y-6">

            {/* Filter row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 items-center pb-4 border-b border-amber-200/40"
            >
              <Filter className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
              <span className="font-sans text-sm uppercase tracking-widest text-amber-700 mr-1">
                Filter:
              </span>
              {FILTER_OPTS.filter(f => f === 'All' || tributes.some(t => t.relation === f)).map(f => (
                <button
                  key={f}
                  onClick={() => handleFilterChange(f)}
                  className={`px-3 py-1.5 rounded-full font-sans text-sm font-bold uppercase tracking-wide border transition-all cursor-pointer ${
                    filter === f
                      ? 'bg-[#2d1f00] border-amber-600 text-amber-300'
                      : 'bg-white/60 border-amber-200/50 text-amber-700 hover:border-amber-400'
                  }`}
                >
                  {f}
                </button>
              ))}
            </motion.div>

            {/* Cards */}
            {loading ? (
              <div className="flex items-center justify-center py-16 text-amber-700">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                <span className="font-serif italic">Loading tributes…</span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <AnimatePresence mode="popLayout">
                    {shown.map(t => (
                      <TributeCard key={t.id} tribute={t} />
                    ))}
                  </AnimatePresence>
                  {filtered.length === 0 && (
                    <div className="md:col-span-2 text-center py-12 text-amber-700">
                      <MessageSquare className="w-8 h-8 mx-auto mb-3 opacity-50" />
                      <p className="font-serif italic">No tributes in this category yet.</p>
                    </div>
                  )}
                </div>

                {hasMore && (
                  <div className="text-center pt-2">
                    <button
                      onClick={() => setVisible(v => v + PAGE_SIZE)}
                      className="font-sans text-sm uppercase tracking-widest text-amber-700 border border-amber-300/60 rounded-full px-6 py-2.5 hover:border-amber-500 hover:bg-amber-50/30 transition-all cursor-pointer"
                    >
                      Show More ({filtered.length - visible} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
