import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// ── In-memory store for local dev (mirrors D1 schema) ────────────────────────
const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #7a5c00, #d4af37)',
  'linear-gradient(135deg, #2d1f00, #8b6914)',
  'linear-gradient(135deg, #5c4500, #c9a227)',
  'linear-gradient(135deg, #1a1200, #d4af37)',
  'linear-gradient(135deg, #3d2800, #b8960c)',
];

const seedTributes = [
  { id: 'seed-f1', author: '[Child 1 — add your name]', relation: 'First Child', message: "Growing up, our home was always filled with the sound of your laughter and the smell of Mama's cooking. Papa, you showed us what it means to work hard and walk with integrity. Mama, you showed us what it means to love unconditionally. Together, you are the reason we know what a family should feel like. Fifty years of this? We are the most blessed children on earth. Daalu unu! Ya gazie!", createdAt: '2026-12-01', avatarInitials: 'C1', avatarGradient: AVATAR_GRADIENTS[0], isFeatured: true },
  { id: 'seed-f2', author: '[Child 2 — add your name]', relation: 'Second Child', message: "I have watched you both navigate life's storms with grace and faith. Not once did we see you falter in your love for each other or for us. Papa, your quiet strength is a mountain. Mama, your gentle wisdom is an ocean. Together, you are the bedrock of this family. Thank you for giving us 50 years of the most beautiful blueprint for love. We honour you today and always.", createdAt: '2026-12-01', avatarInitials: 'C2', avatarGradient: AVATAR_GRADIENTS[1], isFeatured: true },
  { id: 'seed-f3', author: '[Child 3 — add your name]', relation: 'Third Child', message: "Dear Papa and Mama, I kept deleting drafts because no words feel adequate. So I will simply say this: every good thing in my life traces back to the foundation you laid. Your love is not just a story we tell — it is the air we breathe. Here is to 50 years and to many more golden seasons ahead. Chineke gozie unu!", createdAt: '2026-12-01', avatarInitials: 'C3', avatarGradient: AVATAR_GRADIENTS[2], isFeatured: true },
  { id: 'seed-f4', author: '[Child 4 — add your name]', relation: 'Fourth Child', message: "Fifty years is a testimony. I have watched Mama and Papa teach us that marriage is not a feeling — it is a decision made fresh every morning. A decision to show up, to forgive, to laugh, to hold on. Thank you for making that decision for fifty years running. We, your children, are the living proof of your legacy.", createdAt: '2026-12-01', avatarInitials: 'C4', avatarGradient: AVATAR_GRADIENTS[3], isFeatured: true },
  { id: 'seed-f5', author: '[Child 5 — add your name]', relation: 'Fifth Child', message: "The thing I am most grateful for is that you gave us an example. In a world where love is treated as temporary, you showed us it can be permanent — that it deepens and shines brighter with time. Happy Golden Jubilee, my dearest Papa and Mama. You are our greatest treasure.", createdAt: '2026-12-01', avatarInitials: 'C5', avatarGradient: AVATAR_GRADIENTS[4], isFeatured: true },
  { id: 'seed-f6', author: '[Child 6 — add your name]', relation: 'Sixth Child', message: "Being the last child, I grew up watching you both through grown-up eyes from the very beginning. I saw a partnership built on faith, sacrifice, and an unshakeable bond. You never needed to teach me about love — I simply watched the two of you. Fifty years down, and you still make each other laugh. That is everything. Daalu. I love you both beyond words.", createdAt: '2026-12-01', avatarInitials: 'C6', avatarGradient: AVATAR_GRADIENTS[0], isFeatured: true },
  { id: 'seed-g1', author: 'The Grandchildren', relation: 'Grandchild', message: "Dearest Grandpa and Grandma, thank you for the chin-chin you always kept in your bags, for the Igbo proverbs at bedtime, and for showing us that real love is quiet, strong, and lasting. You are our favourite people in the world. Happy Anniversary!", createdAt: '2026-12-01', avatarInitials: 'GC', avatarGradient: AVATAR_GRADIENTS[2], isFeatured: false },
  { id: 'seed-fr1', author: 'Chief Mrs. [Family Friend]', relation: 'Friend', message: "I have known this couple since we were young. Seeing them today, wrapped in gold and grace, fills my heart with indescribable joy. Their union has always been a quiet miracle. Fifty years of this is proof that God is very real and very good. Eze na-adili unu oo!", createdAt: '2026-11-28', avatarInitials: 'FF', avatarGradient: AVATAR_GRADIENTS[3], isFeatured: false },
];

const seedRsvp = [
  { id: 'seed-r1', name: 'The Obi Family',       attending: true,  guests: 4, timestamp: '2026-10-01' },
  { id: 'seed-r2', name: 'Dr. Nneka Chukwu',     attending: true,  guests: 2, timestamp: '2026-10-03' },
  { id: 'seed-r3', name: 'Engineer Emeka Nwosu', attending: true,  guests: 3, timestamp: '2026-10-05' },
  { id: 'seed-r4', name: 'The Eze Family',        attending: false, guests: 0, timestamp: '2026-10-07' },
];

let tributes = [...seedTributes];
let rsvpEntries = [...seedRsvp];

// Tributes API
app.get('/api/tributes', (_req, res) => {
  const sorted = [...tributes].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return b.createdAt.localeCompare(a.createdAt);
  });
  res.json(sorted);
});

