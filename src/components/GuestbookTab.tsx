import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, User, Users, Mail, Bookmark, Sparkles, ShoppingBag, ListPlus } from 'lucide-react';
import { RSVPGuest } from '../types';

interface GuestbookTabProps {
  onRSVPComplete: (size: string) => void;
  guestSize?: string;
}

export default function GuestbookTab({ onRSVPComplete, guestSize }: GuestbookTabProps) {
  const [guests, setGuests] = useState<RSVPGuest[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState(true);
  const [guestsCount, setGuestsCount] = useState(1);
  const [asoEbiOrdered, setAsoEbiOrdered] = useState(false);
  const [asoEbiSize, setAsoEbiSize] = useState<any>('L');
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState('');

  const initialGuests: RSVPGuest[] = [
    {
      id: "1",
      name: "Chief Ngozi Adebayo",
      email: "ngozi.adebayo@nigerianheritage.org",
      attending: true,
      guestsCount: 2,
      asoEbiOrdered: true,
      asoEbiSize: "L",
      notes: "Vegetarian meals preferred. We will pickup fabric from Surulere.",
      timestamp: "2026-06-07 18:24"
    },
    {
      id: "2",
      name: "Mazi Emeka Okafor",
      email: "emeka.okafor@enugulink.com",
      attending: true,
      guestsCount: 1,
      asoEbiOrdered: true,
      asoEbiSize: "XL",
      notes: "Adhere to classic Isiagu tailoring. Long sleeve shirt.",
      timestamp: "2026-06-07 12:40"
    },
    {
      id: "3",
      name: "Dr. Beatrice Nwafor",
      email: "beatrice.n@uniben.edu",
      attending: true,
      guestsCount: 4,
      asoEbiOrdered: true,
      asoEbiSize: "M",
      notes: "Excited to celebrate our beloved mother and aunt Onyinye!",
      timestamp: "2026-06-06 09:15"
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('golden-jubilee-guests');
    if (saved) {
      try {
        setGuests(JSON.parse(saved));
      } catch (e) {
        setGuests(initialGuests);
      }
    } else {
      setGuests(initialGuests);
      localStorage.setItem('golden-jubilee-guests', JSON.stringify(initialGuests));
    }

    if (guestSize) {
      setAsoEbiSize(guestSize);
    }
  }, [guestSize]);

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErr("Please complete your full name and email address.");
      return;
    }
    setErr('');

    const newGuest: RSVPGuest = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      attending,
      guestsCount,
      asoEbiOrdered,
      asoEbiSize: asoEbiOrdered ? asoEbiSize : undefined,
      notes: notes.trim() || undefined,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    const updated = [newGuest, ...guests];
    setGuests(updated);
    localStorage.setItem('golden-jubilee-guests', JSON.stringify(updated));

    if (asoEbiOrdered) {
      onRSVPComplete(asoEbiSize);
    }

    // Reset Form
    setName('');
    setEmail('');
    setNotes('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[#a43c12] font-sans font-bold text-xs uppercase tracking-widest bg-[#a43c12]/10 px-4 py-1.5 rounded-full">
          The Ceremony Registrar
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-[#735c00] font-bold tracking-tight">
          Guestbook &amp; RSVP
        </h2>
        <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 font-light max-w-md mx-auto">
          Sign the registrar, specify your guest entourage, order your Aso-Ebi sizing coordinates, and check the growing seating list in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* RSVP FORM */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#d4af37] to-[#a43c12]"></div>

          <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-[#735c00]" /> RSVP &amp; Registrar
          </h3>

          <form onSubmit={handleRSVPSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-sans font-bold uppercase text-zinc-650 dark:text-zinc-300 mb-1">
                Your Full Name / Chieftancy Title
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="e.g. Chief Dr. Arthur Okafor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm pl-10 p-3 border border-zinc-200 dark:border-zinc-800 rounded bg-zinc-50/50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans font-bold uppercase text-zinc-650 dark:text-zinc-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="e.g. arthur.okafor@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm pl-10 p-3 border border-zinc-200 dark:border-zinc-800 rounded bg-zinc-50/50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans font-bold uppercase text-zinc-655 dark:text-zinc-300 mb-1">
                  Attendance
                </label>
                <div className="flex bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded p-1">
                  <button
                    type="button"
                    onClick={() => { setAttending(true); setGuestsCount(1); }}
                    className={`flex-1 py-2 text-xs font-sans font-bold uppercase rounded ${
                      attending 
                        ? 'bg-[#735c00] text-white' 
                        : 'text-zinc-500 hover:text-zinc-850 dark:hover:text-zinc-200'
                    }`}
                  >
                    Attending
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAttending(false); setGuestsCount(0); }}
                    className={`flex-1 py-2 text-xs font-sans font-bold uppercase rounded ${
                      !attending 
                        ? 'bg-[#a43c12] text-white' 
                        : 'text-zinc-500 hover:text-zinc-850 dark:hover:text-zinc-200'
                    }`}
                  >
                    Regretfully
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans font-bold uppercase text-zinc-655 dark:text-zinc-300 mb-1">
                  Sovereign Entourage
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    disabled={!attending}
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(parseInt(e.target.value) || 0)}
                    className="w-full text-sm pl-10 p-3 border border-zinc-200 dark:border-zinc-800 rounded bg-zinc-50/50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>
            </div>

            {attending && (
              <div className="p-4 rounded-lg bg-[#fcf9f8]/80 dark:bg-zinc-950 border border-[#d4af37]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-sans font-bold uppercase text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-[#a43c12]" /> Request Uniform Aso-Ebi?
                  </label>
                  <input
                    type="checkbox"
                    checked={asoEbiOrdered}
                    onChange={(e) => setAsoEbiOrdered(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-zinc-300 text-[#a43c12] focus:ring-[#fe7e4f]"
                  />
                </div>

                {asoEbiOrdered && (
                  <div className="space-y-1 pt-1.5 animate-fadeIn">
                    <label className="block text-xs font-sans font-bold uppercase text-zinc-500">
                      Standard Size Designation
                    </label>
                    <select
                      value={asoEbiSize}
                      onChange={(e) => setAsoEbiSize(e.target.value as any)}
                      className="w-full text-xs p-2.5 border border-zinc-200 dark:border-zinc-800 rounded bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white"
                    >
                      <option value="S">Small (S)</option>
                      <option value="M">Medium (M)</option>
                      <option value="L">Large (L)</option>
                      <option value="XL">Extra Large (XL)</option>
                      <option value="XXL">Double Extra Large (XXL)</option>
                      <option value="Custom">Custom Measurements</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-xs font-sans font-bold uppercase text-zinc-650 dark:text-zinc-300 mb-1">
                Dietary, Seat, or Tailor Requests
              </label>
              <textarea
                placeholder="e.g. wheelchair seating access, specific allergies, or notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full text-sm p-3 border border-zinc-200 dark:border-zinc-800 rounded bg-zinc-50/50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#d4af37]"
              ></textarea>
            </div>

            {err && (
              <p className="text-xs text-red-500 font-sans font-medium">{err}</p>
            )}

            {success && (
              <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-xs font-sans font-medium rounded-md flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 block shrink-0" />
                <span>Your RSVP and Registry signing is complete! Chineke Gozie Unu!</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 text-xs font-sans tracking-widest uppercase font-bold btn-gold-laced rounded cursor-pointer"
            >
              Sign Digital Registrar
            </button>
          </form>
        </div>

        {/* REGISTRY LIST */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl shadow-lg p-6">
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <ListPlus className="w-5 h-5 text-[#a43c12]" /> Growing Seating Registrar
            </h3>
            <p className="font-sans text-xs text-zinc-400 font-light mb-4">
              Here are our esteemed cousins, children, and friends who have completed registration. May your paths be blessed with peace (Udo).
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs text-zinc-650 dark:text-zinc-300">
                <thead className="bg-[#fcf9f8] dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 font-bold text-zinc-500">
                  <tr>
                    <th className="p-3">Guest Name</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-center">Entourage</th>
                    <th className="p-3 text-center">Fabric Block</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {guests.map((g) => (
                    <tr key={g.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                      <td className="p-3 font-semibold text-zinc-800 dark:text-zinc-100">{g.name}</td>
                      <td className="p-3 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          g.attending 
                            ? 'bg-[#735c00]/10 text-[#735c00]' 
                            : 'bg-zinc-100 text-zinc-500'
                        }`}>
                          {g.attending ? 'Attender' : 'Regrets'}
                        </span>
                      </td>
                      <td className="p-3 text-center font-bold text-zinc-600 dark:text-zinc-300">{g.guestsCount}</td>
                      <td className="p-3 text-center">
                        {g.asoEbiOrdered ? (
                          <span className="inline-flex items-center gap-1 bg-[#a43c12]/10 text-[#a43c12] px-2 py-0.5 rounded text-xs font-bold">
                            Ordered ({g.asoEbiSize})
                          </span>
                        ) : (
                          <span className="text-zinc-400">No Wrapper</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-4 bg-[#fcf9f8] dark:bg-zinc-950 rounded-lg flex items-center justify-between text-xs font-sans text-zinc-500">
              <p>Total Registered Sovereign Chairs:</p>
              <p className="font-bold text-[#735c00] text-sm">
                {guests.filter(g => g.attending).reduce((a, b) => a + b.guestsCount, 0)} Seats
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
