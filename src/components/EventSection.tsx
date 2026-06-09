import React from 'react';
import { motion } from 'motion/react';
import { Church, Tent, Clock, MapPin, Calendar, Users } from 'lucide-react';

function VenueCard({
  icon: Icon,
  iconBg,
  time,
  title,
  subtitle,
  address,
  details,
  mapQuery,
  delay,
}: {
  icon: React.ElementType;
  iconBg: string;
  time: string;
  title: string;
  subtitle: string;
  address: string[];
  details?: string;
  mapQuery: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="gold-card rounded-2xl overflow-hidden"
    >
      <div className="h-1"
        style={{ background: 'linear-gradient(to right, #8b6914, #d4af37, #ffe082, #d4af37, #8b6914)' }}
      />
      <div className="p-8">
        {/* Icon badge */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
          style={{ background: iconBg, border: '2px solid rgba(212,175,55,0.4)' }}
        >
          <Icon className="w-7 h-7 text-amber-300" />
        </div>

        {/* Time badge */}
        <div className="inline-flex items-center gap-2 bg-[#2d1f00] text-amber-300 px-3 py-1.5 rounded font-heading text-sm font-bold tracking-widest uppercase mb-4">
          <Clock className="w-3.5 h-3.5" />
          {time}
        </div>

        <h3 className="font-heading text-2xl font-bold text-[#2d1f00] mb-1">{title}</h3>
        {subtitle && (
          <p className="font-serif italic text-amber-700/70 text-sm mb-5">{subtitle}</p>
        )}

        {/* Address */}
        <div className="flex items-start gap-3 mb-4">
          <MapPin className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="font-serif text-[#3d2e00] text-base leading-relaxed">
            {address.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>

        {details && (
          <p className="font-sans text-[#4a3500] text-sm leading-relaxed mb-6 border-l-2 border-amber-300/40 pl-3">
            {details}
          </p>
        )}

        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(mapQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-gold inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm cursor-pointer"
        >
          <MapPin className="w-3.5 h-3.5" />
          Get Directions
        </a>
      </div>
    </motion.div>
  );
}

export default function EventSection() {
  return (
    <section id="event" className="parchment-bg py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-5 block mx-auto w-fit">The Celebration</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#2d1f00] mb-4">
            Event <span className="gold-text-static">Programme</span>
          </h2>
          <div className="ornament-divider mx-auto">
            <span className="text-amber-600 text-base tracking-widest">✦ ❖ ✦</span>
          </div>

          {/* Date banner */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="inline-flex items-center gap-3 bg-[#2d1f00] text-amber-200 px-6 py-3 rounded-full mt-6 mb-6"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="font-heading font-bold text-sm tracking-wide">
              Tuesday, 29th December 2026
            </span>
          </motion.div>

          <p className="font-serif text-[#3d2800] text-lg italic max-w-2xl mx-auto font-light">
            "Come and share in our joy as we celebrate 50 years of a beautiful journey
            filled with love, faith and God's blessings."
          </p>
        </motion.div>

        {/* Venue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <VenueCard
            icon={Church}
            iconBg="radial-gradient(circle, #1a1200 0%, #2d1f00 100%)"
            time="8:00 AM"
            title="Thanksgiving Mass"
            subtitle="A Mass of Gratitude to God"
            address={[
              'Queen of Apostles Catholic Church,',
              'Umuago Urualla,',
              'Ideato North LGA, Imo State.',
            ]}
            details="All are welcome to join us in giving thanks to God for 50 years of His faithfulness, love and grace upon this blessed union."
            mapQuery="Queen of Apostles Catholic Church, Umuago Urualla, Ideato North, Imo State"
            delay={0.1}
          />
          <VenueCard
            icon={Tent}
            iconBg="radial-gradient(circle, #1a1200 0%, #2d1f00 100%)"
            time="1:00 PM"
            title="Reception"
            subtitle="Grand Celebration Banquet"
            address={[
              "Onwuneme's Compound,",
              'Umuago-Urualla,',
              'Imo State.',
            ]}
            details="Join us for an afternoon of music, feasting, tributes, and dancing as we celebrate this golden milestone in the Onwuneme family home."
            mapQuery="Onwuneme Compound, Umuago Urualla, Ideato North, Imo State"
            delay={0.25}
          />
        </div>

        {/* Programme timeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-[#2d1f00] rounded-2xl p-8 md:p-10 text-amber-100"
        >
          <h3 className="font-heading font-bold text-xl text-amber-300 mb-8 text-center tracking-wide">
            Programme of Events
          </h3>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-amber-700/40 hidden md:block" />

            <div className="space-y-6">
              {[
                { time: '8:00 AM',  event: 'Thanksgiving Mass', detail: 'Queen of Apostles Catholic Church' },
                { time: '10:30 AM', event: 'Procession & Arrival', detail: 'The couple arrive at the family compound' },
                { time: '1:00 PM',  event: 'Reception Opens', detail: "Onwuneme's Compound, Umuago Urualla" },
                { time: '1:30 PM',  event: 'Lunch & Cultural Performances', detail: 'Traditional Igbo music and dance' },
                { time: '3:00 PM',  event: 'Tributes & Speeches', detail: 'Words of honour from family and friends' },
                { time: '4:00 PM',  event: 'Cake Cutting & Toast', detail: '50 years of golden moments celebrated' },
                { time: '5:00 PM',  event: 'Open Dancing', detail: 'Highlife and celebration music' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 md:gap-6 items-start">
                  <div className="flex flex-col items-center md:items-start">
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-amber-700 flex-shrink-0 mt-0.5 relative z-10" />
                  </div>
                  <div className="flex-1 flex flex-col md:flex-row md:items-center gap-1 md:gap-4 pb-4 border-b border-amber-800/30 last:border-0 last:pb-0">
                    <span className="font-heading text-amber-400 text-sm font-bold tracking-widest w-20 flex-shrink-0">
                      {item.time}
                    </span>
                    <div>
                      <p className="font-heading font-bold text-amber-100 text-base">{item.event}</p>
                      <p className="font-sans text-amber-300/60 text-sm font-light">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RSVP note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-start gap-3 bg-amber-50 border border-amber-300/40 rounded-2xl px-6 py-4 max-w-lg text-left mx-auto">
            <Users className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="font-serif italic text-amber-800 text-sm leading-relaxed">
              Your presence, prayers and good wishes will make this day even more special.
            </p>
          </div>
          <p className="font-sans text-amber-700 text-sm mt-3">
            Please <a href="#guestbook" className="underline hover:text-amber-700 transition-colors">RSVP below</a> to help us plan the celebration.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