app.post('/api/tributes', (req, res) => {
  const { author, relation, message, avatarInitials, avatarGradientIdx = 0 } = req.body;
  if (!author?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'author and message are required' });
  }
  const tribute = {
    id: Date.now().toString(),
    author: author.trim(),
    relation: relation?.trim() || 'Friend',
    message: message.trim(),
    createdAt: new Date().toISOString().split('T')[0],
    avatarInitials: (avatarInitials?.trim() || author.trim().split(' ').map((w: string) => w[0]).join('').substring(0, 2)).toUpperCase(),
    avatarGradient: AVATAR_GRADIENTS[avatarGradientIdx % AVATAR_GRADIENTS.length],
    isFeatured: false,
  };
  tributes.unshift(tribute);
  res.status(201).json({ success: true, tribute });
});

// RSVP API
app.get('/api/rsvp', (_req, res) => {
  res.json([...rsvpEntries]);
});

app.post('/api/rsvp', (req, res) => {
  const { name, attending, guests = 1 } = req.body;
  if (!name?.trim()) {
    return res.status(400).json({ error: 'name is required' });
  }
  const entry = {
    id: Date.now().toString(),
    name: name.trim(),
    attending: !!attending,
    guests: attending ? guests : 0,
    timestamp: new Date().toISOString().split('T')[0],
  };
  rsvpEntries.unshift(entry);
  res.status(201).json({ success: true, entry });
});

// ── Anthropic client ──────────────────────────────────────────────────────────
const client = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

if (client) {
  console.log('Anthropic client initialised (claude-haiku-4-5-20251001).');
} else {
  console.warn('ANTHROPIC_API_KEY not set — running in offline fallback mode.');
}

const OFFLINE_RESPONSES: Record<string, string[]> = {
  blessing: [
    `Chineke Gozie Unu!\n\nAs we look upon your glowing faces today, we see half a century of patience, strength, and Igbo prestige. May your children surround your table like young olive shoots, and may your love story continue to guide the younger generation of couples.\n\nMay you live to witness many more beautiful harvests of joy. Nnoo!\n\nSincerely,\nAuntie Ifeoma`,
    `Dearest Onyinye and your beloved partner,\n\nMay Chineke continue to bless this golden union of 50 years. As you celebrate this milestone, may your home remain filled with laughter, the sweet sound of grandchildren, and the everlasting presence of Udo.\n\nYour love is like gold interwoven in sacred lace: untarnished, precious, and beautiful for all generations to see.\n\nWith love and prayers always.`,
  ],
  music: [
    `*A Golden Memory of Lagos, 1974…*\n\nThe air is warm with the rich sound of Chief Stephen Osadebe's highlife ensemble flowing from a turntable speaker. The Lagos lagoon breeze carries firewood smoke, roast plantains, and the excitement of a young Igbo couple stepping into the city.\n\nShe moves in vibrant traditional wrapper, coral beads clicking softly as she laughs. He stands tall in sharp ivory, looking at her with the quiet devotion that would endure fifty golden years.`,
  ],
  toast: [
    `A Toast to Fifty Years of Grace!\n\n"Onye kwe, Chi ya ekwe" — when a soul says yes, their God says yes too. Fifty years ago you both set your hearts on a single path of love, and Chineke has smiled upon that beautiful choice ever since.\n\nWe raise our glasses to the King and Queen of our hearts! May the gold of your garments match the pure gold of your spirits. To love, to family, and to the legacy of Onyinye Chineke!\n\nYa gaziiru unu!`,
  ],
  poem: [
    `Fifty years of morning tea and evening prayers,\nOf hands that found each other through the years.\nThrough Lagos rains and Imo sunlit days,\nYour love burned on in quiet, golden ways.\n\nChief and Lolo — two trees, one canopy,\nYour roots entwined in God's own tapestry.\nThe children grew, the grandchildren arrived,\nBecause you chose each other and you thrived.`,
  ],
};

app.post('/api/generate-memory', async (req, res) => {
  const { prompt, presetType = 'blessing', guestName } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'prompt is required' });
  }

  if (!client) {
    const templates = OFFLINE_RESPONSES[presetType] ?? OFFLINE_RESPONSES.blessing;
    return res.json({
      text: templates[Math.floor(Math.random() * templates.length)],
      info: 'Curated heritage archival response (offline mode)',
    });
  }

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: `You are a warm, eloquent Nigerian/Igbo family archivist and celebration writer helping guests at a 50th Golden Jubilee wedding anniversary for Chief Engr & Lolo Cosmas Onwuneme — a beloved Igbo family from Umuago Urualla, Imo State.

Write beautifully worded, emotionally rich prose (150–220 words). Weave in fitting Igbo words naturally: Chineke (God), Udo (peace), Onyinye (gift), Nnoo (welcome), Ya gazie (may it go well), Obi Oma (good heart). Tone: prestigious, warm, deeply respectful of Igbo tradition. No markdown headers. Flowing paragraphs only — like a luxury anniversary card.`,
      messages: [{
        role: 'user',
        content: `Category: ${presetType}\nGuest name: ${guestName ?? 'Honoured Guest'}\nDetails / memory seeds: ${prompt}\n\nWrite the piece now.`,
      }],
    });

    const text =
      message.content[0].type === 'text'
        ? message.content[0].text
        : 'May peace and joy follow your beautiful family always.';

    return res.json({
      text,
      info: 'Synthesized live · Claude Haiku · Anthropic',
    });
  } catch (err) {
    console.error('Anthropic API error:', err);
    const templates = OFFLINE_RESPONSES[presetType] ?? OFFLINE_RESPONSES.blessing;
    return res.json({
      text: templates[0],
      info: 'Heritage archival response (API fallback)',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite development server middleware loaded.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
    console.log('Serving static production files from dist.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
}

startServer();
