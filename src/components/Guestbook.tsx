import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Check, Users, Send, CalendarCheck, Loader2, ChevronDown } from 'lucide-react';

interface RSVPEntry {
  id: string;
  name: string;
  attending: boolean;
  guests: number;
  message: string;
  timestamp: string;
}

function formatGuestbookDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #7a5c00, #d4af37)',
  'linear-gradient(135deg, #2d1f00, #8b6914)',
  'linear-gradient(135deg, #5c4500, #c9a227)',
  'linear-gradient(135deg, #1a1200, #d4af37)',
];
const PAGE_SIZE = 6;

export default function Guestbook() {
  const [entries, setEntries] = useState<RSVPEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/rsvp');
      if (res.ok) setEntries(await res.json());
    } catch {
      // silently keep whatever we have
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
    const interval = window.setInterval(fetchEntries, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError('Please enter your name.'); return; }
    if (attending === null) { setError('Please let us know if you are attending.'); return; }
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), attending, guests: attending ? guests : 0, message: message.trim() }),
      });
      if (!res.ok) {
        const data = await res.json() as { error?: string };
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      await fetchEntries();
      setPage(1);
      setName('');
      setAttending(null);
      setGuests(1);
      setMessage('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 6000);
    } catch {
      setError('Could not submit. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const attending_count = entries.filter(e => e.attending).length;
  const total_guests    = entries.filter(e => e.attending).reduce((sum, e) => sum + e.guests, 0);
  const pageCount = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
  const visibleEntries = entries.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section id="guestbook" className="cream-bg py-24 px-4">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-5 block mx-auto w-fit">Ceremonial Register</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#2d1f00] mb-4">
            Guestbook <span className="gold-text-static">&amp; RSVP</span>
          </h2>
          <div className="ornament-divider mx-auto">
            <span className="text-amber-600 text-base tracking-widest">✦ ❖ ✦</span>
          </div>
          <p className="font-serif text-[#3d2800] text-lg italic max-w-xl mx-auto mt-4 font-light">
            Sign the public guestbook with a note for the couple. You can also let us know whether you will join the celebration.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-12 max-w-lg mx-auto"
        >
          {[
            { label: 'RSVPd',  value: attending_count, icon: CalendarCheck },
            { label: 'Guests', value: total_guests,    icon: Users },
            { label: 'Signed', value: entries.length,  icon: BookOpen },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="gold-card rounded-xl p-3 md:p-4 text-center">
              <Icon className="w-4 h-4 md:w-5 md:h-5 text-amber-600 mx-auto mb-1.5" />
              <div className="font-heading font-bold text-xl md:text-2xl gold-text-static">{value}</div>
              <div className="font-sans text-xs md:text-sm uppercase tracking-wider text-amber-700 mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* RSVP Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 gold-card rounded-2xl overflow-hidden"
          >
            <div className="h-1"
              style={{ background: 'linear-gradient(to right, #8b6914, #d4af37, #ffe082, #d4af37, #8b6914)' }}
            />
            <div className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <h3 className="font-heading font-bold text-[#2d1f00] text-xl">Sign the Register</h3>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: 'linear-gradient(135deg, #5c4500, #d4af37)' }}
                    >
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-heading font-bold text-[#2d1f00] text-lg mb-2">You're in the register!</h4>
                    <p className="font-serif italic text-amber-700/70 text-sm">
                      Thank you for signing the golden register. We look forward to celebrating with you on 29th December 2026!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block font-sans text-[13px] uppercase tracking-widest text-amber-700 font-semibold mb-1.5">
                        Your Name / Family Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. The Johnson Family"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full font-serif text-sm p-3 border border-amber-200/60 rounded bg-white/70 text-[#2d1f00] placeholder-amber-400/60"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-[13px] uppercase tracking-widest text-amber-700 font-semibold mb-1.5">
                        A note for the couple <span className="font-normal normal-case tracking-normal text-amber-700/60">(optional)</span>
                      </label>
                      <textarea
                        placeholder="Write a blessing, memory or warm wish…"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        rows={4}
                        className="w-full font-serif text-base p-3 border border-amber-200/60 rounded bg-white/70 text-[#2d1f00] placeholder-amber-400/60 resize-y"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-[13px] uppercase tracking-widest text-amber-700 font-semibold mb-2">
                        Will you attend?
                      </label>
                      <div className="flex gap-3">
                        {[
                          { v: true,  label: '✓ Attending' },
                          { v: false, label: "✗ Can't Attend" },
                        ].map(opt => (
                          <button
                            key={String(opt.v)}
                            type="button"
                            onClick={() => setAttending(opt.v)}
                            className={`flex-1 py-2.5 rounded text-sm font-heading font-bold tracking-wide border transition-all cursor-pointer ${
                              attending === opt.v
                                ? opt.v
                                  ? 'bg-[#2d1f00] border-amber-500 text-amber-300'
                                  : 'bg-[#3d0000] border-red-800 text-red-300'
                                : 'border-amber-200/50 text-amber-700 bg-white/50 hover:border-amber-400'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {attending === true && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                      >
                        <label className="block font-sans text-[13px] uppercase tracking-widest text-amber-700 font-semibold mb-1.5">
                          Number of Guests (including yourself)
                        </label>
                        <div className="flex items-center gap-3">
                          {[1, 2, 3, 4, 5, '6+'].map(n => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => setGuests(typeof n === 'string' ? 6 : n)}
                              className={`w-9 h-9 rounded font-heading font-bold text-sm border transition-all cursor-pointer ${
                                guests === (typeof n === 'string' ? 6 : n)
                                  ? 'bg-[#2d1f00] border-amber-500 text-amber-300'
                                  : 'border-amber-200/50 text-amber-700 bg-white/50 hover:border-amber-400'
                              }`}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {error && <p className="font-sans text-xs text-red-600">{error}</p>}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-gold w-full py-3.5 rounded text-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {submitting ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      {submitting ? 'Submitting…' : 'Sign the Golden Register'}
                    </button>

                    <p className="font-serif italic text-amber-700/60 text-sm text-center">Your note and RSVP will be saved in the golden register.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Guest list */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-heading font-bold text-[#2d1f00] text-sm">Signed Guests</p>
              <span className="font-sans text-[13px] uppercase tracking-widest text-amber-700">
                {entries.length} registered
              </span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12 text-amber-700">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                <span className="font-serif italic text-sm">Loading register…</span>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {entries.length === 0 ? (
                  <div className="gold-card rounded-2xl min-h-[280px] flex flex-col items-center justify-center text-center px-8 py-10 border-dashed">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: 'linear-gradient(135deg, #2d1f00, #d4af37)' }}><BookOpen className="w-7 h-7 text-amber-200" /></div>
                    <h3 className="font-heading text-xl md:text-2xl font-bold text-[#2d1f00] mb-2">The register awaits its first page</h3>
                    <p className="font-serif text-lg italic text-amber-800/75 max-w-sm">Be the first to leave a warm wish and let the family know if you will join the celebration.</p>
                  </div>
                ) : visibleEntries.map((entry, i) => {
                  const initials = entry.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
                  return (
                    <motion.div
                      key={entry.id}
                      layout
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`gold-card rounded-xl p-4 flex items-start gap-4 ${expandedId === entry.id ? '' : 'min-h-[92px]'}`}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm text-white flex-shrink-0"
                        style={{ background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length] }}
                      >
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <button type="button" onClick={() => entry.message && setExpandedId(current => current === entry.id ? null : entry.id)} aria-expanded={expandedId === entry.id} className={`w-full text-left ${entry.message ? 'cursor-pointer' : 'cursor-default'}`}>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-heading font-bold text-base md:text-lg text-[#2d1f00]">{entry.name}</p>
                          <span className={`font-sans text-[13px] uppercase tracking-widest px-2 py-0.5 rounded font-bold ${
                            entry.attending
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-amber-50 text-amber-600'
                          }`}>
                            {entry.attending ? `Attending · ${entry.guests} guest${entry.guests > 1 ? 's' : ''}` : 'Unable to attend'}
                          </span>
                            {entry.message && <ChevronDown className={`w-4 h-4 text-amber-600 ml-auto transition-transform duration-300 ${expandedId === entry.id ? 'rotate-180' : ''}`} />}
                          </div>
                          <p className="font-sans text-xs tracking-wide text-amber-600/55 mt-1">{formatGuestbookDate(entry.timestamp)}</p>
                        </button>
                        {entry.message && <AnimatePresence initial={false}><motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: expandedId === entry.id ? 'auto' : 0, opacity: expandedId === entry.id ? 1 : 0 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden"><p className="font-serif text-base md:text-lg italic text-[#3d2e00]/80 mt-3 pt-3 border-t border-amber-200/40 leading-relaxed">“{entry.message}”</p></motion.div></AnimatePresence>}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {!loading && entries.length > 0 && (
              <div className="flex items-center justify-between gap-4 pt-2">
                <button onClick={() => setPage(current => Math.max(1, current - 1))} disabled={page === 1} className="btn-outline-gold rounded px-4 py-2.5 text-sm disabled:opacity-35 disabled:cursor-not-allowed">← Newer</button>
                <span className="font-sans text-sm uppercase tracking-widest text-amber-700">Page {page} of {pageCount}</span>
                <button onClick={() => setPage(current => Math.min(pageCount, current + 1))} disabled={page === pageCount} className="btn-outline-gold rounded px-4 py-2.5 text-sm disabled:opacity-35 disabled:cursor-not-allowed">Older →</button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
