import Anthropic from '@anthropic-ai/sdk';

interface Env {
  ANTHROPIC_API_KEY: string;
}

interface RequestBody {
  prompt: string;
  presetType?: 'blessing' | 'music' | 'toast' | 'poem';
  guestName?: string;
}

const OFFLINE_RESPONSES: Record<string, string[]> = {
  blessing: [
    `Chineke Gozie Unu!\n\nMay the Almighty God continue to bless this golden union of fifty years. As you celebrate this milestone, may your home remain filled with laughter, the sweet sound of children and grandchildren, and the everlasting presence of peace — Udo.\n\n"Onyinye Chineke" — a gift from God indeed. Your love is like the gold interwoven in sacred lace: untarnished, precious, and beautiful for all generations to behold.\n\nWith love and prayers always.`,
  ],
  music: [
    `*A Golden Memory of Lagos, 1974…*\n\nThe air is warm with the rich sound of Chief Stephen Osadebe's highlife ensemble flowing from a turntable speaker. The Lagos lagoon breeze carries firewood smoke, roast plantains, and the excitement of a young Igbo couple stepping into the city.\n\nShe moves in vibrant traditional wrapper, coral beads clicking softly as she laughs. He stands tall in sharp ivory, looking at her with the quiet devotion that would endure fifty golden years.`,
  ],
  toast: [
    `A Toast to Fifty Years of Grace!\n\n"Onye kwe, Chi ya ekwe" — when a soul says yes, their God says yes too. Fifty years ago you both set your hearts on a single path of love, and Chineke has smiled upon that beautiful choice ever since.\n\nWe raise our glasses to the King and Queen of our hearts! May the gold of your garments match the pure gold of your spirits. To love, to family, and to the legacy of Onyinye Chineke!\n\nYa gaziiru unu!`,
  ],
  poem: [
    `Fifty years of morning tea and evening prayers,\nOf hands that found each other through the years.\nThrough Lagos rains and Imo sunlit days,\nYour love burned on in quiet, golden ways.\n\nChief and Lolo — two trees, one canopy,\nYour roots entwined in God's own tapestry.\nThe children grew, the grandchildren arrived,\nBecause you chose each other and you thrived.\n\nHere at the golden altar, wrapped in grace,\nFifty years of love shines on your face.`,
  ],
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { prompt, presetType = 'blessing', guestName } = body;

  if (!prompt) {
    return Response.json({ error: 'prompt is required' }, { status: 400 });
  }

  if (!env.ANTHROPIC_API_KEY) {
    const templates = OFFLINE_RESPONSES[presetType] ?? OFFLINE_RESPONSES.blessing;
    return Response.json({
      text: templates[0],
      info: 'Curated heritage archival response (offline mode)',
    });
  }

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

  const systemPrompt = `You are a warm, eloquent Nigerian/Igbo family archivist and celebration writer helping guests at a 50th Golden Jubilee wedding anniversary for Chief Engr & Lolo Cosmas Onwuneme — a beloved Igbo family from Umuago Urualla, Imo State.

Write beautifully worded, emotionally rich prose (150–220 words). Weave in fitting Igbo words naturally: Chineke (God), Udo (peace), Onyinye (gift), Nnoo (welcome), Ya gazie (may it go well), Obi Oma (good heart). Tone: prestigious, warm, deeply respectful of Igbo tradition. No markdown headers. Flowing paragraphs only — like a luxury anniversary card.`;

  const userPrompt = `Category: ${presetType}
Guest name: ${guestName ?? 'Honoured Guest'}
Details / memory seeds: ${prompt}

Write the piece now.`;

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const text =
      message.content[0].type === 'text'
        ? message.content[0].text
        : 'May peace and joy follow your beautiful family always.';

    return Response.json({
      text,
      info: 'Synthesized live · Claude Haiku · Anthropic',
    });
  } catch (err) {
    console.error('Anthropic API error:', err);
    const templates = OFFLINE_RESPONSES[presetType] ?? OFFLINE_RESPONSES.blessing;
    return Response.json({
      text: templates[0],
      info: 'Heritage archival response (API fallback)',
    });
  }
};
